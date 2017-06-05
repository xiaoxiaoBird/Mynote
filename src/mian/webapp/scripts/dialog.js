
//选择当前机构的班级
var classDialog ;
function selectClass(container, options){
    $('<input required="required" data-bind="value: ' + options.field + '" class="k-textbox" id="' + options.field + '" style="width:50% " >').appendTo(container);
    html = '<a class="k-button k-button-icontext " href="#"><span class=" "></span>选择班级</a>';
    $(html).appendTo(container).bind("click", function (e) {
        if (!classDialog) {
            classDialog = $("#classDialog").hwuiDialog({
                title: "选择参与考试的班级",
                topable: true,
                modal: true,
                resizable: false,
                visible: false,
                open:function(){
                    this.refresh();
                },
                content: rootPath +"/cul/cultivate/cultivateClass_select.jsp",
                width: 1200,
                height: 375,
                buttons: [
                    {
                        text: "确定",
                        name: "save",
                        handler: function () {
                            var data = this.doReport();
                            if(data){
                                this.model.set("exClassID",data.classID);
                                this.model.set("exClassName" ,data.className);
                                this.close();
                            }
                        }
                    },
                    {
                        text: "取消",
                        name: "cancel",
                        handler: function () {
                            this.close();
                        }
                    }]
            }).data('hwuiDialog');
        }
        //将行的数据与视图绑定对象传给对话框。对话框的回调函数操作自己的model，即操作行的对象
        classDialog.model = options.model;
        classDialog.open();
    });

}