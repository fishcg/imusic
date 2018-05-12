//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    musics: {},
  },
  onLoad: function () {
    var that = this
    that.ajaxlist();
   
  },
  onPullDownRefresh: function () {
    this.ajaxlist();
  },
  //获取数据
  ajaxlist : function (e) {
    console.log("------------------>开始取数据");
    var that = this;
    app.getUser(function () {
      //更新数据
      var session_key = wx.getStorageSync('3dr_session');
      wx.request({
        url: app.globalData.postUrl + 'index/user/followmusic',
        data: {
          uid: session_key,
        },
        header: {
          "Content-Type": "application/json"
        },
        success: function (res) {
          var musics = res.data;
          that.setData({
            musics: musics
          })
          wx.stopPullDownRefresh();
        }
      })
      
    })
  },
})
