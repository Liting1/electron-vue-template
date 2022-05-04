import axios from 'axios';
// import qs from 'qs';

console.log('MODE:', MODE, NODE_ENV);

// axios.defaults.baseURI =

export const getUserInfo = async () => {
  return axios.get('http://localhost:8088/api/');
};
