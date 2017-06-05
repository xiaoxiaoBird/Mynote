define('task-config',['hwquery', 'core', 'binder','message'], function($, hwui) {
    /**
     * 数据源字段
     */
    var fields = {
        id: {validation: {length: 64}},
        processName:{validation: {length: 64}},
        processTitle:{validation: {length: 64}},
        taskName:{validation: {length: 64}},
        processState:{validation: {length: 64}},
        taskUserName:{validation: {length: 64}},
        executeDescript:{validation: {length: 64}},
        executeTime:{validation: {length: 64}}
    };

    var dataSource = {
        serverSorting: true,
        serverPaging: true,
        sort : {
            field: 'executeTime',
            dir : 'DESC'
        },
        pageSize: 10,
        transport: {
            read:rootPath+"/action/S_common_Workflow_list.action"
        },
        schema: {
            data: 'rows',
            total: 'total',
            model: { id: 'id', fields: fields }
        }
    };

    var columns = [
       {field: 'processName', title: '流程名', width: 128},
       {field: 'processTitle', title: '流程标题'},
       {field: 'taskName', title: '任务名'},
       {field: 'processState', title: '流程状态',template:function(row){
           if (row.processState == "11") {
               return "运行";
           }else  if (row.processState == "12") {
               return "完成";
           }else   if (row.processState == "12") {
               return "取消";
           } else {
               return "无";
           }

       }},
        {field: 'taskUserName', title: '执行人'},
        {field: 'executeDescript', title: '操作描述'},
       {field: 'executeTime', title: '操作时间'}
    ];

    var grid = {
        dataSource: dataSource, //数据源
        editable: false,
        pageable: {
            refresh: true, //显示刷新按钮
            pageSizes: true //显示可切换每页条数按钮
        },
        selectable: 'multiple',
        title: '任务',
        toolbar: [],
        columns: columns
    };

    return {
        dataSourceOptions: dataSource,
        columns: columns,
        gridOptions: grid
    };
});

define('task-search', ['hwquery', 'core', 'binder'], function($, hwui) {
    var $searchArea = $('#hwtaskSearchArea'),
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

hwui().require('task-config', 'task-search', 'effect', 'grid', function($, hwui, config, search) {
    var grid = $('#taskGrid').hwuiGrid(config.gridOptions).on("click",'.readMsg',function(){

    }).data('hwuiGrid');
    grid.bind('dblclick', function(e) {
        //e.rowData.set('editable', false);
    });

    search.onSearch(function() {
        grid.dataSource.query(search.searchModel.toJSON());
    });


});