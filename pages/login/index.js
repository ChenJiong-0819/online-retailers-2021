// pages/login/index.js
Page({
  // handleGetUserInfo(e){
  //   const {userInfo}=e.detail;
  //   wx.setStorageSync('userinfo', userInfo);
  //   wx.navigateBack({
  //     delta: 1
  //   })
  // },
  data: {
    userInfo: {}
  },
  getUserProfile(e) {
    const {UserProfile}=e.detail;
    wx.getUserProfile({
      desc:"授权登录",
      success: (res) => {
        // console.log(res.rawData)
        this.setData({
          userinfo: res.userInfo,
          hasUserInfo: true
        })
        // console.log(res.userInfo)
        wx.setStorageSync('userinfo',this.data.userinfo);
          // const {userinfo} = this.data  
          // console.log(JSON.parse(userinfo).avatarUrl)
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
  
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }


})