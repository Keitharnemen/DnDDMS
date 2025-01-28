import mongoose from "mongoose";
import ISession from "../types/sessions";


const sessionSchema = new mongoose.Schema<ISession>({
    id: {type: Number, required: true},
    name: { type: String, required: true },
    campaignId: {type: Number, required: true},
    startDate: {type: String, required: true},
    endDate: {type: String},
    plan: {type: String},
    notes: {type: String},
  });
  
  export const SessionModel = mongoose.model<ISession>('Sessions', sessionSchema);