const Config = {
  TIMEOUT_REQUEST: 5000,
  MODE_NOCORS_REQUEST: 'no-cors',
  HEADER_REQUEST: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
  WITHCREDENTIAL_REQUEST: true,
  CREDENTIAL_REQUEST: 'same-origin',
};
export default Config;
