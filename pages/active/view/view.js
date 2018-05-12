//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    photo:"",
    height:1000
  },
  //事件处理函数
  bindViewTap: function() {

  },
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    //发起请求
    wx.request({
      url: app.globalData.postUrl+'index/active/view',
      data: {
         id: id 
      },
      header:{
          "Content-Type":"application/json"
      },
      success: function(res) {
        var res = res.data;
        that.setData({
          photo: res.url,
          height:res.height
        });
        
      }
    });
  }
})
