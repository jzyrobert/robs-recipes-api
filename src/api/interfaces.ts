import { Document } from "mongoose"

export interface IRecipe extends Document {
    name: string;
}
