var barrage_style_arr = [];
var barrage_style_obj ={};
var phoneWidth = 0;
var timers = [];
var timer ;
Page({
  data: {
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
  },

    // 生命周期函数--监听页面加载
  onLoad:function(options){
    var that = this;

    //获取屏幕的宽度
      wx.getSystemInfo({
        success: function(res) {
           that.setData({
                barrage_phoneWidth:res.windowWidth-100,
           })
        }
      })
      phoneWidth = that.data.barrage_phoneWidth;
      console.log(phoneWidth);
  },

  //是否打开弹幕... 
  barrageSwitch: function(e){
    console.log(e);
    //先判断没有打开
    if(!e.detail.value){
    //清空弹幕
      barrage_style_arr = [];
      //设置data的值
      this.setData({
        barrageTextColor:"#D3D3D3",
        barrage_inputText:"none",
        barragefly_display:"none",
        barrage_style:barrage_style_arr,
      });
      //清除定时器
      clearInterval(timer);
    }else{
      this.setData({
        barrageTextColor:"#04BE02",
        barrage_inputText:"flex",
        barragefly_display:"block",
      });
      //打开定时器
        timer= setInterval(this.barrageText_move,800)
    }
  },

  //发射按钮
  shoot: function(e){

    //字体颜色随机
    var textColor = "rgb("+parseInt(Math.random()*256)+","+parseInt(Math.random()*256)+","+parseInt(Math.random()*256)+")";
    // //设置弹幕字体的水平位置样式
    // var textWidth = -(this.data.bind_shootValue.length*0);
    //设置弹幕字体的垂直位置样式
    var barrageText_height = (Math.random())*266;
     barrage_style_obj = {
      // textWidth:textWidth,
      barrageText_height:barrageText_height,
      barrage_shootText:this.data.bind_shootValue,
      barrage_shoottextColor : textColor,
      barrage_phoneWidth:phoneWidth+100
    };
    //添加元素
    barrage_style_arr.push(barrage_style_obj);
    this.setData({ 
      barrage_style:barrage_style_arr,        //发送弹幕
      bind_shootValue:""                    //清空输入框
    })
    

  //this.timer= setInterval(function(){ console.log("yichu")},1000);
    this.timer= setTimeout(
      function(){ 
        console.log("yichu");
        barrage_style_arr.splice(0,1);
      },
      1000
    );

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

})