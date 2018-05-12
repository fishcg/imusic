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
   
  }
})
