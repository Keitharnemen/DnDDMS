import mongoose from "mongoose";
import IClasses from "../types/classes";


const classSchema = new mongoose.Schema<IClasses>({
    id: {type: Number, required: true},
    name: { type: String, required: true },
    cube: {type: Number, required: true},
    description: { type: String },
  });
  
  export const ClassModel = mongoose.model<IClasses>('Classes', classSchema);