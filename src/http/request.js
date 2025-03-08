// request.js
import axios from 'axios';



// 创建axios实例
const service = axios.create({
  //baseURL: process.env.VUE_APP_BASE_API, // API基础路径
  //baseURL: 'http://yubao.com:8081', // 设置基础URL
  timeout: 5000 // 请求超时时间
});


function getCookie(name) {
  // 将 document.cookie 字符串按照；分割成数组
  let cookies = document.cookie.split(';');
  // 修剪字符串两侧的空格
  name = name.trim();
  // 遍历 cookie 数组
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].split('=');
    // 修剪 cookie 名称的两侧空格
    let cookieName = cookie[0].trim();
    if (cookieName === name) {
      // 返回 cookie 值
      return cookie[1];
    }
  }
  // 如果没有找到，返回 null
  return null;
}


// 请求拦截器
service.interceptors.request.use(
  config => {
    // 添加请求头等前置处理
    // 从localStorage或cookie中获取token，并添加到请求头中
    // const token = localStorage.getItem('token');
    // config.headers['Authorization'] = 'Bearer ' + token;

    // 添加请求头，这个cookie会在登录完成后返回，对应Redis中记录的用户信息。
    config.headers['token'] = getCookie('yubao-token');

    return config;
  },
  error => {
    // 请求错误处理
    console.log('Request Error:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 响应后处理 服务处理正常，并且API服务返回的状态码也是200
    if (response.status === 200 && response.data) {
      if (response.data.code && response.data.code === 200) {
        return Promise.resolve(response.data);
      } else {
        // 服务处理错误，返回消息
        console.error('服务处理错误，返回消息为：', response.data);
        return Promise.reject(response.data);
      }
    } else {
      // 服务器返回非200状态码
      console.error('请求错误，状态码为：', response.status);
      return Promise.reject(response.data);
    }
  },
  error => {
    // 响应错误处理
    console.log('Response Error:', error.response);
    if (error.response && error.response.status === 401) {
      // 处理401未授权情况，例如清除token，跳转到登录页等
      store.dispatch('user/logout');
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default service;