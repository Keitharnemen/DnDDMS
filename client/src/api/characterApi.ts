import api from './api'
import ICharacter from '../types/characters';
import IClasses from '../types/classes';
import IRace from '../types/races';

export const fetchCharactersForCampaign= async () : Promise<ICharacter[]>  => {
  try {
    const response = await api.get(`/campaigns/characters`);
    return response.data;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
}

export const fetchClasses = async () : Promise<IClasses[]> => {
    try {
        const response = await api.get(`/campaigns/classes`);
        return response.data;
      } catch (error) {
        console.error('Error fetching classes:', error);
        throw error;
      }
}

export const fetchRaces = async () : Promise<IRace[]> => {
    try {
        const response = await api.get(`/campaigns/races`);
        return response.data;
      } catch (error) {
        console.error('Error fetching races:', error);
        throw error;
      }
}

export const addCharacter = async (character : ICharacter) : Promise<ICharacter> =>
{
  const response = await api.post('/campaigns/characters', {character : character})
  return response.data
}

export const updateCharacter = async (character : ICharacter) : Promise<ICharacter> =>
    {
      const response = await api.put('/campaigns/characters', {character : character})
      return response.data
    }