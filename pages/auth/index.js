import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
import { login } from "../../utils/asyncWx.js"

Page({
  // 获取用户信息
  async handleGetUserInfo(e){
    try{
      // 1 获取用户信息
      const { encryptedData,rawData,iv,signature } = e.detail;
      // 2 获取小程序登录成功后的code
      const {code}=await login();
      console.log(code)
      // 优化封装代码
      /* 
      wx.login({
        timeout: 10000,
        success:(result)=>{
          const {code}=result;
        }
      })
       */
      const loginParams = { encryptedData,rawData,iv,signature,code };
      // （注：因为不是企业账号，以下无法实现）
      // 3 发送请求 获取用户的token （注：因为不是企业账号，所以这一步无法实现）
      const {token} = await request({url:"/users/wxlogin",data:loginParams,method:"post"});
      // 4 把token存入缓存中 同时跳转回上一个页面
      // wx.setStorageSync('token', token);
      wx.setStorageSync('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo');
      wx.navigateBack({
        delta: 1,
      })
    }catch(error){
      console.log(error)
    }


  }
})