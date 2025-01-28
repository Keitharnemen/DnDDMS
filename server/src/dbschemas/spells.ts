import mongoose from "mongoose";
import ISpell from "../types/spells";


const spellSchema = new mongoose.Schema<ISpell>({
    id: {type: Number, required: true},
    name: { type: String, required: true },
    description: { type: String },
    magic: {type: String, required: true},
    level: {type: Number, required: true},
  });
  
  export const SpellModel = mongoose.model<ISpell>('Spells', spellSchema);