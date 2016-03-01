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
    components: components
  }

  if (recipe.output_upgrade_id) {
    transformed.upgrade_id = recipe.output_upgrade_id
  }

  return transformed
}

function nestRecipe (recipe, recipes, quantity = 1) {
  recipe = {...recipe}

  recipe.quantity = recipe.output
  recipe.components = recipe.components.map(component => {
    component = {...component}

    // Update the component quantity based on the higher tree level
    component.quantity = quantity * component.quantity

    // Try and find the component in the recipes. If we cant find it,
    // either give back the raw component or discard if it's a guild upgrade
    let ingredientRecipe = (!component.guild)
      ? recipes.find(x => x.id === component.id)
      : recipes.find(x => x.upgrade_id === component.id)

    if (!ingredientRecipe) {
      return (!component.guild) ? component : false
    }

    // Found a recipe for the component, let's nest!
    ingredientRecipe = nestRecipe(ingredientRecipe, recipes, component.quantity)
    ingredientRecipe.output = ingredientRecipe.quantity
    ingredientRecipe.quantity = component.quantity
    return ingredientRecipe
  })

  // Filter guild components that we don't have in our recipes :(
  recipe.components = recipe.components.filter(x => x)

  // Sort components so that non-craftable components are always on top
  recipe.components.sort((a, b) => (a.components ? 1 : 0) - (b.components ? 1 : 0))

  return recipe
}

module.exports = nest
