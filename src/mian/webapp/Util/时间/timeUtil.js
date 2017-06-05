/**
 * 把指定格式的字符串转换为日期对象yyyy-MM-dd HH:mm:ss
 *
 */
Date.prototype.strFormatToDate = function(formatStr, dateStr){
            var year = 0;
            var start = -1;
            var len = dateStr.length;
            if((start = formatStr.indexOf('yyyy')) > -1 && start < len){
                year = dateStr.substr(start, 4);
            }
            var month = 0;
            if((start = formatStr.indexOf('MM')) > -1  && start < len){
                month = parseInt(dateStr.substr(start, 2)) - 1;
            }
            var day = 0;
            if((start = formatStr.indexOf('dd')) > -1 && start < len){
                day = parseInt(dateStr.substr(start, 2));
            }
            var hour = 0;
            if( ((start = formatStr.indexOf('HH')) > -1 || (start = formatStr.indexOf('hh')) > 1) && start < len){
                hour = parseInt(dateStr.substr(start, 2));
            }
            var minute = 0;
            if((start = formatStr.indexOf('mm')) > -1  && start < len){
                minute = dateStr.substr(start, 2);
            }
            var second = 0;
            if((start = formatStr.indexOf('ss')) > -1  && start < len){
                second = dateStr.substr(start, 2);
            }
            return new Date(year, month, day, hour, minute, second);
        }
var Time1 =  new Date().strFormatToDate("yyyy-MM-dd",new Date());

//获取时间字符串
Date.prototype.format = function(fmt)
{ //author: meizz
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}
//使用示例：
var Time1 =  new Date().format("yyyy-MM-dd");