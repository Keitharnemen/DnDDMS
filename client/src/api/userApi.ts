import api from './api'
import IUser from '../types/users';
import { useNavigate } from 'react-router-dom';

export const getUserName = async () : Promise<IUser> => {
    const response = await api.get('/users/getUser')
    return response.data
  }

  export const loginUser = async (login: string, password: string) : Promise<number>  => {
    try {
      const response = await api.post(`/users/login`, {login : login, password : password});
      return response.status;
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      throw error;
    }
  }

  export const addUser = async (name: string, surname: string, login: string, password: string, isMaster: boolean, isAdmin : boolean) : Promise<IUser> =>
    {
      const response = await api.post('/users/create', {name: name, surname: surname, login: login, password: password, isAdmin: isAdmin, isMaster : isMaster})
      return response.data
    }
  
  export const signOutUser = async () => {
      const navigate = useNavigate()

      const response = await api.post('/users/logout')
      navigate('/')
  }