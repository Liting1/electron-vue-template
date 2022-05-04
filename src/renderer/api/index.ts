import axios from 'axios';
// import qs from 'qs';

// 开发模式 & 开发环境
console.log('MODE:', MODE, APP_ENV);

// axios.defaults.baseURI =

export const getUserInfo = async () => {
  return axios.get('http://localhost:8088/api/');
};
