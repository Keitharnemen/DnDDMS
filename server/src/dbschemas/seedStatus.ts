import mongoose from "mongoose";

const seedStatusSchema = new mongoose.Schema({
    isSeeded: {type: Boolean, required: true},
    seedDate: {type: Date, default: Date.now}
  });
  
  export const seedStatusModel = mongoose.model('seedStatus', seedStatusSchema);