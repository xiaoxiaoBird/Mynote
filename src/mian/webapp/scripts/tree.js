/**
 * Created by admin on 2016/3/15.
 */


/*
 树的数据源
 */
var treeDataSource = new hwui.data.HierarchicalDataSource({
    transport: {
        read: rootPath + "",
        dataType: "json"
    },
    schema: {
        model: {
            children: "nodes",
            id: "nodeId",
            hasChildren: "hasChildren"
        }
    }
});
/*
 树的显示
 */
var typeTree = $("#typeTree").hwuiTreeView({
    dataTextField: "nodeName",                //树显示的节点值
    dataSpriteCssClassField: "iconPath",
    dataSource: treeDataSource
}).data("hwuiTreeView");




//---------------------------使用远程数据加载树----------------------------------------------
function MakeTree(){
        // 配置组织树数据源
        var treeDataSource = {
            transport: {
                read: {
                    method: "post",
                    url: rootPath + '/action/S_information_DailyMaster_getDailyTree.action',
                    data:{organCode:organCode}
                },
                dataType: "json"
            },
            schema: {
                model: {
                    id: "id",
                    hasChildren: function(item) {         //表示节点是否有子节点，data.hasChildren=false时则不会向后台请求数据
                        // 名称为'动作'的记录没有子节点
                        return item.name != "动作";
                    }
                }
            }
        };
        // 定义组织树
        var treeview ={
            dataSource: treeDataSource,
            dataTextField: 'name',             //数据的"name"属性表示节点元素显示的text内容
            dataValueField: 'id',              //当父节点展开时，子节点的数据是否同时加载。设置为false后，会在初始化时加载所有数据。
            loadOnDemand: false
        };
        var treeview = $('#Tree').hwuiTreeView(treeview).data("hwuiTreeView");
}

/*
 typeTree.select()  选择节点元素
 treeDataSource.getByUid(typeTree.select().attr("data-uid"))  --从节点元素获取该选定节点的数据
 currentRowModel.set("key"，value)   //key需存在model里

 select 事件中负载node
 e.node就是这个事件触发时的节点
 this.dataItem(e.node) 获取这个节点的所有数据项

 */


//--------------------------------------------------树的数据的递归调用-----------------------
        var $treeSearchArea = $('#treeSearch');
        treeSearchMedol = hwui.observable({
            companyName:'',
            doTreeQuery:function(){
                var companyName = this.get("companyName");
                if (companyName != "") {
                    //在查询之前把树的结构保存
                    if(treeFlag ==1){
                        var  data = makeData(treeview.dataSource.data()[0]);
                        var newDataSource =[];
                        newDataSource.push(data);
                        config.treeviewOptions.dataSource=newDataSource;
                        TreeStruct = config.treeviewOptions;
                        treeFlag = 0;
                    }
                    //查询动作
                    treeFilter(companyName)
                } else {
                    if(treeFlag ==1){
                        var  data = makeData(treeview.dataSource.data()[0]);
                        var newDataSource =[];
                        newDataSource.push(data);
                        config.treeviewOptions.dataSource=newDataSource;
                        TreeStruct = config.treeviewOptions;
                        treeFlag = 0;
                    }
                    MakeTree()
                }
            },
            doTreeReset:function(){
                this.set("companyName","");
            }
        });
        hwui.bind($treeSearchArea, treeSearchMedol);

        function treeFilter(comName){
            $.ajax({
                type: "POST",
                url: rootPath+'/action/S_information_Daily_dataFilter.action',
                data: {"comName": comName,organCode:organCode},
                cache: false,
                async: false,
                dataType: "json",
                success: function (data) {
                    filterData(data.streetID,comName);
                    var   filters =  makeFilter(data.streetID);
                    if(filters.length==1){
                        treeview.dataSource.get(organCode).children.filter({
                            field: "id",
                            operator: "eq",
                            value: data.streetID[0]
                        });
                    }else{
                        treeview.dataSource.get(organCode).children.filter({
                            logic: "or",
                            filters :filters
                        });
                    }
                }
            });
        }
        //生成过滤器
        function makeFilter(values){
            var filters =[]
            for (var i =0;i<values.length;i++){
                var obj ={
                    field: "id",
                    operator: "contains",
                    value: undefined
                };
                obj.value = values[i];
                filters.push(obj);
            }
            return  filters
        }

        //过滤子级的数据
        function filterData(streetIDs,comName){
            for( var i=0;i<streetIDs.length;i++){
                var Street =streetIDs[i];
                var Street=   treeview.dataSource.get(Street);
                if(Street){
                    Street.children.filter({
                        field: "name",
                        operator: "contains",
                        value: comName
                    });
                }
            }
        }

        //本地数据保存
        function makeData(item){
            var itemsArr = [];
            var data = {};
            data.childrenNode = item.childrenNode;
            data.hasChildren = item.hasChildren;
            data.id = item.id;
            data.imageUrl = item.imageUrl;
            data.name = item.name;
            data.nodeType = item.nodeType;
            data.parentId = item.parentId;
            data.expanded = item.expanded;
            data.uid = item.uid;
            if(item.items){
                for (var i=0;i<item.items.length;i++){
                    var subclass = arguments.callee(item.items[i]);
                    itemsArr.push(subclass);
                }
                data.items = itemsArr;
            }
            return data;
        }

        //重新组织树结构
        var TreeStruct = {},treeFlag = 1;
        function MakeTree(){
            var parent =  treeview.element.parent();
            treeview.element.parent().find("div[id=dailyTree]").remove();
            var html = '<div  id="dailyTree"></div>';
            $(html).appendTo(parent);
            $('#dailyTree').removeAttr("data-role class tabindex role aria-activedescendant");
            treeview = $('#dailyTree').hwuiTreeView(TreeStruct).data("hwuiTreeView");
        }


___________________________________________________________________________________________________________________



function init(){
    var data ;
    $.ajax({
        type: "POST",
        url: rootPath + '/action/S_cultivate_Examine_getCulClassExamTree.action',
        cache: false,
        async: false,
        dataType: "json",
        success: function (result) {
            data = result;
        }
    });
    return data;
}
var treeData = init();


// 配置组织树数据源
var treeDataSource = new hwui.data.HierarchicalDataSource({
    data: [
        treeData
    ],
    schema: {
        model: {
            children: "items"
        }
    }
});

// 定义组织树
var treeview ={
    dataSource: treeDataSource,
    dataTextField: 'treeName',
    dataValueField: 'treeCode',
    height: '375px'

};
