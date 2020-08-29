import { model, Schema } from "mongoose";
import { IRecipe } from "../interfaces";

const recipeSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: 'Recipe name'
    }
  }
);

export default model<IRecipe>('recipe', recipeSchema);
