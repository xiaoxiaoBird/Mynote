/**
 * Created by admin on 2016/3/15.
 */

 var column =  {field:"attamchment",align:"center",title:"相关资料",
    editor:createUpload,
    template: function(data) {//查看时附件显示样式
    return viewAttrHandle(data.id);
}}
/*
 editor：表示为显示的表示形式

 options表示为此字段对象:
   {align: "center",editor: createUpload(container, options),encoded: true
 field（为单元格字段信息）: "attamchment",model(为行字段的数据): subclass,template: (data),title: "相关资料"}

 container:表示为td的字段div块，（HTML）.appendTo(container)方式添加自己写的表现形式

 */



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
/*
 businessId将存在的附件下载的id
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


//创建文件上传
function createUpload(container, options,type) {
    var businessId = options.model.id;
    //创建附件上传控件
    $('<input name="' + options.field + '" id="' + options.field + '" type="hidden" />').appendTo(container);
    var removeIds = $('<input name="removeId"  data-bind="value:removeId" type="hidden" value="">').appendTo(container);
    $('<input name="files" id="' + options.field + '_att" type="file" />')
        .appendTo(container).hwuiAttachment({
            hiddenInputEl: '#' + options.field,
            businessId: businessId,//附件加载
            maxFileCount: "5",
            type:type,
            removeId: removeIds,
            model: options.model,
            supportsRemove: true,//附件删除
            success:function(data){
                var attaID = data.response.id ;
                if(type =="evi"){
                    var idSTR = viewModel.get("eviAttachmentid")+","+attaID;
                    viewModel.set("eviAttachmentid" , idSTR);
                }
                if(type =="exp"){
                    var idSTR = viewModel.get("expAttachmentid")+","+attaID;
                    viewModel.set("expAttachmentid", idSTR);
                }
            }
        });
}
