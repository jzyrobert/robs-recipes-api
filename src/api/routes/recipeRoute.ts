import {
  list_all_recipes,
  create_a_recipe,
  read_a_recipe,
  update_a_recipe,
  delete_a_recipe,
} from "../controllers/recipeController";
import { Application } from "express";
import jwt from "express-jwt";
import { JWT_CONFIG } from "./jwtConfig";

export default function recipeRoutes(app: Application) {
  app
    .route("/recipes")
    .get(list_all_recipes)
    .post(jwt(JWT_CONFIG), create_a_recipe);

  app
    .route("/recipes/:recipeId")
    .get(read_a_recipe)
    .put(jwt(JWT_CONFIG), update_a_recipe)
    .delete(jwt(JWT_CONFIG), delete_a_recipe);
}
