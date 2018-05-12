/*
 *定义各类常用函数
 *created by fish
 *2018-02-03
*/

/*
*格式化 Json 对象
*
*解决小程序发送 POST 请求后台服务器无法接参的 BUG
*@params object json Json 对象
*@return array  格式化后的字典
*/
function jsonFormat(json) {
	var str = []
	for(var p in json){
		str.push(encodeURIComponent(p) + '=' + encodeURIComponent(json[p]))
	}
	return str.join('&')
}

/*
*格式化时间戳
*
*@params string date 时间格式
*@params string fmt 时间戳
*@return string  格式化后的时间
*/
function date(date, fmt)
{
    date = date === undefined ? new Date() : date * 1000;
    var now = new Date();
    if((now - date) <= 80000){
      return '刚刚'
    }
    if((now-date) < 3600000){
      return Math.ceil((now-date)/60000)+'分钟前'
    }
    date = typeof date == 'number' ? new Date(date) : date;
    fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
    var obj =
    {
        'y': date.getFullYear(), // 年份，注意必须用 getFullYear
        'M': date.getMonth() + 1, // 月份，注意是从0-11
        'd': date.getDate(), // 日期
        'q': Math.floor((date.getMonth() + 3) / 3), // 季度
        'w': date.getDay(), // 星期，注意是0-6
        'H': date.getHours(), // 24小时制
        'h': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 12小时制
        'm': date.getMinutes(), // 分钟
        's': date.getSeconds(), // 秒
        'S': date.getMilliseconds() // 毫秒
    };
    var week = ['天', '一', '二', '三', '四', '五', '六'];
    for(var i in obj)
    {
        fmt = fmt.replace(new RegExp(i+'+', 'g'), function(m)
        {
            var val = obj[i] + '';
            if(i == 'w') return (m.length > 2 ? '星期' : '周') + week[val];
            for(var j = 0, len = val.length; j < m.length - len; j++) val = '0' + val;
            return m.length == 1 ? val : val.substring(val.length - m.length);
        });
    }
    return fmt;
}
module.exports = {
	jsonFormat: jsonFormat,
	date: date
}
