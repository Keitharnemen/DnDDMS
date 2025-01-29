import mongoose from "mongoose";
import IRace from "../types/races";


const raceSchema = new mongoose.Schema<IRace>({
    id: {type: Number, required: true},
    name: { type: String, required: true },
    //description: { type: String },
    strength: {type: Number, required: true},
    dexterity: {type: Number, required: true},
    condition: {type: Number, required: true},
    wisdom: {type: Number, required: true},
    inteligence: {type: Number, required: true},
    charisma: {type: Number, required: true},
   // skills: {type: [String], default: []}
  });
  
  export const RaceModel = mongoose.model<IRace>('Races', raceSchema);