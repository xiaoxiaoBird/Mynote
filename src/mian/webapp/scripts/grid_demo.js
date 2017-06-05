//表格模式
define('laws-config', function() {
    /**
     * 数据源字段  需要将字段的名称和后台传输的字段名一直
     */
    var fields = {
        id:{type:"string",validation: {stringMaxLength:36,phone:true,readOnly:true},editable:false},
        taskId: { type: "string" ,validation: {stringMaxLength:32}},
        reportOrgan: { type: "string" },
        repotrTime: { type: "date", format: "yyyy-MM-dd HH:mm:ss" },    //配合columns的template可以直接表格单位显示当前时间
        checkStatus:{type:"string",defaultValue:"回填值"},
        reportContext: { type: "string" ,validation: {stringMaxLength:1000}},
        attamchment:{type:"String",validation: {stringMaxLength:36}},
        test:{type:"number",validation: {required: true}},
        manTel:{validation: { length: 20,required: true,pattern:'((\\d{11})|^((\\d{7,8})|(\\d{4}|\\d{3})-(\\d{7,8})|(\\d{4}|\\d{3})-(\\d{7,8})-(\\d{4}|\\d{3}|\\d{2}|\\d{1})|(\\d{7,8})-(\\d{4}|\\d{3}|\\d{2}|\\d{1}))$)'}},
        unitname:   { type: "string", 	editable: true, validation: {required: true, string: true, stringMaxLength: 100, validationMessage: '名称不能为空' }},  //名称

    };

     /*
      *表格的增删改查链接
      * 1、可根据条件的不同，改变不同的增删改的一些链接，和传值不同
      */
    var readpath ="";
    if(status ==='1'){readpath ="/gov/S_reporework_Reporework_list.action?taskId="+task_id+"&CheckStatus=1" }else
    {readpath ="/gov/S_reporework_Reporework_list.action?taskId="+task_id}
    var dataSource = {
        serverSorting: true,
        serverPaging: true,
        pageSize: 10,
        transport: {
            read:rootPath+readpath,
            create:rootPath+"/gov/S_reporework_Reporework_save.action",
            update:rootPath+"/gov/S_reporework_Reporework_save.action",
            destroy: rootPath + "/gov/S_reporework_Reporework_delete.action"
        },
        schema: {
            data: 'rows',
            total: 'total',
            model: { id: 'id', fields: fields }
        }
    };

    //表格的一些属性            config.gridOptions.editable.template = hwui.template($("#localeDialog").text())  则打开的表格就是自定义了
    var caozuo =[];
    if(status ==='1'){ caozuo =[]}else{ caozuo =['create', 'edit', 'destroy']};
    var grid = {
        dataSource: dataSource, //数据源
        editable: {//可编辑
            mode: 'popup',     //inline,popup
            window:{
                maxHeight:'540px'
            }
        },
        // pageSize: 50
        pageable: {
            refresh: true, //显示刷新按钮
            pageSizes: true //显示可切换每页条数按钮 [20,50,100]
        },
        selectable: 'multiple',   //是否可以选择
        title: '汇报',
        toolbar:caozuo,        //表格的增改删的三个按钮
        edit:function(curModel){   //    行的model
            viewModel = curModel.model;
        }
    };

    return {                //作为模块的返回值
        dataSourceOptions: dataSource,
        gridOptions: grid
    };
});

