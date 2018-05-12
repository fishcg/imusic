var app = getApp()  
Page({  
   onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  data: {  
      imgUrls: [  
       {  
          link:'/pages/index/index',  
          url:'/images/other/banner1.png'   
       },{  
          link:'/pages/logs/logs',  
          url:'/images/other/banner2.png'   
       },{  
          link:'/pages/test/test',  
          url:'/images/other/banner3.png'   
       } ,
         
    ],  

     items: [{
        message: 'foo',
      },{
        message: 'bar'
      }],
    //bgmusic:"http://m2.music.126.net/5W0FdIuDE5ypFTpBtMVjfQ==/18550960185473716.mp3",
    indicatorDots: true,  
    autoplay: true,  
    interval: 5000,  
    duration: 1000,  
    userInfo: {}  
  },  
onLoad: function () {
    var that = this;
    //发起请求
    app.ajax({
      url: 'index/musicm',
      mothed: 'GET',
      success: function(res) {
        var info = res.data.info
        if (res.data.status === 200) {
          that.setData({
            index_sound: info,
            bgmusic: app.globalData.bgmusic
          })
        } else {
          wx.showToast({
            title: info,
            image: '/images/quxiao.png',
            duration: 2000
          })
        }
      }
    });
 },

  audioPlay1: function () {
    app.audioPlay(this.audioCtx)
  },
  onShow: function(){
    var that = this;
    //console.log();
     that.setData({        
          bgmusic:app.globalData.bgmusic
     });
  },
  refesh:function(){
    this.onLoad();
  }
})  