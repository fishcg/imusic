//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    // bgimg: "http://wx1.sinaimg.cn/mw690/006wiWLZgy1fedxkgehl4j30sg0cujv7.jpg",
    bgimg: "/images/rank/top.jpg"
  },
  //下拉刷新函数
  onPullDownRefresh: function () {
    this.ajaxlist();
  },
  
  onLoad: function () {
    var that = this;
    //发起请求
    wx.showLoading({
      title: '努力加载中~',
    })
    that.ajaxlist();
  },
  ajaxlist:function(){
    var that = this;
    wx.request({
      url: app.globalData.postUrl + 'index/musicm/rank',
      header: {
        "Content-Type": "application/json"
      },

      success: function (res) {
        var res = res.data;
        that.setData({
          list: res,
        });
        wx.hideLoading();
        wx.stopPullDownRefresh();
      }
    });
  }
})
