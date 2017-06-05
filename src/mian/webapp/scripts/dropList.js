/**
 * Created by admin on 2016/4/15.
 */
//级联
var params = "code=checkContext&code=checkResult&code=checkResult2";
var ddict = dict.getDctionnary(params);

function dropList1(container, options) {               //一级
    //创建一个下拉框
    $('<input required data-bind="value:' + options.field + '"/>')
        .appendTo(container).hwuiDropDownList({
            dataTextField: "name",
            dataValueField: "code",
            dataSource: ddict["checkContext"],
            index: 0,
            valuePrimitive:true,  //表示向后台传输的是对象还是值
            topable: true,
            autoBind: true,
            change: change
        });
}

var val;
var name = "checkResult";
function change(e){
    second.val("");
    val = e.sender.value();
    if(val == "1"){
        name =  "checkResult"
    }
    if(val == "2"){
        name =  "checkResult2"
    }
    second.getHwuiDropDownList().setDataSource(ddict[name]);
}

var second ;
function dropList2(container, options) {         //两级
    //创建一个下拉框
    second =  $('<input required data-bind="value:' + options.field + '"/>')
        .appendTo(container).hwuiDropDownList({
            dataTextField: "name",
            dataValueField: "code",
            dataSource:ddict[name] ,
            index: 0,
            valuePrimitive:true,
            topable: true,
            autoBind: true
        });
}