import api from './api'
import ISession from '../types/sessions';

export const fetchSession = async () : Promise<ISession[]>  => {
  try {
    const response = await api.get(`/campaigns/sessions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    throw error;
  }
}

export const addSession = async (name: string) : Promise<ISession> =>
{
    const response = await api.post('/campaigns/sessions/create', {name: name})
    return response.data
}

export const updateSessionData = async (plan: string, notes: string) =>
{
    const response = await api.put('/campaigns/sessions/updateData', {plan, notes})
    return response.data
}

export const setSessionID = async (sessionID : number) => {
    const response = await api.post('/campaigns/sessions/changeSessionID', {sessionID : sessionID})
}

export const fetchSessionDetails = async () : Promise<ISession>   => {
  try {
    const response = await api.get(`/campaigns/sessions/details`);
    return response.data;
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    throw error;
  }
}

export const alockSession = async () => {
  const response = await api.patch('/campaigns/sessions/locksession')
}
  
    






