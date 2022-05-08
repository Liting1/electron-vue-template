import axios from 'axios';
// import qs from 'qs';

// 开发模式 & 开发环境
console.log('MODE:', MODE, APP_ENV);

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

const xhr = axios.create({
  baseURL: 'http://liting.ltd'
});

export const getUserInfo = async () => {
  return xhr.get('/static/data/html-1.json');
};
