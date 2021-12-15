// pages/user/index.js

Page({
  data:{
    userinfo: {},
    // 被收藏的商品的数量
    collectNums:0
  },
  onShow(){
    
    const userinfo = wx.getStorageSync('userinfo');
    const collect = wx.getStorageSync('collect')||[];
    
    // console.log(userinfo)
    // console.log(JSON.parse(userinfo).avatarUrl)
    this.setData({
      userinfo:userinfo,
      collectNums:collect.length
    });
  },
  
  
})