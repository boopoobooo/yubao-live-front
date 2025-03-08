<template>
    <div class="root">
        <el-container class="main-container">
            <el-aside width="150px">
                <navBar />
            </el-aside>
            <el-container>
                <el-header>
                    <pageHeader />
                </el-header>
                <el-main>
                    <div class="main-content">
                        <div id="app">
                            <div class="red-packet-wrap">
                                <div id="wrapper">
                                    <img src="@/asserts/petal.jpg" style="width: 140px;">
                                </div>
                                <div id="modol">
                                    <div id="hb">
                                        <div id="text"></div>
                                        <div id="btn">继续抢红包</div>
                                    </div>
                                </div>
                            </div>
                            <div class="grey_bg" v-show="showShopTab == true || showCarTab == true"
                                @click="hiddenGreyTab()">
                            </div>
                            <el-row :gutter="20">
                                <el-col :span="4">&nbsp;
                                </el-col>
                                <el-col :span="11">
                                    <div class="shop_info">
                                        <div class="shop_img_head">
                                            <b>秒杀商品</b>
                                        </div>
                                        <div v-for="item in shopInfoList" :key="item.skuId">
                                            <img :src="item.iconUrl" class="shop_img" alt="蓝牙耳机"
                                                @click="toShowShopTab(item.skuId)">
                                        </div>
                                    </div>

                                    <!-- <div class="shop_tab" v-show="showShopTab == true" id="shop_tab">
                                        <div style="text-align: center;">
                                            <img :src="shopDetailInfo.originalIconUrl" class="shop_detail_img">
                                        </div>
                                        <div style="text-align: center;">
                                            <div style="color: orange;"><b>{{ shopDetailInfo.name }}</b></div>
                                            <div style="color: grey;">{{ shopDetailInfo.remark }}</div>
                                            <div><span style="color: red;"><b>{{ shopDetailInfo.skuPrice }}元</b></span>
                                            </div>
                                            <div style="margin-top: 20px;">
                                                <el-button type="success"
                                                    @click="addShopCar(shopDetailInfo.skuId)">加入购物车</el-button>
                                            </div>
                                        </div>
                                    </div> -->

                                    <!-- <div class="car_tab" id="car_detail" v-show="showCarTab == true">
                                        <div v-show="showOrderTab == false">
                                            <div class="car_item" v-for="item in shopCarInfo">
                                                <img :src="item.skuInfoDTO.iconUrl" class="car_item_img" alt="">
                                                <span class="car_item_desc">{{ item.skuInfoDTO.name }} 数量：{{ item.count
                                                    }}</span>
                                                <el-button class="clear-shop-info-btn"
                                                    @click="removeShopCarItem(item.skuInfoDTO.skuId)"
                                                    type="danger">删除</el-button>
                                            </div>
                                            <div style="text-align: center;margin-top: 20px;">
                                                <el-input v-model="address" style="width: 60%;"
                                                    placeholder="请填写下单收货地址"></el-input>
                                                <br>
                                                <br>
                                                <el-button type="success" @click="prepareOrder()">下单支付</el-button>
                                            </div>
                                        </div>
                                        <div v-show="showOrderTab == true">
                                            <div class="car_item" v-for="item in shopCarInfo">
                                                <img :src="item.skuInfoDTO.iconUrl" class="car_item_img" alt="">
                                                <span class="car_item_desc">{{ item.skuInfoDTO.name }} 数量：{{ item.count
                                                    }}</span>
                                            </div>
                                            <div class="pre_order_total_price">
                                                <b>总金额：{{ shopCarTotalPrice }}币</b>
                                            </div>
                                            <div style="text-align: center;margin-top: 20px;">
                                                <el-button type="success" @click="payNow()">立马支付</el-button>
                                            </div>
                                            <div style="text-align: center;margin-top: 20px;">
                                                <el-button type="info" @click="turnBackShopCar()">返回购物车</el-button>
                                            </div>
                                        </div>
                                    </div> -->


                                    
                                    <div class="liveroom_top">
                                        <div style="position: relative;top: -30px;">
                                            <div class="anchor_name">
                                                <div style="display: inline-block;">当前主播：{{ initInfo.nickName }}</div>
                                                <img src="@/asserts/living.jpg" class="anchor_label" alt="">
                                                <el-button type="danger" round
                                                    style="position: relative;left: 10px;">关注</el-button>
                                                <el-button type="info" :icon="Share" circle alt="分享"></el-button>
                                            </div>
                                            <img :src="initInfo.avatar" class="anchor_img" alt="">
                                        </div>
                                    </div>

                                    <div id="svga-wrap" class="svga-wrap">
                                    </div>
                                    <video :poster="initInfo.avatar" width="100%"
                                        style="background-color: rgb(18, 9, 37);">
                                        <!-- <source src="test.mp4"> -->
                                    </video>
                                    <div class="gift_content">
                                        <div class="gift_content_title">礼物面板</div>
                                        <div class="bank_tab">
                                            <!-- <span :visible.sync="showPrepareBtn"> 
                        <el-button 
                        type="danger" class="prepare_red_packet" @click="prepareRedPacket">红包雨预热</el-button>
                    </span> -->

                                            <span style="position: relative;left: -50px;" @click="toShowCarTab()">
                                                查看购物车
                                            </span>
                                            <span @click="showBankInfoTab()">
                                                钱包余额:
                                            </span>
                                            <span style="color: white">{{ currentBalance }}</span>
                                        </div>
                                        <div style="white-space: nowrap;overflow-x: scroll;overflow-y: hidden;">
                                            <div class="gift_item" v-for="item in giftList" :key="item.giftId">
                                                <img @click="sendGift(item.giftId)" :src="item.coverImgUrl" class="gift_img"
                                                    alt="">
                                                <div class="gift_item_name">{{ item.giftName }}</div>
                                                <div class="gift_item_price">{{ item.price }}金币</div>
                                            </div>
                                        </div>
                                    </div>
                                </el-col>
                                <div class="grey_bg" v-show="showBankInfo == true" @click="hiddenBankInfoTabNow()">
                                </div>
                                <div class="recharge_tab" v-show="showBankInfo == true">
                                    <div style="height: 60px;">
                                        <span><img src="@/asserts/livingroom.jpg" alt=""
                                                style="width: 40px;height: 40px;position:relative; top: 15px;left: 10%;">
                                            <span style="position: relative;left: 12%;top:5px;">在线充值</span>
                                            <span style="position: relative;left: 50%;top:5px;">当前余额：
                                                <span style="color: #f37d08;"><b>{{ currentBalance }}</b></span>
                                            </span>
                                        </span>
                                    </div>
                                    <div style="text-align: center;">
                                        <span v-for="item in payProducts" :key="item.id">
                                            <button class="recharge_btn" :id="item.id" @click="payProduct(item.id)">
                                                {{ item.name }}<br>
                                                <span class="coin_um">{{ item.coinNum }}金币</span>
                                            </button>
                                        </span>
                                    </div>
                                    <div style="height: 50px;" v-show="qrCode == ''"></div>
                                    <div style="height: 250px;" v-show="qrCode != ''">
                                        <div style="text-align: center;">
                                            <img src="@/asserts/qrcode.png" style="height: 180px;width: 180px;" alt="">
                                            <div style="font-size: 13px;color: #a4a4a4">
                                                请使用 <img
                                                    style="display: inline-block;width: 13px;height: 13px;position:relative;top: 1px;"
                                                    src="@/asserts/zfb.jpg"> 支付宝/
                                                <img style="display: inline-block;width: 13px;height: 13px;position:relative;top: 1px;"
                                                    src="@/asserts/wx.jpg"> 微信 扫码支付
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <el-col :span="5">
                                    <div class="talk-content-box" id="talk-content-box">
                                        <div style="margin-left: 20px;margin-top: 20px;" v-for='chatItem in chatList'>
                                            <div v-show="chatItem.msgType == 5">
                                                <div class="gift_msg">
                                                    {{ chatItem.msg }}
                                                </div>
                                            </div>
                                            <div v-show="chatItem.msgType == 1">
                                                <div class="user-name">{{ chatItem.msg.senderName }}</div>
                                                <img :src="chatItem.msg.senderImg" class="chat-avatar">
                                            </div>
                                            <div class="chat-content" v-show="chatItem.msgType == 1">
                                                {{ chatItem.msg.content }}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                      <br>
                                      <el-form v-if="userId">
                                        <el-form-item>
                                          <el-input v-model="form.review" placeholder="发送直播评论"></el-input>
                                        </el-form-item>
                                        <el-form-item style="text-align:right;">
                                          <el-button type="primary" @click="sendReview()">发送消息</el-button>
                                        </el-form-item>
                                      </el-form>
                                      <div v-if="!userId" style="padding: 10px; text-align: center;">
                                        <el-button type="warning" style="width: 90%;" plain>
                                          请先登录，才能开始聊天
                                        </el-button>
                                      </div>
                                    </div>

                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>

