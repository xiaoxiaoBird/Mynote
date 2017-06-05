/**
 * Created by admin on 2016/3/15.   */
//常见的model 有grid.dataSource 、treeDataSource  ,其实只有是远程数据集合的一个子集都可以定义为model
// 定义1
 var  viewModel = huwi.observable({
    chemical_name:"",
    startTime: "",                           //初始值
    doQuery: function(){     },
    doReset: function () {  }                //绑定重置
});

// 使用Object数组指定字段配置
var  viewMode2 = hwui.data.Model.define({
    id: "id",
    fields: [{
            field: "id", // 使用field指定字段名称
            type: "string",
            nullable: false,
            validation: {required: true}
        },
        {
            field: "name",
            defaultValue: "EMPTY"
        },
        {
            field: "price",
            type: "number",
            defalutValue: 10
        }
    ]
});

// 使用Object对象
Product = hwui.data.Model.define({
    id: "id",
    fields: {
        id: {nullable: false},
        name: {defaultValue: "EMPTY"},
        price: {type: "number"}
    }
});


//最后一步是： 将model和数据块绑定
hwui.bind($("#demoSearchArea"), viewModel);

//function :
/*
model.each()   遍例所有字段
 model.get(field)     //获取指定field 值
 model.set(field,value)  //为指定的field赋值
 model.toJson     将model的函数去除变成json数据对象
 */
//另一种的绑定
define('search', ['hwquery', 'core', 'binder'], function ($, hwui) {
    var $searchArea = $('#demoSearchArea'),
        searchModel = hwui.observable({
        page: 1
    });
    hwui.bind($searchArea, searchModel);

    $searchArea.find(".k-button-reset").click(function () {    //元素置空
        searchModel.forEach(function (value, key) {
            searchModel.set(key, null);
        });
    });

    function registerSearchEvent(onSearch) {
        var searchBtn = $searchArea.find(".k-button-search");
        searchBtn.click(onSearch);
        $searchArea.off('keypress').on('keypress', function (e) {   //按下enter时查询
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