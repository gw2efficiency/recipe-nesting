import {staticItems} from 'gw2e-recipe-calculation'
const vendorItems = Object.keys(staticItems.vendorItems).map(x => parseInt(x, 10))

export default function nest (recipes, decorations = {}) {
  recipes = recipes.map(transformRecipe)

  // Ignore recipes that result in items that can be bought from vendors
  // This removes issues with wrong quantities in resulting recipes and
  // the wrong items (= container items) showing up in the shopping list
  recipes = recipes.filter(r => vendorItems.indexOf(r.id) === -1)

  // Transform the array into a id maps to eliminate "find" calls, which can be very
  // slow if called on a big array (since they have to be called on every nesting)
  recipes = idMap(recipes)
  const recipeUpgrades = upgradeMap(recipes)

  // Nest all recipes
  for (let key in recipes) {
    recipes[key] = nestRecipe(recipes[key], recipes, recipeUpgrades, decorations)
  }

  // Remove the internal flag for nested recipes
  for (let key in recipes) {
    delete recipes[key]['nested']
  }

  return Object.values(recipes)
}

function idMap (recipes) {
  let recipeMap = {}

  recipes.map(recipe => {
    recipeMap[recipe.id] = recipe
  })

  return recipeMap
}

function upgradeMap (recipeMap) {
  let recipeUpgrades = {}

  for (let key in recipeMap) {
    const upgradeId = recipeMap[key].upgrade_id

    if (!upgradeId) {
      continue
    }

    recipeUpgrades[upgradeId] = key
  }

  return recipeUpgrades
}

function transformRecipe (recipe) {
  let components = recipe.ingredients.map(i => ({
    id: i.item_id,
    quantity: i.count
  }))

  if (recipe.guild_ingredients) {
    let guildIngredients = recipe.guild_ingredients.map(i => ({
      id: i.upgrade_id,
      quantity: i.count,
      guild: true
    }))
    components = components.concat(guildIngredients)
  }

  let transformed = {
    id: recipe.output_item_id,
    output: recipe.output_item_count,
    components: components,
    min_rating: recipe.min_rating !== undefined ? recipe.min_rating : null,
    disciplines: recipe.disciplines || []
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

function nestRecipe (recipe, recipes, recipeUpgrades, decorations) {
  // This recipe was already nested as a part of another recipe
  if (recipe.nested) {
    return recipe
  }

  // Calculate this recipe and all sub-components
  recipe.nested = true
  recipe.quantity = recipe.quantity || 1
  recipe.components = recipe.components.map(component => {
    let index = !component.guild
      ? component.id
      : recipeUpgrades[component.id]

    // We could not find a recipe for a normal component, so
    // we just give it back (e.g. basic woods)
    if (!component.guild && !recipes[index]) {
      return component
    }

    // If it is a guild component and we can't find a recipe for it,
    // check if we can resolve it into an item, else ignore it
    if (component.guild && !recipes[index]) {
      return decorations[component.id]
        ? {id: decorations[component.id], quantity: component.quantity}
        : false
    }

    // The component is the recipe! Abort! D:
    if (recipe.id === index) {
      return !component.guild
        ? component
        : {id: recipe.id, quantity: component.quantity}
    }

    // The component recipe is not nested yet, so we nest it now!
    if (!recipes[index].nested) {
      recipes[index] = nestRecipe(recipes[index], recipes, recipeUpgrades, decorations)
    }

    // Make sure we use a copy of the object, and insert it into the components
    let ingredientRecipe = {...recipes[index]}
    ingredientRecipe.quantity = component.quantity
    delete ingredientRecipe.nested

    return ingredientRecipe
  })

  // Filter guild components that we don't have in our recipes :(
  recipe.components = recipe.components.filter(x => x)

  // Sort components so that non-craftable components are always on top
  recipe.components.sort((a, b) => (a.components ? 1 : 0) - (b.components ? 1 : 0))

  // Throw out the components if they are empty (= only non-matched guild recipes)
  if (recipe.components.length === 0) {
    delete recipe.components
  }

  return recipe
}