</template>
<script setup>
import '@/styles/common.css'
import '@/styles/living_room.css'
import '@/styles/red_packet.css'

import pageHeader from '@/views/layout/pageHeader.vue'
import navBar from '@/views/layout/navBar.vue'
import {
  getImConfig,
  anchorConfig,
  sendGiftApi,
  queryShopInfo,
  addShopCar,
  getShopCarInfo,
  removeFromShopCar,
  createOrder,
  payOrder,
  prepareRedPacket,
  startRedPacket
} from '@/http/api';

import { ref, onMounted, onUnmounted, reactive,nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { userLoginStore } from '@/stores/userLoginStore' // 引入 userStore
import { storeToRefs } from 'pinia';

// 创建 store 实例
const userStore = userLoginStore();

// 获取 userId
const userId = userStore.getLoginUserId;

console.info("当前直播间的userId = ",userId)

// WebSocket相关
const websock = ref(null)
const imServerConfig = ref({})
const initInfo = ref({})
const roomId = ref(-1)

// 消息处理
const chatList = ref([])
//const form = ref({ review: '' })
// const form = reactive({
//   review: ''
// })

const form = reactive({
  review: ''
})

// 心跳定时器
let heartTimer = null

let route = useRoute()
console.info(route.params)


let giftList = ref([
    {giftId:'1',coverImgUrl:'/img/gift1.png',giftName:'礼物1',price:'5'},
    {giftId:'2',coverImgUrl:'/img/gift2.png',giftName:'礼物2',price:'10'},
    {giftId:'3',coverImgUrl:'/img/gift3.png',giftName:'礼物3',price:'10'},
    {giftId:'4',coverImgUrl:'/img/gift4.png',giftName:'礼物4',price:'20'},
    {giftId:'5',coverImgUrl:'/img/gift5.png',giftName:'礼物5',price:'20'},
    {giftId:'6',coverImgUrl:'/img/gift6.png',giftName:'礼物6',price:'30'},
    {giftId:'7',coverImgUrl:'/img/gift7.png',giftName:'礼物7',price:'30'},
    {giftId:'8',coverImgUrl:'/img/gift8.png',giftName:'礼物8',price:'40'},
    {giftId:'9',coverImgUrl:'/img/gift9.png',giftName:'礼物9',price:'40'},
    {giftId:'10',coverImgUrl:'/img/gift10.png',giftName:'礼物10',price:'50'}
])
let canvas = ref({})
let player = ref({})
let parser = ref({})

let anchorId = ref(-1)
let isLogin = ref(false)
let wsServer = ref('')
// let initInfo = ref({
//     nickName: 'roy',
//     avatar: '/img/avatar.png'
// })

let showGiftRank = ref(false)
let rankList = ref([])
let accountInfo = ref({})
let showBankInfo = ref(false)
let lastPayBtnId = ref(-1)
let payProducts = ref([])
let nickname = ref('')
let currentBalance = ref(0)
let qrCode = ref('true')
let dlProgress = ref(10)
let redPacketConfigCode = ref('')
let showPrepareBtn = ref(false)
let showStartBtn = ref(false)
let showShopTab = ref(false)
let showCarTab = ref(false)
let closeLivingRoomDialog = ref(false)
let livingRoomHasCloseDialog = ref(false)
let timer = ref(null)
let startingRedPacket = ref(false)
let shopInfoList = ref([])
let shopDetailInfo = ref({})
let shopCarInfo = ref([])
let showOrderTab = ref(false)
let address = ref('')
let shopCarTotalPrice = ref(0)


// 初始化IM服务
const initImService = async () => {
  try {

  
    // 获取 IM 配置
    const imConfig = await getImConfig();
    console.log('IM服务配置:', imConfig);
    imServerConfig.value = imConfig.data;

    // 从路由参数中获取 roomId
    const roomId = route.params.roomId;
    console.log('roomId = :', roomId);
    // 获取直播间配置
    const roomConfig = await anchorConfig({ roomId });
    console.log('直播间配置:', roomConfig);
    initInfo.value = roomConfig.data;

    // 建立 WebSocket 连接
    const wsUrl = `ws://${imServerConfig.value.wsImServerAddress}/${imServerConfig.value.token}/${initInfo.value.userId}/1001/${route.params.roomId}`;
    websock.value = new WebSocket(wsUrl);

    // 设置事件监听
    websock.value.onmessage = websocketOnMessage;
    websock.value.onopen = websocketOnOpen;
    websock.value.onerror = websocketOnError;
    websock.value.onclose = websocketClose;
  } catch (error) {
    console.error('IM初始化失败:', error)
  }
}

// WebSocket事件处理
const websocketOnOpen = () => {
  console.log('WebSocket连接成功');
  startHeartBeat();
};

const websocketOnError = (e) => {
  console.error('WebSocket错误:', e);
};

const websocketClose = (e) => {
  console.log('WebSocket关闭:', e);
  if (heartTimer) clearInterval(heartTimer);
};

// 消息处理
const websocketOnMessage = (e) => {
  const wsData = JSON.parse(e.data)
  
  // 3. Base64解码（兼容中文等UTF-8字符）
  const decodedBody = decodeBase64(wsData.body);

// 4. 输出解码后的内容
  console.log('Base64 decoded body:', decodedBody);

  
  console.log('Received message from server:', wsData);  // 添加日志记录
  
  // 系统消息
  if (wsData.msgCode === 1001) {
    console.log('IM服务就绪')
  }
  
  // 业务消息
  if (wsData.msgCode === 1003) {
    const respData = decodeBase64(wsData.body)
    handleBizMessage(respData)
  }
}

// 业务消息分发
const handleBizMessage = (respData) => {
  respData = JSON.parse(respData);
  console.log('处理业务消息 business message:', respData);  

  console.log('当前bizCode = :', respData.bizCode);  

  if (respData.bizCode === "5555") {
    //聊天消息
    console.log('聊天消息:', respData);
    handleChatMessage(respData);
  }else if (respData.bizCode === "5556") {
    //送礼成功
    handleGiftMessage(respData);
  }

  // 发送ACK
  sendAck(respData.msgId)
}

// 处理聊天消息
const handleChatMessage = (respData) => {
  console.log('handleChatMessage:', respData)
  chatList.value.push({
    msgType: 1,
    msg: {
      senderName: respData.userId,
      senderImg: respData.senderAvtar,
      content: respData.data.content
    }
  });
  console.log('聊天消息加入到消息列表队列中:', respData);  // 添加日志记录

  // 滚动到底部
  nextTick(() => {
    const chatBox = document.getElementById('talk-content-box')
    if (chatBox) chatBox.scrollTop = chatBox.scrollHeight
  })
}

// 完善发送方法
const sendReview = async () => {
  if (!form.review.trim()) {
    alert('请输入消息内容')
    return
  }

  try {
    const msgPayload = JSON.stringify({
      roomId: route.params.roomId,
      type: 1,
      content: form.review,
      senderName: initInfo.value.nickName,
      senderAvtar: initInfo.value.avatar  // 注意字段名可能需要与后端一致
    })

    await websock.value.send(JSON.stringify({
      magic: 19231,
      code: 1003,
      len: msgPayload.length,
      body: JSON.stringify({
        bizCode: 5555,
        data: msgPayload
      })
    }))

    // 清空输入并滚动到底部
    form.review = ''
    nextTick(() => {
      const chatBox = document.getElementById('talk-content-box')
      if (chatBox) chatBox.scrollTop = chatBox.scrollHeight
    })
  } catch (error) {
    console.error('消息发送失败:', error)
    alert('消息发送失败，请检查网络连接')
  }
}

// 发送礼物
const sendGift = async (giftId) => {
  try {
    const result = await sendGiftApi({
      giftId,
      type: 0,
      roomId: route.params.roomId,
      receiverId: initInfo.value.anchorId
    });
    console.log('礼物发送结果:', result);
  } catch (error) {
    console.error('礼物发送失败:', error);
  }
};

// 心跳机制
const startHeartBeat = () => {
  heartTimer = setInterval(() => {
    if (websock.value.readyState === WebSocket.OPEN) {
      websock.value.send(JSON.stringify({
        magic: 19231,
        code: 1004,
        len: JSON.stringify({ userId: initInfo.value.userId }).length,
        body: JSON.stringify({ userId: initInfo.value.userId })
      }));
    }
  }, 6000);
};

// Base64解码函数（支持UTF-8）
const decodeBase64 = (base64Str) => {
    // 将Base64字符串转换为二进制数据
    const rawData = atob(base64Str);
    
    // 将二进制数据转换为Uint8Array
    const bytes = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; i++) {
        bytes[i] = rawData.charCodeAt(i);
    }
    
    // 使用TextDecoder解码为UTF-8字符串
    return new TextDecoder('utf-8').decode(bytes);
};
// ACK 确认
const sendAck = (msgId) => {
  const ackBody = {
    userId: userId,
    appId: 1001,
  };

  websock.value.send(JSON.stringify({
    magic: 19231,
    code: 1005,
    len: JSON.stringify(ackBody).length,
    body: JSON.stringify(ackBody)
  }));
};

// 组件生命周期
onMounted(() => {
  roomId.value = route.params.roomId
  initImService()
})

onUnmounted(() => {
  if (websock.value) websock.value.close()
  if (heartTimer) clearInterval(heartTimer)
})

</script>
<style scoped></style>