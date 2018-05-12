//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    issearch:0,
    list:[],
    historyList:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  search:function(e){
    var that = this;  
    var formData = e.detail.value;   
    if(formData.name==""){
      wx.showToast({
        title: '没输歌曲名>.<',
        image: '/images/sad.png',
        duration: 2000
      })
      return false;
    }
    //发起请求
    wx.showLoading({
      title: '网络有些慢呢+﹏+',
    })
    wx.request({  
      //url: 'http://www.ggg.com/index/musicm/search',  
      url: app.globalData.postUrl+'index/musicm/search', 
      data: formData,  
      header: {  
          'Content-Type': 'application/json'  
      },  
      success: function(res) {  
        var arr = res.data.info.model;
        //console.log(arr)  
       /* console.log(arr[0].name);
        console.log(arr[0].audio);
        console.log(arr[0].album.picUrl);
        console.log(arr[0].id);
        console.log(arr[0].artists[0].name);*/
        that.setData({
          list: arr,
          issearch:1
        }); 
        wx.hideLoading()
      } 
    })
      //缓存播放历史
    var playhistory = wx.getStorageSync('playhistory') || []; 
    for (var i = 0; i < playhistory.length; i++) {
      if (playhistory[i] == formData.name) {
        playhistory.splice(i, 1);
        break;
      }
    }
    var len = playhistory.unshift(formData.name);
    if(len>12){
        playhistory.splice(12, 1);
    }
    wx.setStorageSync('playhistory', playhistory);
    that.setData({
      historyList:wx.getStorageSync('playhistory')
    });   
  },
  //新增歌曲到库，返回错误或歌曲id
  add:function(e){
    var that = this;
    var music_id = parseInt(e.currentTarget.dataset.music_id);
    console.log(music_id);
     wx.request({
      //url:"http://www.ggg.com/index/musicm/create",
      url:app.globalData.postUrl+"index/musicm/create",
      header:{
          "Content-Type":"application/json"
      },
      data: {
        music_id: music_id 
      },
      success: function(e) {
        var res = e.data;
        if(res==0){
          wx.showToast({
          title:"这首歌已消失在了异次元" ,
          image: '/images/sad.png',
          duration: 2000
          })
          return false;
        }else{
          //跳转
           wx.redirectTo({
            url: '/pages/view/view?id='+res
           }) 
        }
        that.setData({
          //list: res,
        }); 
        wx.hideLoading()
      }
    });
  },
  inputext:function(e){
     var that = this;
     var name = e.detail.value;
      wx.request({  
      //url: 'http://www.ggg.com/index/musicm/search',  
      url: app.globalData.postUrl+'index/musicm/search',
      data: {
        name:name,
        page:1
      },  
      header: {  
          'Content-Type': 'application/json'  
      },  
      success: function(res) {  
        var arr = res.data.info.model;
        that.setData({
          list: arr,
          issearch:1
        }); 
      }  
    })  
  },
  searchword:function(e){
    var that = this;
    var name = e.currentTarget.dataset.word;
    that.setData({
          value: name,
    });
    //发起请求
    wx.request({  
      //url: 'http://www.ggg.com/index/musicm/search',  
      url: app.globalData.postUrl+'index/musicm/search', 
      data: {
        name:name,
        page: 1
      },  
      header: {  
          'Content-Type': 'application/json'  
      },  
      success: function(res) {  
        var arr = res.data.info.model;
        that.setData({
          list: arr,
          issearch:1
        }); 
      }  
    })
    //缓存播放历史
    var playhistory = wx.getStorageSync('playhistory') || []; 
    for (var i = 0; i < playhistory.length; i++) {
      if (playhistory[i] == name) {
        playhistory.splice(i, 1);
        break;
      }
    }
    var len = playhistory.unshift(name);
    if(len>12){
        playhistory.splice(12, 1);
    }
    wx.setStorageSync('playhistory', playhistory);
    that.setData({
      historyList:wx.getStorageSync('playhistory')
    });   
  },
  //清除历史记录
  clearall:function(){
    var that = this;
    wx.removeStorage({
      key: 'playhistory',
      success: function(res) {
        that.setData({
            historyList:[]
        });
      } 
    }) 
  },
  onLoad: function () {
    var that = this;
    that.setData({
      historyList:wx.getStorageSync('playhistory')
    }); 
  }
})
