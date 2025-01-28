import api from './api'
import ICampaign from '../types/campaigns'

export const fetchCampaigns= async () : Promise<ICampaign[]>  => {
  try {
    const response = await api.get(`/campaigns`);
    return response.data;
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    throw error;
  }
}

export const addCampaign = async (name: string, system: string, playersNum : number) : Promise<ICampaign> =>
{
  const response = await api.post('/campaigns', {name: name, system: system, playersNum: playersNum})
  return response.data
}

export const setCampaignId = async (campaignID : number) => {
  const response = await api.post('/campaigns/changeCampaignID', {campaignID : campaignID})
}

export const getCampaignName = async () : Promise<ICampaign> => {
  const response = await api.get('/campaigns/name')
  return response.data
}




