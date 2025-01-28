import mongoose from "mongoose";
import IItem from "../types/items";


const itemSchema = new mongoose.Schema<IItem>({
    id: {type: Number, required: true},
    name: { type: String, required: true },
    description: { type: String },
  });
  
  export const ItemModel = mongoose.model<IItem>('Items', itemSchema);