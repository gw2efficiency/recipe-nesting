import { omit, compact } from '@devoxa/flocky'
import { staticItems } from 'gw2e-recipe-calculation'
import { DecorationsToItemsMap, Recipe } from './types'

const vendorItems = Object.keys(staticItems.vendorItems).map((id) => parseInt(id, 10))

export interface NestedRecipe extends TransformedRecipeExternal {
  components: Array<
    | NestedRecipe
    | {
        id: number
        type: 'Item' | 'Currency'
        quantity: number
      }
  >
}

interface TransformedRecipeExternal {
  id: number
  quantity: number
  type: 'Recipe'
  output: number
  recipe_id: number
  min_rating: number | null
  disciplines: Array<string>
  upgrade_id?: number
  output_range?: string
  achievement_id?: number
}

interface TransformedRecipe extends TransformedRecipeExternal {
  nested: boolean
  components?: Array<
    | Omit<TransformedRecipe, 'nested'>
    | {
        id: number
        type: 'Item' | 'GuildUpgrade' | 'Currency'
        quantity: number
      }
  >
}

export function nestRecipes(
  rawRecipes: Array<Recipe>,
  decorationMap: DecorationsToItemsMap = {}
): Array<NestedRecipe> {
  let recipes = rawRecipes.map(transformRecipe)

  // Ignore recipes that result in items that can be bought from vendors
  // This removes issues with wrong quantities in resulting recipes and
  // the wrong items (= container items) showing up in the shopping list
  recipes = recipes.filter((recipe) => vendorItems.indexOf(recipe.id) === -1)

  // Transform the arrays into a id maps to eliminate "find" calls, which can be very
  // slow if called on a big array (since they have to be called on every nesting)
  const recipesMap = mapById(recipes)
  const recipeUpgradesMap = mapByUpgradeId(recipesMap)

  // Nest all recipes
  for (const key in recipesMap) {
    recipesMap[key] = nestRecipe(recipesMap[key], recipesMap, recipeUpgradesMap, decorationMap)
  }

  // Remove the internal flag for nested recipes
  return Object.values(recipesMap)
    .map((recipe) => omit(recipe, ['nested']))
    .filter((recipe) => recipe.components) as Array<NestedRecipe>
}

function transformRecipe(recipe: Recipe) {
  const components = recipe.ingredients.map((ingredient) => ({
    id: ingredient.id,
    type: ingredient.type,
    quantity: ingredient.count,
  }))

  const transformed: TransformedRecipe = {
    id: recipe.output_item_id,
    nested: false,
    type: 'Recipe',
    quantity: 1,
    output: recipe.output_item_count,
    components: components,
    recipe_id: recipe.id,
    min_rating: recipe.min_rating !== undefined ? recipe.min_rating : null,
    disciplines: recipe.disciplines || [],
  }

  if (recipe.output_upgrade_id) {
    transformed.upgrade_id = recipe.output_upgrade_id
  }

  if (recipe.output_item_count_range) {
    transformed.output_range = recipe.output_item_count_range
  }

  if (recipe.achievement_id) {
    transformed.achievement_id = recipe.achievement_id
  }

  return transformed
}

function mapById(recipes: Array<TransformedRecipe>) {
  const recipeMap: Record<number, TransformedRecipe> = {}

  recipes.map((recipe) => {
    recipeMap[recipe.id] = recipe
  })

  return recipeMap
}

function mapByUpgradeId(recipeMap: Record<number, TransformedRecipe>) {
  const recipeUpgrades: Record<number, number> = {}

  for (const key in recipeMap) {
    const upgradeId = recipeMap[key].upgrade_id

    if (!upgradeId) {
      continue
    }

    recipeUpgrades[upgradeId] = parseInt(key, 10)
  }

  return recipeUpgrades
}

function nestRecipe(
  recipe: TransformedRecipe,
  recipesMap: Record<number, TransformedRecipe>,
  recipeUpgradesMap: Record<number, number>,
  decorationsMap: DecorationsToItemsMap
) {
  // This recipe was already nested as a part of another recipe
  if (recipe.nested) {
    return recipe
  }

  // Calculate this recipe and all sub-components
  recipe.nested = true
  recipe.quantity = recipe.quantity || 1
  const components = (recipe.components || []).map((component) => {
    const isGuildUpgrade = component.type === 'GuildUpgrade'
    const id = isGuildUpgrade ? recipeUpgradesMap[component.id] : component.id

    // Return currency components as they are
    if (component.type === 'Currency') {
      return component
    }

    // We could not find a recipe for a normal component, so
    // we just give it back (e.g. basic woods or currencies)
    if (!isGuildUpgrade && !recipesMap[id]) {
      return component
    }

    // If it is a guild component and we can't find a recipe for it,
    // check if we can resolve it into an item, else ignore it
    if (isGuildUpgrade && !recipesMap[id]) {
      return decorationsMap[component.id]
        ? { id: decorationsMap[component.id], type: 'Item' as const, quantity: component.quantity }
        : false // TODO Return `component` (type='GuildUpgrade'), and handle that in the frontend
    }

    // The component is the recipe! Abort! D:
    if (recipe.id === id) {
      return isGuildUpgrade
        ? { id: recipe.id, type: 'Item' as const, quantity: component.quantity }
        : component
    }

    // The component recipe is not nested yet, so we nest it now!
    if (!recipesMap[id].nested) {
      recipesMap[id] = nestRecipe(recipesMap[id], recipesMap, recipeUpgradesMap, decorationsMap)
    }

    // Make sure we use a copy of the object, and insert it into the components
    return { ...omit(recipesMap[id], ['nested']), quantity: component.quantity }
  })

  // Filter guild components that we don't have in our recipes :(
  recipe.components = compact(components)

  // Throw out the components if they are empty (= only non-matched guild recipes)
  if (recipe.components && recipe.components.length === 0) {
    delete recipe.components
  }

  return recipe
}
