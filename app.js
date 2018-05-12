const CACHE = require("/js/constants/cache_key.js");
const KEY = require("/js/constants/key.js");
const MUtils = require("/js/MUtils.js");
const User = require("/js/controller/user.js");
const Request = require("/js/request.js");
App({
  CACHE: CACHE,
  KEY: KEY,
  onLaunch: function () {
    // 调用 API 从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 启动音
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.title = '喵~'
    backgroundAudioManager.epname = 'i音声启动音'
    backgroundAudioManager.singer = '加特林'
    backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
    backgroundAudioManager.src = 'http://static.missevan.com/sound/201605/14/297966dceaf85625530bad6e682dda47120400.mp3'
  },

  onHide: function() {
    // Do something when page hide.
  },

  /**
   *格式化时间戳
   *
   * @todo 考虑加入常用工具函数类中
   * @params {String} format 时间格式
   * @params {String} timestamp 时间戳
   * @params {String} 格式化后的时间
   */
  date:function(format, timestamp){
    return MUtils.date(format, timestamp)
  },
  ajax: function (info, check_login) {
    return Request.ajax(info, check_login)
  },

  /**
   * 登陆
   * @params 登陆成功后回调方法
   */
  getUser: function(format, timestamp) {
    return User.getUser(format, timestamp)
  },

  audioPlay:function (e) {
   e.play()
  },

  var globalData = {
    postUrl: KEY.DOMAIN,
    userInfo:null,
    bgmusic:"",
    music_id:0,
    photo: 'http://img5.niutuku.com/shoujibizhi/32/3227-11007.jpg',
    subject: '你猜这是什么歌',
    author: '匿名',
    time:"00:00",
    lyric:"暂无歌词",
    m_key:0,
    listlenght:0,
    status:1,
    tmusic:{},
    user:{}
  }
})