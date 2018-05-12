/*
 *定义网络请求函数类
 *created by fish
 *2018-02-03
*/
const CACHE = require("./constants/cache_key.js");
const KEY = require("./constants/key.js");
const MUtils = require("./MUtils.js");
const User = require("./controller/user.js");
 /*
  *执行 Ajax 请求
  *
  *@params object 请求的内容
  */
function ajax(info, check_login = false)
{
  var user_token = wx.getStorageSync(CACHE.USER_TOKEN)
  if (check_login && !user_token) {
      // 用户从未登陆或用户信息被清除，直接（注册）登陆
      User.getUser(function () {
        console.log('先登录')
      })
  }
	var url = KEY.DOMAIN + info.url
	console.log(info)
	if (!info.header) {
		info.header = {
			'Content-Type': 'application/x-www-form-urlencoded',
			'token': user_token
		}
	}
  if (!info.method) {
    info.method = 'POST'
  }
	info.url = url
	// 发起网络请求
  wx.request(info)
}
module.exports = {
	ajax: ajax
}
