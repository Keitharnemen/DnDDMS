import api from './api'
import IUser from '../types/users';
import { useNavigate } from 'react-router-dom';

// pobieranie nazwy użytkownika
export const getUserName = async () => {
  try{
    const response = await api.get('/users/getUser')
    return response;
  }catch (error: any) {
    if(error.response){return error.response}
    else {return {status: 500, message: 'Błąd serwera'};}
  }
  }

  // logowanie użytkownika
  export const loginUser = async (login: string, password: string)  => {
    try {
      const response = await api.post(`/users/login`, {login : login, password : password});
      return response;
    } catch (error: any) {
      if(error.response){return error.response}
      else {return {status: 500, message: 'Błąd serwera'};}
    }
  }

  // dodawanie użytkownika
  export const addUser = async (name: string, surname: string, login: string, password: string, isMaster: boolean, isAdmin : boolean) =>
    {
      try{
      const response = await api.post('/users/create', {name: name, surname: surname, login: login, password: password, isAdmin: isAdmin, isMaster : isMaster})
      return response
      }catch (error: any) {
        if(error.response){return error.response}
        else {return {status: 500, message: 'Błąd serwera'};}
      }
    }
  
  // wylogowanie użytkownika
  export const signOutUser = async () => {
    try{
      const response = await api.post('/users/logout')
      return response
    }
    catch (error: any) {
      if(error.response){return error.response}
      else {return {status: 500, message: 'Błąd serwera'};}
    }
  }