import { getSetting,chooseAddress,openSetting,showModal,showToast } from "../../utils/asyncWx.js"
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({
  data: {
    latitude:  23.09900,
    longitude: 113.32550,
    markers: [{
      id: 0,
      latitude: 23.09900,
      longitude: 113.32550,
      width: 50,
      height: 50
    }],
    address:{},
    isOpen:false
  },
  onShow(){
    // 1 获取缓存中的收货地址信息
    const address=wx.getStorageSync("address");
    // 1 获取缓存中的购物车数据
    const cart=wx.getStorageSync("cart")||[];
    this.setData({
      address,
      isOpen:true
    });
  },
  async handleChooseAddress(){
    try{
      const res1=await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      // 2 判断 权限状态
      if(scopeAddress === false){
        // 3 诱导用户打开授权页面
        await openSetting();
      }
      // 4 调用获取收货地址的api
      let address = await chooseAddress();
      address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo;
      // console.log(res2);
      // 5 存入到缓存中
      wx.setStorageSync('address', address)
    }catch(error){
      console.log(error)
    }
  },
  markertap() {
    wx.openLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
    })
    
  }
})