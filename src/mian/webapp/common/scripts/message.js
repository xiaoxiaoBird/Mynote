define('demo-config',['hwquery', 'core', 'binder','message'], function($, hwui) {
    /**
     * 数据源字段
     */
    var fields = {
        id: {validation: {length: 64}},
        title:{validation: {length: 64}},
        content:{validation: {length: 64}},
        senderName:{validation: {length: 64}},
        sendDate:{validation: {length: 64}},
        receiverId:{validation: {length: 64}},
        receiverName:{validation: {length: 64}}
    };

    var dataSource = {
        serverSorting: true,
        serverPaging: true,
        pageSize: 10,
        transport: {
            read:rootPath+"/action/S_common_Message_list.action"
        },
        schema: {
            data: 'rows',
            total: 'total',
            model: { id: 'id', fields: fields }
        }
    };

    var columns = [
       {field: 'title', title: '标题', width: 128},
       {field: 'content', title: '内容'},
       {field: 'senderName', title: '发送人'},
       {field: 'sendDate', title: '发送日期'},
       {field: 'type', title: '类型',template:function(row){
           if (row.type == "2") {
               return "系统消息";
           }else{
               return "普通消息";
           }

       }},
       {field: 'id', title: '操作',command:[{ text: "已读", click: function(e, rowData){
           var id = rowData.id;
           if (rowData.status != '1') {
               hwui.Msg.alert("消息已读");
               return false;
           }
           hwui.Msg.confirm("确定已读吗？", "提示", function (btn) {
               if (btn === 'yes') {
                   $.post(rootPath+"/action/S_common_Message_readMsg.action", {"id": id,"status":"2"}, function (data) {
                       hwui.Msg.info("操作成功");
                       grid.dataSource.query();
                   });
               }
           });
       }}]}
    ];

    var grid = {
        dataSource: dataSource, //数据源
        editable: {//可编辑
            mode: 'popup'
        },
        pageable: {
            refresh: true, //显示刷新按钮
            pageSizes: true //显示可切换每页条数按钮
        },
        selectable: 'multiple',
        title: '示例',
        toolbar: ['create'],
        columns: columns
    };

    return {
        dataSourceOptions: dataSource,
        columns: columns,
        gridOptions: grid
    };
});

define('demo-search', ['hwquery', 'core', 'binder'], function($, hwui) {
    var $searchArea = $('#demoSearchArea'),
        searchModel = hwui.observable({
            page: 1
        });

    hwui.bind($searchArea, searchModel);

    $searchArea.find(".k-button-reset").click(function() {
        searchModel.forEach(function(value, key) {
            searchModel.set(key, null);
        });
    });

    function registerSearchEvent(onSearch) {
        var searchBtn = $searchArea.find(".k-button-search");
        searchBtn.click(onSearch);
        $searchArea.off('keypress').on('keypress', function(e) {
            if (e.keyCode == 13) {
                $(e.target).trigger('change');
                searchBtn.trigger('click');
            }
        });
    }

    return {
        searchArea: $searchArea,
        searchModel: searchModel,
        onSearch: registerSearchEvent
    };
});

hwui().require('demo-config', 'demo-search', 'effect', 'grid', function($, hwui, config, search) {
    var grid = $('#demoGrid').hwuiGrid(config.gridOptions).on("click",'.readMsg',function(){

    }).data('hwuiGrid');
    grid.bind('dblclick', function(e) {
        e.rowData.set('editable', false);
    });

    search.onSearch(function() {
        grid.dataSource.query(search.searchModel.toJSON());
    });


});