import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import getEnvVars from '../../enviroments';
import Config from "../util/Config"


const { API_NODE_RED } = getEnvVars();

class ChatService {
  async send(data) {
    return axios({
      url: API_NODE_RED,
      headers: Config.HEADER_REQUEST,
      method: 'POST',
      timeout: Config.TIMEOUT_REQUEST,
      mode: Config.MODE_NOCORS_REQUEST,
      data: data,
    })
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
}

const chatService = new ChatService();
export default chatService;
