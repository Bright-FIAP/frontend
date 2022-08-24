/* eslint-disable prettier/prettier */
import Constants from 'expo-constants';
import { Platform } from 'react-native';

const localhost = Platform.OS !== 'ios' ? 'http://localhost:8080/api/v1/' : '10.0.2.2:8080';
const apiHeroku = 'https://chefbot-api.herokuapp.com/api/v1/';
const apiNodeRed = 'https://noderedkaike.mybluemix.net/chefbot';

const ENV = {
  dev: {
    API_URL: apiHeroku,
    API_NODE_RED: apiNodeRed,
    amplitudeApiKey: null,
  },
  staging: {
    API_URL: apiHeroku,
  },
  prod: {
    API_URL: apiHeroku,
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.dev;
  }
  if (env === 'staging') {
    return ENV.staging;
  }
  if (env === 'prod') {
    return ENV.prod;
  }
};

export default getEnvVars;
