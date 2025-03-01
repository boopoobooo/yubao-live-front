// userStore.js
import { defineStore } from 'pinia';

export const userLoginStore = defineStore('user', {
   state: () => ({
       userId: null,
       nickName: null,
       avatar: null
   }),
   actions: {
       // 登录成功后保存用户信息
       storeUser(userInfo) {
           this.userId = userInfo.userId;
           this.nickName = userInfo.nickName;
           this.avatar = userInfo.avatar;
       },
       
       setUserId(userId) {
           this.userId = userId;
       }
   },
   getters: {
       // 获取登录的用户信息
       getLoginedUser() {
           if (this.userId) {
               return {
                   userId: this.userId,
                   nickName: this.nickName,
                   avatar: this.avatar
               };
           }
           return null; // 如果没有用户信息，返回null
       }
   },
   persist: true // 启用状态持久化
});