import { model, Schema, Document } from "mongoose";

export interface IRecipe extends Document {
    name: string;
}

const recipeSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: 'Recipe name'
    }
  }
);

export default model<IRecipe>('recipe', recipeSchema);
