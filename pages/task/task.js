var app = getApp()

Page({
  data: {
    zanbi: 0,
    isSign:0,
    isLottery:0,
    comment_count:0,

  },

    // 生命周期函数--监听页面加载
  onLoad:function(options){
    var that = this;
    //请求用户任务情况数据
    app.ajax(
      {
        url: 'index/task',
        success: function(res) {
          var res = res.data
          // 登陆过期时，重新登陆
          if (typeof res.code !== 'undefined' && res.code === 10001) {
            app.getUser(that.onLoad)
            return
          }
          that.setData({
            zanbi: res.info.cash,
            isSign: res.info.is_sign,
            comment_count: res.info.comment_count,
            isLottery: res.info.lottery_count
          })
        }
      },
      true
    )
  },

  // 签到
  sign: function(e){
    var that = this;
    // 发送签到请求
    app.ajax(
      {
        url: 'index/task/sign',
        success: function (res) {
          var res = res.data;
          console.log(res);
          if (res.status === 200) {
            that.setData({
              zanbi: res.info.cash,
              isSign: 1,
            })
            wx.showToast({
              title: res.info.message,
              icon: 'success',
              duration: 2000
            })
          } else {
            // 登陆过期时，重新登陆
            if (res.code === 10001) {
              app.getUser(that.sign)
              return false
            }
            wx.showToast({
              title: res.info,
              image: '/images/quxiao.png',
              duration: 2000
            })
          }
        },
        fail: function () {
          wx.showToast({
            title: '网络请求失败',
            icon: 'success',
            duration: 2000
          })
        }
      },
      true
    )
  },

  //抽奖
  lottery:function(e){
    var that = this
    //请求用户任务情况数据
    app.ajax(
      {
        url: 'index/task/lottery',
        success: function (res) {
          var res = res.data;
          console.log(res);
          if (res.status === 200) {
            that.setData({
              zanbi: res.info.cash,
              isLottery: 1,
            })
            wx.showToast({
              title: res.info.message,
              icon: 'success',
              duration: 2000
            })
          } else {
            // 登陆过期时，重新登陆
            if (res.code === 10001) {
              app.getUser(that.lottery)
              return false
            }
            wx.showToast({
              title: res.info,
              image: '/images/sad.png',
              duration: 2000
            })
          }
        },
        fail: function () {
          wx.showToast({
            title: '网络请求失败',
            icon: 'success',
            duration: 2000
          })
        }
      },
      true
    )
  },

})