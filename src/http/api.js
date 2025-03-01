// api.js
import request from './request'; // 引入封装的axios实例
import qs from 'qs'; // 引入qs库，用于序列化参数

/**
 * 根据ID查询用户信息
 * @param {Object} data - 请求参数，包含用户ID等信息
 * @returns {Promise} - 返回一个Promise对象，包含后端返回的数据
 */
export function queryUserById(data) {
  // 将参数转成字符串，Spring Boot后端可以直接接受参数
  return request.post('/user/getUserInfo', qs.stringify(data));
}

/**
 * 发送登录验证码
 * @param {} phone 
 * @returns 
 */
export function sendLoginCode(phone) {
  return request.post('/userLogin/sendLoginCode', qs.stringify({ phone }));
}

/**
 * 用户登录请求
 * @param {Object} data - 登录请求的数据，包含手机号和验证码等信息
 * @returns {Promise} - 返回一个Promise对象，包含后端返回的数据
 */
export function mobileLogin(data) {
  // 这种传参，Spring Boot后端要用 @RequestBody 接受参数
  return request({
    url: '/userLogin/mobileLogin', // 登录接口的URL
    method: 'post', // 请求方法
    data // 登录请求的数据
  });
}

/**
 * 初始化页面数据
 * @returns {Promise} - 返回一个Promise对象，包含后端返回的初始化页面数据
 */
export function initPage() {
  return request.post('/home/initPage'); // 假设 initPage 是 POST 请求
}

