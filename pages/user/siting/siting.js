//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    autoPlay:false,
    hifi:true,
    
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
   /* wx.removeStorage({
      key: '3dr_session',
      success: function(res) {
        console.log(res.data)
      } 
    })*/
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUser(function(){
       //更新数据
       console.log("回调");
      var userInfo = wx.getStorageSync('userinfo') || []; 
      that.setData({
        userInfo:userInfo
      })
    })
    var moneyCanplay = wx.getStorageSync('moneyCanplay');
    if (moneyCanplay==1){
      that.setData({
        autoPlay: true,
      })
    }
    var yinzhi = wx.getStorageSync('yinzhi');
    if (yinzhi == 32) {
      that.setData({
        hifi: false,
      })
    }
  },
  listenerAutoplay: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    if (e.detail.value){
      wx.setStorage({
        key: "moneyCanplay",
        data: 1
      })
    }else{
      wx.setStorage({
        key: "moneyCanplay",
        data: 0
      })
    }
    
  },
  listenerYinzhi: function (e) {
    if (e.detail.value) {
      wx.setStorage({
        key: "yinzhi",
        data: 64
      })
    } else {
      wx.setStorage({
        key: "yinzhi",
        data: 32
      })
    }
  },
  //清缓存
  clearCookie: function (e) {
    wx.showModal({
      title: '温馨提示',
      content: '您确定要清空缓存吗QAQ',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorage({
            key: 'musicStorage',
            success: function (res) {
              wx.removeStorage({
                key: 'playhistory',
                success: function (res) {
                  wx.showToast({
                    title: '缓存已清空',
                    image: '/images/tool/clear.png',
                    duration: 2000
                  })
                }
              }) 
              
            }
          })
        } else if (res.cancel) {
        }
      }
    })
   

  },
})
