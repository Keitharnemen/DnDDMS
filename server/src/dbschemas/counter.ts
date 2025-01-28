import mongoose from "mongoose";
import ICounter from "../types/counter";

const counterSchema = new mongoose.Schema<ICounter>({
    nameCollection: { type: String, required: true },
    lastID: {type: Number, required: true}
  });
  
  export const counterModel = mongoose.model<ICounter>('Counter', counterSchema);