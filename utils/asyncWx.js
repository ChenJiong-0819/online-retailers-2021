/*
  promise 形式 getSetting
*/

export const getSetting=()=>{
  return new Promise((resolve,reject)=>{
    wx.getSetting({
      success:(result) => {
        resolve(result);
      },
      fail:(err) => {
        reject(err);
      }
    });
  })
}

/*
  promise 形式 chooseAddress
*/

export const chooseAddress=()=>{
  return new Promise((resolve,reject)=>{
    wx.chooseAddress({
      success:(result) => {
        resolve(result);
      },
      fail:(err) => {
        reject(err);
      }
    })
  })
}

/*
  promise 形式 openSetting
*/

export const openSetting=()=>{
  return new Promise((resolve,reject)=>{
    wx.openSetting({
      success:(result) => {
        resolve(result);
      },
      fail:(err) => {
        reject(err);
      }
    })
  })
}

/*
  promise 形式 showModal
  @param {object} param0 参数
*/

export const showModal=({content})=>{
  return new Promise((resolve,reject)=>{
    wx.showModal({
      title:"提示",
      content:content,
      // 要用箭头函数表示，否则this指定的是showModal函数而不是window
      success:(res)=>{
        resolve(res);
      },
      fail:(err)=>{
        reject(err);
      }
    })
  })
}


/*
  promise 形式 showToast
  @param {object} param0 参数
*/

export const showToast=({title})=>{
  return new Promise((resolve,reject)=>{
    wx.showToast({
      title: title,
      icon:'none',
      // 要用箭头函数表示，否则this指定的是showModal函数而不是window
      success:(res)=>{
        resolve(res);
      },
      fail:(err)=>{
        reject(err);
      }
    })
  })
}

/*
  promise 形式 login
  @param {object} param0 参数
*/

export const login=()=>{
  return new Promise((resolve,reject)=>{
    wx.login({
      timeout: 10000,
      success:(result) => {
        resolve(result);
      },
      fail:(err) => {
        reject(err);
      }
    })
  })
}


/*
  promise 形式 小程序的微信支付
  @param {object} pay 支付所必要的参数
*/

export const requestPayment=(pay)=>{
  return new Promise((resolve,reject)=>{
    wx.requestPayment({
      ...pay,
      success: (result) => {resolve(result)},
      fail: (err) => {reject(err)}
    })
  })
}