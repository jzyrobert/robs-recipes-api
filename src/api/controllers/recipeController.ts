import { model } from "mongoose"
import { IRecipe } from "../interfaces";
import { Request, Response } from "express"
const recipe = model<IRecipe>('recipe');

export function list_all_recipes(req: Request, res: Response) {
  recipe.find({}, (err, recipes) => {
    if (err) res.send(err);
    res.json(recipes);
  });
};

export function create_a_recipe(req: Request, res: Response) {
  const newRecipe = new recipe(req.body);
  newRecipe.save((err, recipe) => {
    if (err) res.send(err);
    res.json(recipe);
  });
};

export function read_a_recipe(req: Request, res: Response) {
  recipe.findById(req.params.recipeId, (err, recipe) => {
    if (err) res.send(err);
    res.json(recipe);
  });
};

export function update_a_recipe(req: Request, res: Response) {
  recipe.findOneAndUpdate(
    { _id: req.params.recipeId },
    req.body,
    { new: true },
    (err, recipe) => {
      if (err) res.send(err);
      res.json(recipe);
    }
  );
};

export function delete_a_recipe(req: Request, res: Response) {
  recipe.deleteOne({ _id: req.params.recipeId }, err => {
    if (err) res.send(err);
    res.json({
      message: 'recipe successfully deleted',
     _id: req.params.recipeId
    });
  });
};
