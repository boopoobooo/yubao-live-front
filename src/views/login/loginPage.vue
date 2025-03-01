<template>
  <div class="login-container">
    <div class="background-overlay"></div>
    <div class="login-card">
      <h1>鱼宝直播-打开你的精彩世界</h1>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <el-input type="tel" maxlength="14" id="usermobile" v-model="mobile" placeholder="请输入手机号" clearable
            required />
        </div>
        <div class="form-group">
          <el-input type="number" maxlength="6" id="code" v-model="code" placeholder="请输入短信验证码" required
            style="width:70%" />
          <el-button class="login_sms_code" type="primary" round @click="sendSmsCode()">{{ loginCodeBtn }}</el-button>
        </div>
        <button type="submit" class="login-btn">登录</button>
        <button class="wechat-login-btn" @click="showWechatLoginModal = true">微信登录</button>
      </form>
      <div class="wechat-login-modal" v-if="showWechatLoginModal">
        <div class="modal-content">
          <h2>微信登录</h2>
          <p>扫描二维码登录</p>
          <img src="/img/qrcode.png" style="display: block;" alt="微信登录二维码" />
          <button class="wechat-confirm-btn" @click="handleWechatLogin">确认登录</button>
          <button class="wechat-cancel-btn" @click="showWechatLoginModal = false">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router' // 导入 useRouter
import { userLoginStore } from '@/stores/userLoginStore' // 引入 userStore
import { sendLoginCode,mobileLogin  } from '@/http/api'; // 引入sendLoginCode方法

let mobile = ref('');
let code = ref('ccc');
let loginCodeBtn = ref('获取验证码')
let showWechatLoginModal = ref(false);

let hasSendSms = false;
let lastTime = 60;

const router = useRouter()
const userStore = userLoginStore()

// 提交表单（登录）
async function handleSubmit() {
  // 登录逻辑处理，这里仅作演示  
  console.log('尝试登录', mobile.value, code.value);
  if (!checkPhone()) {
    ElMessage({
      message: '请输入有效的手机号',
      type: 'warning',
    })
    return
  }
  if (!code.value) {
    ElMessage({
      message: '请输入验证码',
      type: 'warning',
    })
    return
  }

  try {
    // 调用 mobileLogin 方法校验验证码
    const res = await mobileLogin({
      phone: mobile.value, 
      code: code.value
    });
    console.log('res为:', res);
    console.log('res.userId为:', res.userId);
    if (res.userId) {
      console.log('res.userId==:', res.userId);
      // 将 userId 存入 userStore
      userStore.setUserId(res.userId)
      // 添加跳转日志
      console.log('即将跳转到/home'); 
      // 跳转到首页
      router.push('/home')

      ElMessage({
        message: '登录成功',
        type: 'success',
      })
    } else {
      ElMessage({
        message: '登录失败，请检查验证码',
        type: 'error',
      })
    }
  } catch (error) {
    ElMessage({
      message: '登录失败，请重试',
      type: 'error',
    })
  }
}

function handleWechatLogin() {
  // 这里应该是调用微信登录的API，然后处理登录结果  
  // 假设登录成功，我们关闭弹出框  
  showWechatLoginModal.value = false;
  console.log('微信登录成功');
  // 在这里添加登录成功后的逻辑，比如跳转到首页  
}


async function sendSmsCode() {
  if (!checkPhone()) {
    ElMessage({
      message: '请输入手机号',
      type: 'warning'
    })
    return;
  }
  //已发送过消息，就返回
  if (hasSendSms) {
    ElMessage({
      message: '不要重复申请验证码',
      type: 'warning'
    })
    return;
  }

  // 调用 sendLoginCode 方法
  console.log('手机号为:', mobile.value.trim());
  const res = await sendLoginCode(mobile.value.trim());
  console.log('验证码响应数据:', res);
  if (res.success) {
    ElMessage({
      message: '验证码已发送',
      type: 'success',
    });
  } else {
    ElMessage({
      message: res.error || '发送验证码失败',
      type: 'error',
    });
  }
  
  
  if(res){
    //页面提示
    ElMessage({
      message: '短信验证码发送中',
      type: 'success'
    })
  }
  //按钮失效
  hasSendSms = true
  //显示倒计时
  var interval = setInterval(() => {
    loginCodeBtn.value = '发送中(' + lastTime + ')'
    if (lastTime == 0) {
      lastTime = 60;
      loginCodeBtn.value = '获取验证码'
      hasSendSms = false
      console.log('清理定时器')
      clearInterval(interval);
      return;
    } else {
      lastTime = lastTime - 1
    }
  }, 1000)
}




function checkPhone() {
  let phoneReg = /(^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$)/;
  if (!mobile.value || !phoneReg.test(mobile.value)) {
    return false;
  }
  return true;
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #ff9a9e, #fad0c4, #84fab0, #8fd3f4, #9a84e8);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  z-index: -1;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.login-card {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  text-align: center;
  position: relative;
  z-index: 1;
  width: 60vh;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  color: #666;
  margin-bottom: 5px;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus,
input[type="password"]:focus {
  border-bottom-color: #4CAF50;
}

.login-btn {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 10vh;
}

.login-btn:hover {
  background-color: #45a049;
}

.wechat-login-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #7BB32E;
  /* 微信绿色 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.wechat-login-btn:hover {
  background-color: #699F25;
  /* 更深的微信绿色 */
}

.wechat-login-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  /* 确保在登录卡片的上方 */
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  position: relative;
}

.modal-content img {
  max-width: 200px;
  margin-bottom: 10px;
}

.wechat-confirm-btn,
.wechat-cancel-btn {
  padding: 10px 20px;
  margin-right: 10px;
  background-color: #7BB32E;
  /* 微信绿色 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.wechat-cancel-btn {
  background-color: #ccc;
  /* 灰色 */
  margin-right: 0;
}

.wechat-confirm-btn:hover,
.wechat-cancel-btn:hover {
  background-color: #999;
  /* 深灰色 */
}

.close-modal {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
}
</style>