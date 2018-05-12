var app = getApp();
Page({
  data: {
   // animationData: {},
   musiclist:"",
   bgimg:'http://tupian.enterdesk.com/uploadfile/2012/1011/20121011092237493.jpg',
   music_id:'',
   time:'',
    
  },
  onReady: function (e) {
    

  },
  binddan:function(e){
    this.content = e;
  },
  onShow: function(){
    var musicStorage = wx.getStorageSync('musicStorage') || []; 
    var j;
    var len;
    var that = this;
    musicStorage = that.suber(musicStorage);
    that.setData({
        musiclist: musicStorage,
        bgimg:app.globalData.photo,
        music_id:app.globalData.music_id,
        time:app.globalData.time,       
    });
  },
  clear:function(e){
    var that =this;
    var key = parseInt(e.currentTarget.dataset.key);
    var musicStorage = wx.getStorageSync('musicStorage') || []; 
    musicStorage.splice(key, 1);
    wx.setStorageSync('musicStorage', musicStorage);
    musicStorage = that.suber(musicStorage);
    that.setData({
      musiclist: musicStorage
    });
  },
  clearall:function(){
    var that = this;
    wx.showModal({
      title: '温馨提示',
      content: '您确定要清空播放列表吗QAQ',
      success: function(res) {
        if (res.confirm) {
          wx.removeStorage({
            key: 'musicStorage',
            success: function(res) {
              that.setData({
                  musiclist:[]
              });
            } 
          })
        } else if (res.cancel) {
        }
      }
    })
    
  },

  suber:function(arr){
    var j;
    var len;
    for (j = 0, len = arr.length; j < len; j++) {
      if (arr[j][1].length > 19) {
        arr[j][1] = arr[j][1].substring(0, 19) + "..."
      }

    }
    return arr;
  },

  rotateAndScale: function () {
    // 旋转同时放大
    this.animation.rotate(45).scale(2, 2).step()
    this.setData({
      animationData: this.animation.export()
    })
  },

})