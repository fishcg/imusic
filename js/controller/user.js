/*
 *定义各类常用函数
 *created by fish
 *2018-02-03
*/
const CACHE = require("../constants/cache_key.js");
const KEY = require("../constants/key.js");
const MUtils = require("../MUtils.js");
 /*
  *执行需要登陆的操作
  *
  *@params 需要执行的方法，若未登录，则先进行注册登录操作
  */
function userDo(callback){
  var that = this
  var session_key = wx.getStorageSync(CACHE.USER_KEY)
  if(session_key){
    console.log('用户已登陆')
    callback()
    return false;
  } else {
  	// 若缓存中用户 session 不存在，进行登录操作
  	wx.login({
      success: function (data) {
        wx.getUserInfo({
          success: function (res) {
            if (data.code) {
              // 发起登陆网络请求
              wx.request({
                url: KEY.DOMAIN + 'index/user/login',
                method: 'POST',
                dataType: 'json',
                data: {
                  code: data.code,
                  userinfo: JSON.stringify(res.userInfo)
                },
                header:{
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function(jsonres) {
                  wx.setStorageSync('userinfo', res.userInfo);
                  if (jsonres.data.status === 200){
                  	// 写入缓存
                    wx.setStorageSync(CACHE.USER_TOKEN, jsonres.data.token);
                  }
                  callback()
                }
              })
            }                  
          },
          fail:function(){
            console.log("获取用户信息失败了");
            wx.showModal({
              title: '温馨提示',
              content: '您未对i音声授权登陆，是否前去授权',
              showCancel: true,
              confirmText: '如何授权',
              success: function(res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/help/seting/seting'
                  })
                } else if (res.cancel) {
                  // console.log('用户点击取消')
                }
              }
            })
          },
        })
      }
    })
	}
}
module.exports = {
  getUser: userDo
}
