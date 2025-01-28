import mongoose from "mongoose";
import IMonster from "../types/monsters";

const monsterSchema = new mongoose.Schema<IMonster>({
    id: {type: Number, required: true},
    name: {type: String, required: true},
    strength: {type: Number, required: true},
    dexterity: {type: Number, required: true},
    condition: {type: Number, required: true},
    wisdom: {type: Number, required: true},
    inteligence: {type: Number, required: true},
    charisma: {type: Number, required: true},
    level: {type: Number, required: true},
    AC: {type: Number, required: true},
    initiative: {type: Number, required: true},
    speed: {type: Number, required: true},
    maxHP: {type: Number, required: true},
    currentHP: {type: Number, required: true},
    temporaryHP: {type: Number, required: true},
    skills: {type: [String], required: true},
    atuts: {type: [String], required: true},
    XP: {type: Number, required: true},
    difficulty: {type: Number, required: true},
    description: {type: String, required: true}
  });

  export const MonsterModel = mongoose.model<IMonster>('Monsters', monsterSchema);