function nest (recipes) {
  recipes = recipes.map(transformRecipe)
  recipes = recipes.map(r => nestRecipe(r, recipes))
  return recipes
}

function transformRecipe (recipe) {
  let components = recipe.ingredients.map(i => ({id: i.item_id, quantity: i.count}))

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

  return transformed
}

function nestRecipe (recipe, recipes, nestedItems = []) {
  recipe = {...recipe}

  nestedItems.push(recipe.id)
  recipe.quantity = recipe.quantity || 1
  recipe.components = recipe.components.map(component => {
    component = {...component}

    // Try and find the component in the recipes. If we cant find it,
    // either give back the raw component or discard if it's a guild upgrade
    let ingredientRecipe = !component.guild
      ? recipes.find(x => x.id === component.id)
      : recipes.find(x => x.upgrade_id === component.id)

    if (!ingredientRecipe) {
      return !component.guild ? component : false
    }

    // Don't nest further if we'd run into a recursion
    if (nestedItems.indexOf(component.id) !== -1) {
      return !component.guild ? component : {id: ingredientRecipe.id, quantity: component.quantity}
    }

    // Found a recipe for the component, let's nest!
    nestedItems.push(component.id)
    ingredientRecipe = nestRecipe(ingredientRecipe, recipes, nestedItems)
    ingredientRecipe.quantity = component.quantity
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

module.exports = nest