hwui().require( 'dict', 'effect', 'grid','dialog',"binder","datepicker",'dropdownlist', "datetimepicker", 'message',"attachment",function ($, hwui, dict) {


    /*
     *有field、align、hidden、editor、tempalte属性
     * editor为添加和修改时的编辑模板，function（container,options），container为容器
     * template为表格显示模板，function(data)，data为一行的数据，具体到data.字段
     */
    var columns = [
        {field:"taskId",align:"center",title:"关联任务" ,hidden:true},
        {field:"reportOrgan",align:"center",title:"汇报机构",hidden:true},
        {field:"repotrTime",align:"center",title:"汇报时间",template:function(data){
            return hwui.toString(data.repotrTime,"yyyy-MM-dd");
        }},
        {field:"reportContext",align:"center",title:"汇报内容",editor:function(container, options){
            createTextArea(container, options,"height:150px !important;width:100% !important;",1000);
        }},
        {field:"attamchment",align:"center",title:"相关资料",
            editor:createUpload,
            template: function(data) {//查看时附件显示样式
                return viewAttrHandle(data.id);
            }},

        {field:"checkStatus" ,align:"center",title:"汇报状态",template:function(data){
            var status2 = data.checkStatus, arr = [];
            if(status === "2"){
                if(status2 ==="1") {                arr.push("未上报");            }
                if(status2 ==="2") {                arr.push("未审核");            }
                if(status2 ==="3") {                arr.push("审核未通过");           }
                if(status2 ==="4") {                arr.push("审核通过");            }
            }
            if(status ==="1"){
                if(status2 ==="2") {                arr.push("未审核");            }
                if(status2 ==="3" ) {                arr.push("审核未通过");           }
                if(status2
                    ==="4") {                arr.push("审核通过");            }
            }

            return arr.join("");
        }

        },{
            title: "操作",
            align: "center",
            template: function(data){
                var arr =[];
                arr.push("<a href='#' class='k-button k-view'  >查看</a>");
                return arr.join("");
            }
        },
        {    title: '操作', align:"center",command: [
              {
                    text: "查看",
                    click: function (e, rowData) {
                        $(e.currentTarget).parents("tr").dblclick();
                    }
                }
        ]}


    ];

    /**
     * 格式化行命令按钮
     */
    function commandColumnTemplate(rowData) {
        var status = rowData.get('isReview'), arr = [];
        arr.push("<a class='k-button k-button-icontext k-grid-complete k-viewRowBtn' data-id="+rowData.get("id")+" href='#'><span></span>查看</a>");
        return arr.join("");
    }

    //创建文件上传
    function createUpload(container, options){
        var businessId = options.model.id;
        //创建附件上传控件
        $('<input name="' + options.field + '" id="' + options.field + '" type="hidden" />').appendTo(container);
        var removeIds = $('<input name="removeId"  data-bind="value:removeId" type="hidden" value="">').appendTo(container);
        $('<input name="files" id="'+options.field+'_att" type="file" />')
            .appendTo(container).hwuiAttachment({
                hiddenInputEl: '#'+options.field,
                businessId:businessId,//附件加载
                maxFileCount:"5",
                removeId: removeIds,
                model: options.model,
                supportsRemove: true//附件删除
            });
    }

    /**
     * 附件查看
     * @param businessId
     * @returns {string}
     */
    function viewAttrHandle(businessId) {
        var loadAttrUrl = rootPath + '/action/S_attachment_Attachment_listAttachment.action';
        var htmlStr = '无附件';
        $.ajax({
            type : "POST",
            url : loadAttrUrl,
            data:{"businessId" : businessId},
            cache : false,
            async: false,
            dataType : "json",
            success :  function(files){
                if (files.length > 0) {
                    htmlStr = '<ul class="k-upload-files k-reset" style="border:1px solid #c5c5c5;" >';
                    $.each(files,function(i,file){
                        var downloadUrl = rootPath+"/action/S_attachment_Attachment_download.action?id="+file.id;
                        htmlStr += '<li class="k-file k-file-success">';
                        htmlStr += '<span class="k-progress" style="width: 100%;"></span>';
                        htmlStr += '<span class="k-icon k-i-mage/jpeg"></span>';
                        htmlStr += '<a href=' + downloadUrl + ' title="下载  ' + file.name + '" class="k-filename" style="max-width:400px;"> 下载  ' + file.name + '</a>';
                        htmlStr += '</li>';
                    });
                    htmlStr += "</ul>";
                }
            }
        });
        return htmlStr;
    }

    function createDateTimePicker(container, options){
        // 创建一个时间控件
        $('<input required data-bind="value:' + options.field + '"/>')
            .appendTo(container).hwuiDateTimePicker();
    }



    config.gridOptions.editable.window = {
        buttons:[
            {
                name: "获取经纬度",
                attr: "title='获取经纬度'",
                text: "获取经纬度",
                handler: function(d) {
                 showGisDialog(function(obj){
                        grid.currentModel.set("longitude",obj.x);
                        grid.currentModel.set("latitude",obj.y);
                    });
                }
            },

            {
                name: "保存",        attr: "title='保存'",               text: "保存",
                handler: function(d) {
                    grid.saveRow();
                }
            },

            {
                name: "cancel",           attr: "title='取消'",              text: "取消",
                handler: function() {
                    this.close();
                    grid.cancelRow();
                }
            }
        ]
    };

    config.gridOptions.columns = columns;
    config.gridOptions.editable.template = hwui.template($("#localeDialog").text());
    var grid = $('#grid').hwuiGrid(config.gridOptions).data('hwuiGrid');



    //编辑areatext类型宽高
    function createTextArea(container, options,style){
        var textarea = '<textarea class="k-textarea k-textbox" data-bind="value:'+options.field+'" name="'+options.field+'" stringmaxlength="1000" style="'+style+'"/>';
        container.append(textarea);
    };

    function createInput(container, options,style,stringmaxlength,validate){
        if(validate){
            var input = '<input class="k-input k-textbox" stringmaxlength="'+stringmaxlength+'" '+validate+' data-bind="value:'+options.field+'" name="'+options.field+'" style="'+style+'"/>';
        }else{
            var input = '<input class="k-input k-textbox" stringmaxlength="'+stringmaxlength+'"  data-bind="value:'+options.field+'" name="'+options.field+'" style="'+style+'"/>';
        }

        container.append(input);
    }

    grid.element.on('click','.k-viewRowBtn',function(e){
        viewAttrHandle();
    });
    grid.element.on('click','.k-jixureport',function(e){  //继续汇报 触发下修改事件
        grid.editRow($(e.currentTarget).closest('tr'));
        var id  = $(e.currentTarget).attr("data-uid");
        CheckStatuschange(id,"1");
        $(e.currentTarget).hide();
    });


    grid.element.on('click','.k-handle',function(e){  //审核
        hwui.Msg.confirm("确认要审核吗?<br> 是：通过 ！否：未通过", "提示", true, function(msg) {
            if (msg == 'yes') {
                var id  = $(e.currentTarget).attr("data-uid");
                CheckStatuschange(id,"4");
            } else {
                var id  = $(e.currentTarget).attr("data-uid");
                CheckStatuschange(id,"3");
            }
        });
        $(e.currentTarget).hide();
        grid.dataSource.query();
    });
    grid.element.on('click','.k-report',function(e){  //上报 获取id
        var id  = $(e.currentTarget).attr("data-uid");
        CheckStatuschange(id,"2");
        $(e.currentTarget).hide();
    });

    function CheckStatuschange(id,status){
        $.ajax({
            type: "POST",
            url: rootPath + "/gov/S_reporework_Reporework_CheckStatuschange.action",
            cache: false,
            async: false,
            dataType: "json",
            data:{id:id,status:status},
            success: function (results) {
                $(".k-pager-refresh").click();
            }
        })
    }



    grid.element.on('click','.k-view',function(e){
        $(e.currentTarget).parents("tr").dblclick();
    });
    grid.on('editDialog:open', function(e) {
        this.editDialog.element.find("[for='undefined']").parents('tr').css("display","none");
    });

    //查看汇报时将未上报的去掉
    grid.on('dataBinding', function(e) {    });
    grid.on("save",function(e){
        if(e.model){//新增与修改的区别
            e.model.taskId=task_id;
         }
    });
    grid.after("save",function(e){
        shuaixin();
    })
    function shuaixin(){
        $(".k-pager-refresh").click();
    }

});
