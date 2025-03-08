import { defineStore } from "pinia";

export const userLoginStore = defineStore('userLoginStore',{
    
    actions:{
        //登录成功后保存用户信息
        storeUser(userId:string,nickName:string,avatar:string){
            this.userId = userId;
            this.nickName = nickName;
            this.avatar = avatar;
        },
        setUserId(userId:string){
            this.userId = userId
        },
    },
    getters:{
        //获取登录的用户信息
        getLoginedUser():any{
            if(this.userId){
                return {
                    userId:this.userId,
                    nickName:this.nickName,
                    avatar:this.avatar
                }
            }
        },
        getLoginUserId():any{
            return this.userId
        }
    },
    state:()=>{
        return {
            userId:'',
            nickName:'',
            avatar:''
        }
    },
    // 修改持久化配置
    persist: {
        enabled: true,
        strategies: [
        {
            key: 'user_info', // 自定义存储键名
            storage: localStorage, // 指定存储方式
            paths: ['userId', 'nickName', 'avatar'] // 指定要持久化的字段
        }
        ]
    }
})