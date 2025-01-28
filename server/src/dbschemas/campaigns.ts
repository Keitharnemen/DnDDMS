import mongoose from "mongoose";
import ICampaign from "../types/campaigns";

const campaignSchema = new mongoose.Schema<ICampaign>({
    id: {type: Number, required: true},
    name: { type: String, required: true },
    system: { type: String, required: true },
    playersNum: { type: Number, required: true },
    masterId: { type: Number, required: true },
  });
  
  export const campaignModel = mongoose.model<ICampaign>('Campaigns', campaignSchema);