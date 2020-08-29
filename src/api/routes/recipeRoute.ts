import { list_all_recipes, create_a_recipe, read_a_recipe, update_a_recipe, delete_a_recipe } from '../controllers/recipeController'
import { Application } from "express"

export default function recipeRoutes(app: Application) {
  app
    .route('/recipes')
    .get(list_all_recipes)
    .post(create_a_recipe);

  app
    .route('/recipes/:recipeId')
    .get(read_a_recipe)
    .put(update_a_recipe)
    .delete(delete_a_recipe);
};
