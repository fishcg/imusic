var app = getApp()
var playTime = 0 ;
var lyrics =null;
var transform1 =0;
var currentPosition = 0;
var barrage_style_arr = [];
var barrage_style_obj ={};
var phoneWidth = 0;
var timers = [];
var timer1 ;
var m_id =0;
var totype = 0;
var session_key = wx.getStorageSync('3dr_session') ||0;
var danmuci =1;
var autoPlay =false;
var moneyCanplay = 0;
Page({
  onReady: function (e) {

    // 使用 wx.createAudioContext 获取 audio 上下文 context
   // this.audioCtx = wx.createAudioContext('myAudio');
  },
  data: {
    //music: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
   // music: 'http://m2.music.126.net/5W0FdIuDE5ypFTpBtMVjfQ==/18550960185473716.mp3',
    music: '',
    name: '未闻',
    author: '无名英雄',
    views:0,
    tmusic:[],
    percentage: 0,
    photo: "",
    transform: 0,
    play: 'playBtn',
    time: "00:00",
    lyric:"",
    //样式
    select:"summary",
    style:"complete",
    btnname:"简洁模式",
    playimg:"/images/view/play.png",
    fllowimg:"/images/view/heart-icon1.png",
    goodimg:"/images/view/zanbi1.png",
    erroimg:"/images/view/erro1.png",
    danmuimg:"http://wx2.sinaimg.cn/small/006wiWLZgy1fe7aa2d6ygj3032032743.jpg",
    userInfo: {},
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    barrageTextColor:"#D3D3D3",
    barrage_inputText:"none",
    barrage_shoottextColor:"black",
    bind_shootValue:"",
    barrage_style:[],
    barragefly_display:"none",
    commentNum:0,
    comments:[],
    nocomment:"http://wx2.sinaimg.cn/mw690/006wiWLZgy1ff72zfirdbj305k06caap.jpg",
    reset:'',
    //即时弹幕
    nbso:{},
    danmu:{},
    danmu2:{},
    leftwidth:0,
    flys:{},
    user:{},
    //是否关注
    isfollow:"+关注",
    isfollowStyle:"follow",
  },
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    //获取评论
    that.commentlist(id);
    clearInterval(that.timer);
    that.timer=null;
    totype = options.type||0;
    m_id = options.id;
    //听过的歌记录到缓存
    //获取屏幕宽度
    wx.getSystemInfo({
      success: function(res) {
          that.setData({
              barrage_phoneWidth:res.windowWidth-100,
          })
      }
    })
    phoneWidth = that.data.barrage_phoneWidth;
    if(app.globalData.music_id==id){
      
      //从全局变量拿数据
      wx.getBackgroundAudioPlayerState({
        success: function(res) {
          console.log(app.globalData.user);
           that.setData({
            photo: app.globalData.photo,
            subject: app.globalData.subject,
            author: app.globalData.author,
            currentPosition :  res.currentPosition, 
            tmusic: app.globalData.tmusic,
            user: app.globalData.user,    
          });
          //是否关注了
           that.isfollow(id);
          if(res.status ==0){
            that.setData({
               play: "playBtn",
               playimg:"/images/view/play.png",
               percentage: res.currentPosition/playTime * 1000, 
               lyric:app.globalData.lyric,
               time:app.globalData.time,       
            });
          }else if(res.status ==1){
            that.setData({
              play: "noplayBtn",
              playimg:"/images/view/zanting.png",  
            });
            that.guangdiea(1800);
            that.timer = setInterval(that.canvasClock, 500);
          }
        }     
      }) 
      //that.guangdiea();
    }else{
      //发起请求
      app.ajax({
        url: 'index/musicm/view',
        data: {
          id: id,
        },
        method: 'GET',
        success: function (res) {
          if (res.data.status !== 200) {
            wx.showToast({
              title: res.data.info,
              image: '/images/sad.png',
              duration: 2000
            })
            return
          }
          var res = res.data.info
          //获取播放地址
          var url = res.url;
          var yinzhi = wx.getStorageSync('yinzhi');
          if (yinzhi==32){
            url = res.url_32;
          }
          app.globalData.bgmusic = url;
          app.globalData.music_id = res.id;
          app.globalData.photo = res.photo;
          app.globalData.subject = res.subject;
          app.globalData.author = res.author;
          app.globalData.tmusic = res;
          app.globalData.user = {
              username: res.user_name,
              user_id: res.user_id,
              user_avatar: res.user_avatar,
              user_summary: res.user_summary,
            };
          //缓存到播放列表
          var musicStorage = wx.getStorageSync('musicStorage') || [];
          var a = 0;
          if (options.type != 1) {
            for (var i = 0; i < musicStorage.length; i++) {
              if (musicStorage[i][0] == res.id) {
                //musicStorage.splice(i, 1);
                a += 1;
                app.globalData.m_key = i;
                break;
              }
            }
            if (a == 0) {
              var arr = [id, res.subject, res.author]
              musicStorage.push(arr);
              wx.setStorageSync('musicStorage', musicStorage);
            }
            var musicStorage1 = wx.getStorageSync('musicStorage') || [];
            app.globalData.listlenght = musicStorage1.length;
            // console.log(musicStorage);
          } else {
            //console.log(musicStorage);
          }
          that.setData({
            music: url,
            photo: res.photo,
            subject: res.subject,
            author: res.author,
            bgmusic: url,
            views: res.views,
            tmusic: res,
            flys: res.flys,
            user:{
              username: res.user_name,
              user_id: res.user_id,
              user_avatar: res.user_avatar,
              user_summary: res.user_summary,
            },
           
            
          });
          //playTime =  res.playtime;
          lyrics = res.lyric;
          if (res.lyric != null) {
            lyrics = JSON.parse(lyrics);
          }
          //是否关注了
          that.isfollow(id);
          //获取是否允许非wifi播放
          try {
            this.moneyCanplay = wx.getStorageSync('moneyCanplay')
            if (this.moneyCanplay != 1) {
              //判断网络类型
              wx.getNetworkType({
                success: function (res) {
                  // 返回网络类型, 有效值：
                  // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
                  var networkType = res.networkType;
                  if (networkType != 'wifi') {
                    wx.showModal({
                      title: '提示',
                      confirmText: '土豪任性',
                      content: '当前木有wifi,是否继续播放',
                      success: function (res) {
                        if (res.confirm) {
                          wx.setStorage({
                            key: "moneyCanplay",
                            data: 1
                          })
                          that.audioPlay();
                        } else if (res.cancel) {
                          console.log('用户点击取消')
                        }
                      }
                    })
                  } else {
                    console.log('开始播放')
                    that.audioPlay();
                  }
                }
              })
            }else{
              console.log('开始播放')
              that.audioPlay();
            }
          } catch (e) {
            // Do something when catch error
          }   
        }
      })
    }
  },
  onShow:function(options){

  },
  onUnload: function() {
    //播放控制进度条
    wx.getBackgroundAudioPlayerState({
      success: function(res) {
        currentPosition = res.currentPosition;
        playTime = res.duration
      }
    })
    
    var time1 = currentPosition;
    var myDate = new Date(time1*1000);
    var minutes = myDate.getMinutes();
    var second = myDate.getSeconds();
    if(second<10){
      second = "0"+second
    }
    if(minutes<10){
      minutes = "0"+minutes
    }
    var times =  minutes + ':' + second;
    var that = this;
    app.globalData.lyric = that.lyric;
    app.globalData.time = times;
  },
  
  //加大音量
  addSound:function(e){

  },
  canvasClock: function () {
    //播放控制进度条
    var that = this;
    wx.getBackgroundAudioPlayerState({
      success: function(res) {
        currentPosition = res.currentPosition;
        playTime = res.duration;
        var status2 = res.status;
        //播放结束读取缓存到下首歌
        if(that.data.percentage>900&&(status2==2||status2==0)){
           that.setData({
            play: "playBtn",
            playimg:"/images/view/zanting.png"
          })
          that.audioPlay();
          var musicStorage = wx.getStorageSync('musicStorage')
          clearInterval(that.timer);
          that.timer=null;
          var key =  app.globalData.m_key+1;
          if(key>=app.globalData.listlenght){
            key =0;
          }
          wx.redirectTo({
             url: '/pages/view/view?id='+musicStorage[key][0]
          }) 
        }
      }
    })
    

    var time1 = currentPosition;
    var myDate = new Date(time1*1000);
    var minutes = myDate.getMinutes();
    var second = myDate.getSeconds();
    if(second<10){
      second = "0"+second
    }
    if(minutes<10){
      minutes = "0"+minutes
    }
    var times =  minutes + ':' + second;
    this.setData({
      percentage: currentPosition /playTime * 1000,
      time:times,
    })
    if(lyrics!=null){
       this.setData({
          lyric:lyrics[times]
        })
    }  
    if(this.data.transform>360){
       this.setData({
        transform: 0
       })
    }
   
  },
  audioPlay: function () {
      if (this.data.play == "playBtn") {
        //弹幕
        var flys = this.data.flys;
        var flys_arr = [];
        for (var val of flys) {
          //高度颜色随机
          var textColor = "rgb(" + parseInt(Math.random() * 256) + "," + parseInt(Math.random() * 256) + "," + parseInt(Math.random() * 256) + ")";
          var barrageText_height = (Math.random()) * 266;
          var textval = val.content;
          //创建动画

          var barrage_obj = {
            barrageText_height: barrageText_height,
            barrage_shootText: textval,
            barrage_shoottextColor: textColor,
            barrage_phoneWidth: phoneWidth + 100,
            fkey: val.id
          };
          //添加元素
          flys_arr.push(barrage_obj);
        }
        this.setData({
          flys: flys_arr,
        })
        //动画定义
        var danmu2 = wx.createAnimation({
          duration: 10000,
          timingFunction: 'linear',
        })
        var arr = new Array()
        for (var val of flys) {
          var time = val.time * 1000;
          danmu2.translate(-1000).step({ delay: time });
          arr[val.id] = danmu2.export()
        }
        this.setData({
          danmu2: arr
        })
        this.timer = setInterval(this.canvasClock, 500);
        //播放音乐
        wx.playBackgroundAudio({
          dataUrl: app.globalData.bgmusic,
          title: '',
          coverImgUrl: ''
        })

        this.setData({
          play: "noplayBtn",
          playimg: "/images/view/zanting.png"
        })
        app.globalData.status = 1;
        this.guangdiea(1800);
      } else {
        clearInterval(this.timer);
        this.timer = null;
        wx.pauseBackgroundAudio();
        this.setData({
          play: "playBtn",
          playimg: "/images/view/play.png"
        })
        app.globalData.status = 0;
        this.guangdiea(0);
    }
    
  },
  //返回上级页面
  backout:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  //光碟动画
  guangdiea:function(deg){
    var xuanzhuan =wx.createAnimation({
      duration:300000,
      timingFunction: 'linear',
    })
    this.xuanzhuan = xuanzhuan;  
    xuanzhuan.rotate(deg).step();
    this.setData({
      guangdieData:xuanzhuan.export()
    })
  },
  //上一首
  prvmusic:function(){
    var musicStorage = wx.getStorageSync('musicStorage')
    var key =  app.globalData.m_key-1;
    if(key<0){
      key =app.globalData.listlenght-1;
    }
    wx.redirectTo({
      url: '/pages/view/view?id='+musicStorage[key][0]
    }) 
  },
  //下一首
  nextmusic:function(){
    var musicStorage = wx.getStorageSync('musicStorage');
    var key =  app.globalData.m_key+1;
    if(key>=app.globalData.listlenght){
      key =0;
    }
    wx.redirectTo({
        url: '/pages/view/view?id='+musicStorage[key][0]
    })
    
    
  },
  //快进
  forward: function () {
    wx.getBackgroundAudioPlayerState({
    success: function(res) {
       // var status = res.status
        //var dataUrl = res.dataUrl
      currentPosition = res.currentPosition;
      wx.seekBackgroundAudio({
        position: currentPosition+25
      })
       // var duration = res.duration
        //var downloadPercent = res.downloadPercent
      }
    })
  },
  //快退
  back: function () {
    wx.getBackgroundAudioPlayerState({
      success: function(res) {
        currentPosition = res.currentPosition;
        wx.seekBackgroundAudio({
          position: currentPosition-25
        })
      }
    })
  },
  audioPause: function () {

  },

  //进度条控制播放
  audioChange: function (e) {
    wx.seekBackgroundAudio({
      position: e.detail.value / 1000 * playTime
    })
  },  

    
  jindu: function (e) {
    this.setData({
        percentage: e.detail.currentTime / e.detail.duration * 1000,
        time:times,
    })
    if(lyrics!=null){
       this.setData({
          lyric:lyrics[times]
        })
    }
  },
  activeChange: function(e){
    this.setData({
       select:e.currentTarget.dataset.code
    })
  },
  //切换版面
  tabmodule:function(e){
    if(this.data.style=="complete"){
      this.setData({
        style:"simplicity",
        btnname:"完整模式"
      })
    }else{
       this.setData({
        style:"complete",
        btnname:"简洁模式"
      })
    }
  },
  //是否关注点赞
  isfollow:function(id){
    var that = this;  
    app.ajax({
      url: 'index/user/isfollow',
      data: {
        music_id: id,
        to_uid: that.data.user.user_id
      },
      method: 'GET',
      success: function(res) {
        if (res.data.status !== 200) {
          wx.showToast({
            title: res.data.info,
            image: '/images/sad.png',
            duration: 2000
          })
          return
        }
        var follow = res.data.info.follow;
        var zan = res.data.info.zan;
        var followUser = res.data.info.follow_user;
        if(follow !== 0){
          that.setData({
            fllowimg:"/images/view/heart-icon2.png"
          })
        }else{
          that.setData({
            fllowimg:"/images/view/heart-icon1.png"
          })
        } 
        if(zan !== 0){
          that.setData({
              goodimg:"/images/view/zanbi2.png"
          })
        }else{
          that.setData({
              goodimg:"/images/view/zanbi1.png"
          })
        } 
        if (followUser !== 0) {
          that.setData({
            isfollow: "已关注",
            isfollowStyle: 'followoff'
          })
        } else {
          that.setData({
            isfollow: "+关注",
            isfollowStyle: 'follow'
          })
        } 
      }
    })
  },
  //收藏
  collect : function (e) {
    var that = this;
    app.ajax({
    url: 'index/user/collect',
    data: {
      music_id: m_id
    },
    success: function(res) {
      if (res.data.status !== 200) {
        wx.showToast({
          title: res.data.info,
          image: '/images/sad.png',
          duration: 2000
        })
        return
      }
      var heartIcon = res.data.info.is_collect ? '/images/view/heart-icon2.png' : '/images/view/heart-icon1.png'
      var toastIcon = res.data.info.is_collect ? '/images/view/follow.png' : '/images/view/quxiao.png'
      that.setData({
        fllowimg: heartIcon
      })
      wx.showToast({
        title: res.data.info.message,
        image: toastIcon,
        duration: 2000
      })
    }
    })
  },
    //点赞
   good :function(e){
       var that = this;
       app.getUser(function(){
         var session_key = wx.getStorageSync('3dr_session');
         wx.request({
          url: app.globalData.postUrl+'index/user/zan',
          data: {
            uid: session_key,
            music_id:m_id
          },
            header:{
              "Content-Type":"application/json"
          },
          success: function(res) {
              var status = res.data.status; 
              if(status=="zaned"){
                that.setData({
                  goodimg:"/images/view/zanbi2.png"
                })
              }else{
                that.setData({
                  goodimg:"/images/view/zanbi1.png"
                })
              }  
          }
        })
       })
      
    },
    //关注用户
   fllowuser: function (e) {
     var that = this;
     app.getUser(function () {
       var session_key = wx.getStorageSync('3dr_session');
       wx.request({
         url: app.globalData.postUrl + 'index/user/followuser',
         data: {
           uid: that.data.user.user_id,
           by_uid: session_key
         },
         header: {
           "Content-Type": "application/json"
         },
         success: function (res) {
           var status = res.data.status;
           if (status == "followed") {
             that.setData({
               isfollow: "已关注",
               isfollowStyle:'followoff'
             })
             wx.showToast({
               title: '关注成功~',
               image: '/images/view/follow.png',
               duration: 2000
             })
           } else {
             that.setData({
               isfollow: "+关注",
               isfollowStyle: 'follow'
             })
             wx.showToast({
               title: '已取消关注',
               image: '/images/view/quxiao.png',
               duration: 2000
             })
           }
         }
       })
     })

   },
  //报错
  erroup :function(e){
      if(this.data.erroimg=="/images/view/erro1.png"){
        this.setData({
          erroimg:"/images/view/erro2.png"
        })
      }else{
        this.setData({
          erroimg:"/images/view/erro1.png"
        })
      }
    },
  //是否打开弹幕... 
  barrageSwitch: function(e){
    if(this.data.danmuimg=="http://wx4.sinaimg.cn/small/006wiWLZgy1fe7aa2p7szj3032032glf.jpg"){
      //清空弹幕
      barrage_style_arr = [];
      //设置data的值
      this.setData({
        barrageTextColor:"#D3D3D3",
        barrage_inputText:"none",
        barragefly_display:"none",
        barrage_style:barrage_style_arr,
        danmuimg:"http://wx2.sinaimg.cn/small/006wiWLZgy1fe7aa2d6ygj3032032743.jpg"
      });
      //清除定时器
      //clearInterval(timer);
      }
      else{
        this.setData({
        barrageTextColor:"#04BE02",
        barrage_inputText:"flex",
        barragefly_display:"block",
        danmuimg:"http://wx4.sinaimg.cn/small/006wiWLZgy1fe7aa2p7szj3032032glf.jpg"
      });
      //this.barrageText_move();
      //打开定时器
        //timer= setInterval(this.barrageText_move,800)
      }

  },
  //弹幕发送
  shoot1:function(e){
      var that = this;
      that.setData({ 
        leftwidth:50,
      })
 
    //字体颜色随机
    var textColor = "rgb("+parseInt(Math.random()*256)+","+parseInt(Math.random()*256)+","+parseInt(Math.random()*256)+")";
    // //设置弹幕字体的水平位置样式
    // var textWidth = -(this.data.bind_shootValue.length*0);
    //设置弹幕字体的垂直位置样式
    var barrageText_height = (Math.random())*266;
     var nbso = {
      // textWidth:textWidth,
      barrage_height:barrageText_height,
      barrage_val:that.data.bind_shootValue,
      barrage_color : textColor,
      barrage_Width:phoneWidth+100
    };
    var pwidth = phoneWidth+100;
    that.setData({ 
      nbso:nbso,
      leftwidth:pwidth ,
      bind_shootValue:"" //清空输入框
    })
    var danmu =wx.createAnimation({
      duration:1000,
      timingFunction: 'linear',
    })
    danmu.translate(-300).step();
     that.setData({
        danmu:danmu.export()
      })
  },
  //发射按钮
  shoot: function(e){
    var that = this;
    var content = that.data.bind_shootValue;
    wx.getBackgroundAudioPlayerState({
      success: function(res) {
        var currentPosition = res.currentPosition
        if(content==''){
          wx.showToast({
            title: '空包弹可打不响~',
            image: '/images/sad.png',
            duration: 2000
          })
          return false;
        }
        var session_key = wx.getStorageSync('3dr_session')?wx.getStorageSync('3dr_session'):0;
        wx.request({
          url: app.globalData.postUrl+'index/fly/create',
          data: {
            uid: session_key,
            id:m_id,
            content:content,
            time:currentPosition,
          },
            header:{
              "Content-Type":"application/json"
          },
          success: function(res) {
            var status = res.data.status; 
            //弹幕保存成功后
            if(status==1){
              that.setData({ 
                leftwidth:50,
              })
              //字体颜色随机
              var textColor = "rgb("+parseInt(Math.random()*256)+","+parseInt(Math.random()*256)+","+parseInt(Math.random()*256)+")";
              // //设置弹幕字体的水平位置样式
              // var textWidth = -(this.data.bind_shootValue.length*0);
              //设置弹幕字体的垂直位置样式
              var barrageText_height = (Math.random())*266;
              barrage_style_obj = {
                // textWidth:textWidth,
                barrageText_height:barrageText_height,
                barrage_shootText:that.data.bind_shootValue,
                barrage_shoottextColor : textColor,
                barrage_phoneWidth:phoneWidth+100
              };
              //添加元素
              barrage_style_arr.push(barrage_style_obj);
              var pwidth = phoneWidth+100;
              that.setData({ 
                barrage_style:barrage_style_arr,        //发送弹幕
                bind_shootValue:"" ,                   //清空输入框
                leftwidth:pwidth  
              })
              var danmu =wx.createAnimation({
                duration:10000,
                timingFunction: 'linear',
              })
              danmu.translate(-1000).step();
              that.setData({
                  danmu:danmu.export()
                })
              /**弹幕定时器  */
              that.timers= setTimeout(
                function(){ 
                  barrage_style_arr.splice(0,1);
                that.setData({
                  danmu:0
                })
                },
                1000
              );
            }
            //弹幕保存失败时
            else{
              wx.showToast({
                title:  res.data.message,
                image: '/images/sad.png',
                duration: 2000
              })
            }  
          }
        })
      }
    })

  
  },
 
//定时器  让弹幕动起来
  barrageText_move: function(){
    var timerNum = barrage_style_arr.length;
    var textMove ;
    var danmu =wx.createAnimation({
      duration:10000,
      timingFunction: 'linear',
    })
    this.danmu = danmu;
    danmu.translate(-1000).step();
     this.setData({
        danmu:danmu.export()
      })


  },

  //绑定发射输入框，将值传递给data里的bind_shootValue，发射的时候调用
  bind_shoot:function(e){
    this.setData({
      bind_shootValue:e.detail.value
    })
  },
  //获取评论
  commentlist:function(id){
    var that = this;
    app.ajax({
      url: 'index/comment/commentlist',
      data: {
        id: id,
      },
      method: 'GET',
      success: function(res) {
        var data = res.data;
         for(var i=0;i<data.length;i++){
            data[i].created = app.date( data[i].created,"yyyy-MM-dd HH:mm")
         }
          that.setData({
              commentNum:data.length,
              comments:data
          })
      }
    })
  },
  //评论
  comment:function(e){
    var that = this;
    var formData = e.detail.value; 
    var content = formData.content === undefined ? formData : formData.content;
    if(!content){
      wx.showToast({
        title: '评论不能为空哟~',
        image: '/images/sad.png',
        duration: 2000
      })
      return false;
    }
    app.ajax(
      {
        url: 'index/comment/comment',
        data: {
          id: m_id,
          content: content
        },
        success: function (res) {
          var res = res.data;
          console.log(res);
          if (res.status === 200) {
            wx.showToast({
              title: '评论成功',
              icon: 'success',
              duration: 2000
            })
            that.setData({
              reset: '',
            })
            that.commentlist(m_id);
          } else {
            // 登陆过期时，重新登陆
            if (res.code === 10001) {
              app.getUser(that.comment)
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
            image: '/images/quxiao.png',
            duration: 2000
          })
        }
      },
      true
    )
  }
})  