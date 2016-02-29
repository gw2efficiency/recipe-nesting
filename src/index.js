function nest (recipes, guildItemsMap) {
  recipes = recipes.map(r => transformRecipe(r, guildItemsMap))
  recipes = recipes.map(r => nestRecipe(r, recipes))
  return recipes
}

function transformRecipe (recipe, guildItemsMap) {
  let components = recipe.ingredients.map(i => ({id: i.item_id, quantity: i.count}))

  if (guildItemsMap && recipe.guild_ingredients) {
    let guildIngredients = recipe.guild_ingredients.filter(i => guildItemsMap[i.upgrade_id])
    guildIngredients = guildIngredients.map(i => ({id: guildItemsMap[i.upgrade_id], quantity: i.count}))
    components = components.concat(guildIngredients)
  }

  return {
    id: recipe.output_item_id,
    output: recipe.output_item_count,
    components: components
  }
}

function nestRecipe (recipe, recipes, quantity = 1) {
  recipe = {...recipe}

  recipe.quantity = recipe.output
  recipe.components = recipe.components.map(component => {
    component = {...component}

    // Update the component quantity based on the higher tree level
    component.quantity = quantity * component.quantity

    // Try and find the component in the recipes
    let ingredientRecipe = recipes.find(x => x.id === component.id)
    if (!ingredientRecipe) {
      return component
    }

    // Found a recipe for the component, let's nest!
    ingredientRecipe = nestRecipe(ingredientRecipe, recipes, component.quantity)
    ingredientRecipe.output = ingredientRecipe.quantity
    ingredientRecipe.quantity = component.quantity
    return ingredientRecipe
  })

  // Sort components so that non-craftable components are always on top
  recipe.components.sort((a, b) => (a.components ? 1 : 0) - (b.components ? 1 : 0))

  return recipe
}

module.exports = nest
