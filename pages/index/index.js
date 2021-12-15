// 0 引入 用来发送请求的方法 一定要把路径补全
import { request } from "../../request/index.js"

let innerAudioContext = wx.createInnerAudioContext();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数组
    swiperList:[],
    // 导航 数组
    catesList:[],
    // 楼层数据
    floorList:[],
    isPlay:false
  },
  // 页面开始加载 就会触发
  onLoad: function (options) {
    // 1 发送异步请求获取轮播图数据 优化的手段可以通过es6的 promise 来解决这个问题
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success:(result) => {
    //     this.setData({
    //       swiperList:result.data.message//成功返回的数据，并显示数据
    //     })
    //   }
    // })
    
    request({url:"/home/swiperdata"})
      .then(result=>{
        this.setData({
          swiperList:result
        })
      })
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
    this.backmusic();

  },

  // 获取轮播图数据
  getSwiperList(){
    // res.map(item)=>(item.navigator_url=item.navigator_url.replace(/main/,'index'));
    request({url:"/home/swiperdata"})
      .then(result=>{
        // 接口中给的url不一样 /pages/goods_detail/main?goods_id=129
        // 不能直接引用 需要将 main 更改为 index
        result.forEach((v, i) => {result[i].navigator_url = v.navigator_url.replace("main", "index")})
        this.setData({
          swiperList:result,
        })
      })
  },
  
  // 获取 分类导航数据
  getCatesList(){
    request({url:"/home/catitems"})
      .then(result=>{
        this.setData({
          catesList:result
        })
      })
  },

  // 获取 楼层数据
  getFloorList(){
    request({url:"/home/floordata"})
      .then(result=>{
        // 接口中给的url不一样 /pages/goods_list?query=登山包
        // 需要将 ? 更改为 /index
        result.forEach(v1 => {
          v1.product_list.forEach(v2 => {
            v2.navigator_url = v2.navigator_url.replace('?', '/index?');
          }); 
        });
        /* 
        for (let k = 0; k < result.length; k++) {
          result[k].product_list.forEach((v, i) => {
              result[k].product_list[i].navigator_url = v.navigator_url.replace('?', '/index?');
          });
        };
         */
        this.setData({
          floorList:result
        })
      })
  },


  backmusic(isPlay) {
    // 遇到播放音乐时暂停不了 需要把innerAudioContext提升到全局变量
    // let innerAudioContext = wx.createInnerAudioContext();
    // innerAudioContext.autoplay = true;
    innerAudioContext.src = "http://dl.stream.qqmusic.qq.com/C400001AXvwr17GhSM.m4a?guid=8185813692&vkey=239FE4E6CF2D780B2C6F0DE7C5357B31ECF7FB0A58E0F8B9C052106F7093CB47D7CAFB788D0A6BFEAAED89D2C246C6F6CF5153688D2D973D&uin=1092845896&fromtag=66"
    innerAudioContext.loop = true;
    // 创建控制音乐播放
    if(isPlay){
      innerAudioContext.play();
    }else{
      innerAudioContext.pause();
    }
  },

  //点击播放音乐
  handleMusicPlay(){
    let isPlay = !this.data.isPlay;
    this.setData({
      isPlay
    })
    this.backmusic(isPlay);
  }


})