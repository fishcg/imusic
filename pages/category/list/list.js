//index.js
//获取应用实例
var app = getApp()
var id;
Page({
  data: {
    bgimg:"http://wx1.sinaimg.cn/mw690/006wiWLZgy1fedxkgehl4j30sg0cujv7.jpg",
    length:1,
    nothing:"http://wx2.sinaimg.cn/mw690/006wiWLZgy1fes3owywjoj3046068wfk.jpg"
    
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    that.id = id;
    that.setData({
        subject: options.subject
    }); 
    //发起请求
    wx.showLoading({
      title: '努力加载中',
    })
    that.ajaxlist(id);
  },
  onPullDownRefresh: function () {
    this.ajaxlist(this.id);
  },
  ajaxlist:function(id){
    var that = this;
    wx.request({
      url: app.globalData.postUrl + 'index/musicm/categorylist',
      data: {
        id: id
      },
      header: {
        "Content-Type": "application/json"
      },

      success: function (res) {
        var res = res.data;
        that.setData({
          list: res,
          length: res.length
        });
        wx.hideLoading();
        wx.stopPullDownRefresh();
      }
    });
  }
})
