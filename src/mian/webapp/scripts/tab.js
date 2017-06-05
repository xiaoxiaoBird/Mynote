/**
 * Created by admin on 2016/3/16.
 */


//在表格field时加上标记，为这个标记加上时间
 var colnmn =  {field: 'districtName', title: '区县名称',align:"center",template:function(data){
    var arr=[];
    arr.push("<a href='#'  class='mYclass'  districtid='"+data.districtId+"'  >"+data.districtName+"</a>");
    return arr.join("");
} };



// $("li[aria-controls=tab-2]",window.parent.document).click(); 为点击第几个tab
//attr（）为点击的iframe添加指定内容，
// window.parent.document表示在上层窗口寻找该元素
// $("div  [id=qycj]"） div 块下的id为qycj 的元素
     grid.element.on('click', '.mYclass', function (e) {
    var districtid = $(this).attr("districtid");
    $("li[aria-controls=tab-2]",window.parent.document).click();
    $("div  [id=qycj]",window.parent.document).attr("src","/tjsecurity/gov/cartogram/enterprise_monitor_amount.jsp?districtid="+districtid+"&turn=1");
});