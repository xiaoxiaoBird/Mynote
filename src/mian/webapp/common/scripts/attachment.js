/**
 * Created by hotleave on 15-3-11.
 */

define('attachment', ['hwquery', 'core', 'upload'], function ($, core, Upload) {
    var ui = core.ui,
        DOWNLOADFRAME_NAME = "att_download",
        Widget = ui.Widget;

    function Attachment(element, options) {
        var that = this;

        Widget.fn.init.call(that, element, options);

        options = that.options;

        that._initUpload(options.rootPath);

        if (options.downloadUrl) {
            that._initDownloadFrame();
        }
    }

    Attachment = Widget.extend({
        init: Attachment,
        options: {
            name: "Attachment",
            rootPath: window['rootPath'],
            businessId: null,
            type: null,
            downloadUrl: '/action/S_attachment_Attachment_download.action?id='
        },

        _initUpload: function (rootPath) {
            var that = this,
                element = that.element,
                options = that.options,
                businessId = options.businessId,
                type = options.type,
                downloadUrl = options.downloadUrl,
                uploadOptions = {
                    async: {
                        multiple: true,
                        // 保存地址
                        saveUrl: rootPath + "/Upload" + (type ? '?type=' + type : ''),
                        // 删除地址
                        removeUrl: rootPath + "/action/S_attachment_Attachment_delete.action",
                        removeField: 'deletedId'
                    }
                };
            $.extend(true, uploadOptions, options);

        	//定义一个数组用来装id
            var add_ids = [];
            //定义一个数组用来装id
            var remove_ids = [];
            
            delete uploadOptions.name;
            uploadOptions.success = function (e) {
                var model = options.model;
            	//每次操作成功王add_ids里面放一次数据，为了在防止读取的时候上一次的数据被清空
            	if($(options.hiddenInputEl).val()){
            		add_ids = $(options.hiddenInputEl).val().split(",");	
            	}
            	
                var file = e.files[0];
                file.id = e.response.id;

                if(e.operation == "upload"){
                	add_ids.push(file.id);
                	$(options.hiddenInputEl).val(add_ids).change();
                	//设置弹出窗的附件ID
                    model && model.set('attachmentId', add_ids.join(','));
                }
                if(e.operation == "remove"){
                	remove_ids.push(e.response.id);
                	add_ids.splice($.inArray(e.response.id,add_ids),1);
                	$(options.removeId).val(remove_ids);
                	$(options.hiddenInputEl).val(add_ids);
                	//设置弹出窗的附件ID
                    model && model.set('attachmentId', add_ids.join(','));
                    model && model.set('removeId', remove_ids.join(','));
                }

                options.success && options.success(e);
            };
            uploadOptions.addFileEntry = function (e) {
                if (!options.downloadUrl) {
                    return;
                }
                var fileEntry = e.fileEntry, file = e.file;
                if (file.id) {
                    fileEntry.find(".k-filename").append('&nbsp;(' + file.size + ')').wrap("<a target='" + DOWNLOADFRAME_NAME + "' href='" + rootPath + downloadUrl + file.id + "' title='点击下载'/>");
                }

                options.addFileEntry && options.addFileEntry(e);
            };

            if (businessId && !options.files) {
                $.getJSON(rootPath + '/action/S_attachment_Attachment_listAttachment.action', {businessId: businessId, attachmentType: type}, function(data) {
                    uploadOptions.files = data;
                    that.upload = element.hwuiUpload(uploadOptions).data('hwuiUpload');
                });
            } else {
                that.upload = element.hwuiUpload(uploadOptions).data('hwuiUpload');
            }
        },

        _initDownloadFrame: function () {
            if ($('ifame[name=' + DOWNLOADFRAME_NAME + ']').length === 0) {
                $('<iframe></iframe>').attr('name', DOWNLOADFRAME_NAME).hide().appendTo($('body'));
            }
        },
        reloadFiles:function(businessId){
            var that = this;
            $.getJSON(rootPath + '/action/S_attachment_Attachment_listAttachment.action', {businessId: businessId, attachmentType: ""}, function(data) {
                //uploadOptions.files = data;
                that.upload._removeFileEntry($(".k-file"));
                that.upload._renderInitialFiles(data);
            });
        }
    });

    ui.plugin(Attachment);
});