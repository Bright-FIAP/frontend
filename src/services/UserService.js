import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import getEnvVars from '../../enviroments';
import Config from "../util/Config"


const { API_URL } = getEnvVars();

class UserService {
  async register(data) {
    return axios({
      url: API_URL + 'usuario/cadastrar',
      headers: Config.HEADER_REQUEST,
      method: 'POST',
      timeout: Config.TIMEOUT_REQUEST,
      data: data,
    })
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  async login(data) {
    return axios(API_URL + 'usuario/login',{
      headers: Config.HEADER_REQUEST,
      method: 'POST',
      timeout: Config.TIMEOUT_REQUEST,
      data: data,
    })
      .then(response => {
        //AsyncStorage.setItem('TOKEN', response.data.access_token);
        return Promise.resolve(response);
      })
      .catch(error => {
        alert("Email ou senha inválidos.")
        return Promise.reject(error);
      });
  }

  async loginComToken(data) {
    return axios({
      url: API_URL + 'usuario/login-token',
      method: 'POST',
      timeout: Config.TIMEOUT_REQUEST,
      data: data,
      headers: Config.HEADER_REQUEST,
    })
      .then(response => {
        if (response.data.access_token) {
          //AsyncStorage.setItem('TOKEN', response.data.access_token);
          return Promise.resolve(response);
        } else {
          return Promise.reject(response);
        }
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
}

const userService = new UserService();
export default userService;
