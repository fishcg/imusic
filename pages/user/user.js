//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    
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
   
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
   
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      success: function (res) {
        console.log("转发");
        // 转发成功
      },
      fail: function (res) {
        console.log("转发f");
        // 转发失败
      }
    }
  }
})
