//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    huodong:"http://wx3.sinaimg.cn/mw690/006wiWLZgy1fed25ppbg0j30rs209tqz.jpg",
    huodong2:"http://wx4.sinaimg.cn/mw690/006wiWLZgy1fed9t5i76cj31d84m4kjn.jpg",
    list1:"http://wx2.sinaimg.cn/mw690/006wiWLZgy1fed7flfddjj30j508u114.jpg",
    list2:"http://wx3.sinaimg.cn/mw690/006wiWLZgy1fed9x0w07ej30kf08zdgb.jpg"
  },
  //事件处理函数
  bindViewTap: function() {

  },
  onLoad: function () {
    var that = this;
    //发起请求
    wx.request({
      url: app.globalData.postUrl+'index/active',
      data: {
      },
      header:{
          "Content-Type":"application/json"
      },
      success: function(res) {
        var res = res.data;
        that.setData({
          list: res,
        });
        
      }
    });
  }
})
