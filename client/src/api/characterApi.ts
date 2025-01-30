import api from './api'
import ICharacter from '../types/characters';

//pobieranie danych postaci dla konkretnej kampanii (id kampanii powinno być w sesji)
export const fetchCharactersForCampaign= async () => {
  try {
    const response = await api.get(`/campaigns/characters`);
    return response;
  } catch (error: any) {
    if(error.response){return error.response}
    else {return {status: 500, message: 'Błąd serwera'};}
  }
}

//pobieranie danych o klasach (potrzebne do tworzenia postaci)
export const fetchClasses = async () => {
    try {
        const response = await api.get(`/campaigns/classes`);
        return response;
      } catch (error: any) {
        if(error.response){return error.response}
        else {return {status: 500, message: 'Błąd serwera'};}
      }
}

//pobieranie danych o rasach (potrzebne do tworzenia postaci)
export const fetchRaces = async () => {
    try {
        const response = await api.get(`/campaigns/races`);
        return response;
      } catch (error: any) {
        if(error.response){return error.response}
        else {return {status: 500, message: 'Błąd serwera'};}
      }
}

//dodawanie postaci
export const addCharacter = async (character : ICharacter) =>
{
  try{
  const response = await api.post('/campaigns/characters', {character : character})
  return response
  }
  catch (error: any) {
    if(error.response){return error.response}
    else {return {status: 500, message: 'Błąd serwera'};}
  }
}

//aktualizacja postaci
export const updateCharacter = async (character : ICharacter) =>
    {
      try{
      const response = await api.put('/campaigns/characters', {character : character})
      return response
      }
      catch (error: any) {
        if(error.response){return error.response}
        else {return {status: 500, message: 'Błąd serwera'};}
      }
    }