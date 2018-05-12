//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    feedbacks: {},
    
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
    var that = this;
    that.ajaxlist();
    //调用应用实例的方法获取全局数据

   
  },
  //获取数据
  ajaxlist : function (e) {
    console.log("------------------>开始取数据");
    var that = this;
    app.getUser(function () {
      //更新数据
      var session_key = wx.getStorageSync('3dr_session');
      wx.request({
        url: app.globalData.postUrl + 'index/feedback/ajaxlist',
        data: {
          uid: session_key,
        },
        header: {
          "Content-Type": "application/json"
        },
        success: function (res) {
          var feedbacks = res.data;
          that.setData({
            feedbacks: feedbacks
          })
        }
      })
      
    })
  },
  //发送反馈
  comment: function (e) {
    var that = this;
    app.getUser(function () {
      var formData = e.detail.value;
      console.log(formData);
      console.log(formData.content);
      var content = formData.content == undefined ? formData : formData.content;

      console.log(content);
      if (content == '') {
        wx.showToast({
          title: '反馈信息不能为空哟~',
          image: '/images/sad.png',
          duration: 2000
        })
        return false;
      }
      //获取系统信息
      var system = wx.getStorageSync('system');
      console.log("------------------>缓存是" + system);
      if (system==""){
        try {
          system = wx.getSystemInfoSync();
          wx.setStorage({
            key: "yinzhi",
            data: system
          })
        } catch (e) {

        }
      }
      var device = system.model;
      var version = system.version;
      var session_key = wx.getStorageSync('3dr_session');
      wx.request({
        url: app.globalData.postUrl + 'index/feedback/create',
        data: {
          uid: session_key,
          device: device,
          version: version,
          content: content
        },
        header: {
          "Content-Type": "application/json"
        },
        success: function (res) {
          var status = res.data.status;
          if (status == 1) {
            wx.showToast({
              title: '评论成功',
              icon: 'success',
              duration: 2000
            });
            that.ajaxlist();

          } else {
            wx.showToast({
              title: res.data.message,
              image: '/images/sad.png',
              duration: 2000
            })
          }
        }
      })
    })
  }
})
