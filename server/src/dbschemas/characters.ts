import mongoose from "mongoose";
import ICharacter from "../types/characters";


const characterSchema = new mongoose.Schema<ICharacter>({
    id: {type: Number, required: true},
    //userId: {type: Number, required: true},
    campaignId: {type: Number, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    raceId: {type: Number, required: true},
    classId: {type: Number, required: true},
    strength: {type: Number, required: true},
    dexterity: {type: Number, required: true},
    condition: {type: Number, required: true},
    wisdom: {type: Number, required: true},
    inteligence: {type: Number, required: true},
    charisma: {type: Number, required: true},
    level: {type: Number, required: true},
    HP: {type: Number, required: true}
    // character: {type: Number, required: true},
    // AC: {type: Number, required: true},
    // initiative: {type: Number, required: true},
    // speed: {type: Number, required: true},
    // maxHP: {type: Number, required: true},
    // currentHP: {type: Number, required: true},
    // temporaryHP: {type: Number, required: true},
    // skills: {type: [String], required: true},
    // atuts: {type: [String], required: true},
    // items: {type: [Number], required: true},
    // age: {type: Number, required: true},
    // skin: {type: String, required: true},
    // hair: {type: String, required: true},
    // weight: {type: Number, required: true},
    // height: {type: Number, required: true},
    // eyeColour: {type: String, required: true},
    // allies: {type: [String], required: true},
    // money: {type: [Number], required: true},
    // XP: {type: Number, required: true}
    
  });

  export const CharacterModel = mongoose.model<ICharacter>('Characters', characterSchema);