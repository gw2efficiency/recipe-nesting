import { omit, compact, toMap } from '@devoxa/flocky'
import { API_Recipes_Entry_Next } from './api'

export type BasicItemComponent = { id: number; type: 'Item'; quantity: number }
export type BasicCurrencyComponent = { id: number; type: 'Currency'; quantity: number }
export type BasicGuildUpgradeComponent = { id: number; type: 'GuildUpgrade'; quantity: number }
export type Prerequisites = Array<{ type: 'Recipe'; id: number }>

export interface NestedRecipe extends TransformedRecipe {
  components: Array<NestedRecipe | BasicItemComponent | BasicCurrencyComponent>
}

interface TransformedRecipe {
  id: number
  type: 'Recipe'
  quantity: number
  output: number
  min_rating: number | null
  disciplines: Array<string>
  upgrade_id?: number
  output_range?: string
  achievement_id?: number
  merchant?: { name: string; locations: Array<string> }
  prerequisites: Prerequisites
  multipleRecipeCount: number
}

interface TransformedRecipeInternal extends TransformedRecipe {
  nested: boolean
  components?: Array<
    | Omit<TransformedRecipeInternal, 'nested'>
    | BasicItemComponent
    | BasicCurrencyComponent
    | BasicGuildUpgradeComponent
  >
}

export function nestRecipes(
  apiRecipes: Array<API_Recipes_Entry_Next>,
  decorationMap: Record<string, number> = {}
): Array<NestedRecipe> {
  const recipes = apiRecipes.map(transformRecipe)

  // Transform the arrays into a id maps to eliminate "find" calls, which can be very
  // slow if called on a big array (since they have to be called on every nesting)
  const recipesMap = toMap(recipes, 'id')
  const recipeUpgradesMap = toMap(recipes, 'upgrade_id', 'id')

  // Nest all recipes
  for (const key in recipesMap) {
    const recipe = recipesMap[key]
    if (!recipe) continue

    recipesMap[key] = nestRecipe(recipe, recipesMap, recipeUpgradesMap, decorationMap)
  }

  // Remove the internal "nested" flag for recipes and recipes that failed nesting
  return compact(Object.values(recipesMap))
    .map((recipe) => omit(recipe, ['nested']))
    .filter((recipe) => recipe.components) as Array<NestedRecipe>
}

function transformRecipe(recipe: API_Recipes_Entry_Next): TransformedRecipeInternal {
  const components = recipe.ingredients.map((ingredient) => ({
    id: ingredient.id,
    type: ingredient.type,
    quantity: ingredient.count,
  }))

  return {
    id: recipe.output_item_id,
    type: 'Recipe',
    nested: false,
    quantity: 1,
    output: recipe.output_item_count,
    components: components,
    prerequisites: recipe.id ? [{ type: 'Recipe', id: recipe.id }] : [],
    min_rating: recipe.min_rating !== undefined ? recipe.min_rating : null,
    disciplines: recipe.disciplines || [],
    upgrade_id: recipe.output_upgrade_id,
    output_range: recipe.output_item_count_range,
    achievement_id: recipe.achievement_id,
    merchant: recipe.merchant,
    multipleRecipeCount: recipe.multipleRecipeCount,
  }
}

function nestRecipe(
  recipe: TransformedRecipeInternal,
  recipesMap: Record<string, TransformedRecipeInternal | undefined>,
  recipeUpgradesMap: Record<string, number | undefined>,
  decorationsMap: Record<string, number | undefined>
) {
  // This recipe was already nested as a part of another recipe
  if (recipe.nested) {
    return recipe
  }

  // Flag this recipe as nested, so we don't run into infinite loops
  recipe.nested = true
  recipe.quantity = recipe.quantity || 1

  // Calculate this recipe's components and all sub-recipes
  const components = (recipe.components || []).map((component) => {
    const isGuildUpgrade = component.type === 'GuildUpgrade'
    const id = isGuildUpgrade ? recipeUpgradesMap[component.id] || component.id : component.id
    const componentRecipe = recipesMap[id]
    const condensedLeyLineEssenceIds = [91224, 91137, 91222, 91171]

    // Just give back the component for currencies
    if (component.type === 'Currency') {
      return component
    }

    if (!componentRecipe) {
      // We could not find a recipe for a normal component, so we just give it back (e.g. basic woods)
      if (!isGuildUpgrade) {
        return component
      }

      // If it is a guild component and we can't find a recipe for it,
      // check if we can resolve it into an item, else ignore it
      const decorationsItem = decorationsMap[component.id]
      return decorationsItem
        ? { id: decorationsItem, type: 'Item' as const, quantity: component.quantity }
        : false // TODO Return `component` (type='GuildUpgrade'), and handle that in the frontend
    }

    // The component is the recipe! Abort! D:
    if (recipe.id === id) {
      return isGuildUpgrade
        ? { id, type: 'Item' as const, quantity: component.quantity }
        : component
    }

    // These items should not have components if they are components of each other
    if (condensedLeyLineEssenceIds.includes(recipe.id) && condensedLeyLineEssenceIds.includes(id)) {
      return component
    }

    // The component recipe is not nested yet, so we nest it now!
    if (!componentRecipe.nested) {
      recipesMap[id] = nestRecipe(componentRecipe, recipesMap, recipeUpgradesMap, decorationsMap)
    }

    // Make sure we use a copy of the object, and insert it into the components
    return { ...omit(componentRecipe, ['nested']), quantity: component.quantity }
  })

  // Filter guild components that we don't have in our recipes :(
  recipe.components = compact(components)

  // Throw out the components if they are empty (= only non-matched guild recipes)
  if (recipe.components && recipe.components.length === 0) {
    recipe.components = undefined
  }

  return recipe
}
