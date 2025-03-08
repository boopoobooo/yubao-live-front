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
  return request.post('/live/api/user/getUserInfo', qs.stringify(data));
}

/**
 * 发送登录验证码
 * @param {} phone 
 * @returns 
 */
export function sendLoginCode(phone) {
  return request.post('/live/api/userLogin/sendLoginCode', qs.stringify({ phone }));
}

/**
 * 用户登录请求
 * @param {Object} data - 登录请求的数据，包含手机号和验证码等信息
 * @returns {Promise} - 返回一个Promise对象，包含后端返回的数据
 */
export function mobileLogin(data) {
  // 这种传参，Spring Boot后端要用 @RequestBody 接受参数
  return request({
    url: '/live/api/userLogin/mobileLogin', // 登录接口的URL
    method: 'post', // 请求方法
    data // 登录请求的数据
  });
}

/**
 * 初始化页面数据
 * @returns {Promise} - 返回一个Promise对象，包含后端返回的初始化页面数据
 */
export function initPage() {
  return request.post('/live/api/home/initPage'); // 假设 initPage 是 POST 请求
}


// 直播间相关API
/**
 * 获取IM服务配置
 * @returns {Promise} - 返回一个Promise对象，包含后端返回的IM服务配置
 */
export function getImConfig() {
  return request.post('/live/api/im/getImConfig');
}

/**
 * 获取直播间配置
 * @param {Object} data - 请求参数，包含直播间ID等信息
 * @returns {Promise} - 返回一个Promise对象，包含后端返回的直播间配置
 */
export function anchorConfig(data) {
  return request.post('/live/api/living/anchorConfig', qs.stringify(data));
}


// ----后端待实现=======================================================================================
/**
 * 发送礼物  
 * @param {Object} data - 请求参数，包含礼物ID、直播间ID、接收者ID等信息
 * @returns {Promise} - 返回一个Promise对象，包含后端返回的数据
 */
export function sendGiftApi(data) {
  return request.post(API.SEND_GIFT, qs.stringify(data));
}
/**
 * 查询秒杀商品信息
 * @param {Object} data - 请求参数，包含直播间ID等信息
 * @returns {Promise} - 返回一个Promise对象，包含后端返回的秒杀商品信息
 */
export function queryShopInfo(data) {
  return request.post(API.QUERY_SHOP_INFO, qs.stringify(data));
}

/**
 * 添加到购物车
 * @param {Object} data - 请求参数，包含商品ID、直播间ID等信息
 * @returns {Promise} - 返回一个Promise对象，包含后端返回的数据
 */
export function addShopCar(data) {
  return request.post(API.ADD_SHOP_CAR, qs.stringify(data));
}

/**
 * 获取购物车信息
 * @param {Object} data - 请求参数，包含直播间ID等信息
 * @returns {Promise} - 返回一个Promise对象，包含后端返回的购物车信息
 */
export function getShopCarInfo(data) {
  return request.post(API.GET_SHOP_CAR_INFO, qs.stringify(data));
}

/**
 * 从购物车移除商品
 * @param {Object} data - 请求参数，包含商品ID、直播间ID等信息
 * @returns {Promise} - 返回一个Promise对象，包含后端返回的数据
 */
export function removeFromShopCar(data) {
  return request.post(API.REMOVE_FROM_SHOP_CAR, qs.stringify(data));
}

/**
 * 创建订单
 * @param {Object} data - 请求参数，包含直播间ID等信息
 * @returns {Promise} - 返回一个Promise对象，包含后端返回的订单信息
 */
export function createOrder(data) {
  return request.post(API.CREATE_ORDER, qs.stringify(data));
}

/**
 * 支付订单
 * @param {Object} data - 请求参数，包含直播间ID等信息
 * @returns {Promise} - 返回一个Promise对象，包含后端返回的支付结果
 */
export function payOrder(data) {
  return request.post(API.PAY_ORDER, qs.stringify(data));
}

/**
 * 初始化红包雨
 * @param {Object} data - 请求参数，包含直播间ID等信息
 * @returns {Promise} - 返回一个Promise对象，包含后端返回的红包雨初始化结果
 */
export function prepareRedPacket(data) {
  return request.post(API.PREPARE_RED_PACKET, qs.stringify(data));
}

/**
 * 开始红包雨
 * @param {Object} data - 请求参数，包含红包配置ID等信息
 * @returns {Promise} - 返回一个Promise对象，包含后端返回的红包雨开始结果
 */
export function startRedPacket(data) {
  return request.post(API.START_RED_PACKET, qs.stringify(data));
}
