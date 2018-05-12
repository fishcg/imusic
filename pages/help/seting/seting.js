//获取应用实例
var app = getApp()
Page({
  data: {
    imgUrls: [
      'http://wx2.sinaimg.cn/mw690/006wiWLZgy1ff25s3du42j30b60jxn2j.jpg',
      'http://wx2.sinaimg.cn/mw1024/006wiWLZgy1ff24350vscj30a30i2aax.jpg',
      'http://wx1.sinaimg.cn/mw1024/006wiWLZgy1ff2435dwsjj30a10hzjro.jpg'
    ],

    height:0
  },
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          height:res.windowHeight
        });
      }
    })
  },
  //返回上级页面
  back:function(){
   wx.navigateBack({
      delta: 1
    })
  },
})