/**
 * Created by admin on 2016/3/29.
 */
define('company-config', function() {
    /**
     * ����Դ�ֶ�
     */
    var fields = {
        id: {type:"String",validation: {length: 36}},
        comCode: {type:"String",validation: {length: 36}},
        comName: {type: "string",defaultValue:comName,validation: {required: true,length: 50}},
        uname: {type:"String",validation: {required: true,length: 1}},
        gender: {type:"String",validation: {required: true,length: 1}},
        post: {type:"String",validation: {required: true,length: 50}},
        profession: {type:"String",validation: {required: true,length: 50}},
        education: {type:"String",validation: {required: true,length: 10}},
        born: {type: "date", format: "yyyy-MM-dd", validation: {required: true,length: 255}},
        cardName: {type:"String",validation: {required: true,length: 50}},
        cardNum: {type:"String",validation: {required: true,length: 50}},
        cardDate: {type: "date", format: "yyyy-MM-dd", validation: {required: true,length: 255}}
    };

    var dataSource = {
        serverSorting: true,
        serverPaging: true,
        pageSize: 10,
        transport: {
            read: {url : rootPath + "/gov/S_company_CompanyTrain_list.action",method:"POST"},
            create: rootPath + "/gov/S_company_CompanyTrain_save.action",
            update: rootPath + "/gov/S_company_CompanyTrain_save.action",
            destroy: rootPath + "/gov/S_company_CompanyTrain_delete.action"
        },
        schema: {
            data: 'rows',
            total: 'total',
            model: { id: 'id', fields: fields }
        }
    };



    var grid = {
        dataSource: dataSource, //����Դ
        editable: {//�ɱ༭
            mode: 'popup'
        },
        pageable: {
            refresh: true, //��ʾˢ�°�ť
            pageSizes: true //��ʾ���л�ÿҳ������ť
        },
        selectable: 'multiple',
        title: '��ҵ��ѵ���',
        toolbar: false
    };

    return {
        dataSourceOptions: dataSource,
        gridOptions: grid
    };
});

define('company-search', ['hwquery', 'core', 'binder'], function($, hwui) {
    var $searchArea = $('#companySearchArea'),
        searchModel = hwui.observable({
            page: 1,
            uname:"",
            comName:""
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

hwui().require('company-config', 'company-search','dict', 'effect', 'grid', function($, hwui, config, search, dict) {

    dict.init('sex','nation');

    var columns = [
        /*{field: 'comCode', title: '��ҵ��֯��������', width: 36},*/
        {field: 'comName', title: '��ҵ����'},
        {field: 'uname', title: '����'},
        {field: 'gender', title: '�Ա�',
            editor:dropDown,
            template:function(data){
                var code = data.gender;
                return dict.get("sex", code);
            }
        },
        /*{field: 'post', title: 'ְ��', width: 50},*/
        {field: 'profession', title: '����'},
        /*{field: 'education', title: 'ѧ��', width: 10},*/
        {field: 'born', title: '��������',
            template: function (data) {//�����б����ʾ��ʽ
                return hwui.toString(data.born,"yyyy-MM-dd");
            }
        },
        {field: 'cardName', title: '֤������'},
        {field: 'cardNum', title: '֤����'},
        {field: 'cardDate', title: '��֤����',
            template: function (data) {//�����б����ʾ��ʽ
                return hwui.toString(data.cardDate,"yyyy-MM-dd");
            }
        },
        {
            title: "����",
            align: "center",
            width:100,
            template: commandColumnTemplate
        }
    ];

    /**
     * �����в鿴��ť
     * ��ʽ�������ť
     */
    function commandColumnTemplate(rowData) {
        var status = rowData.get('isReview'), arr = [];
        arr.push("<a class='k-button k-button-icontext k-grid-complete k-viewRowBtn' data-id="+rowData.get("id")+" href='#'><span></span>�鿴</a>");
        return arr.join("");
    }

    function dropDown(container, options) {
        createComboBox(container, options,'qualification',true);
    }

    function createComboBox(container, options,dictCode,showDefault,change){

        //����һ�������б�
        $('<input  data-bind="value:' + options.field + '"style="width:100% !important"/>')
            .appendTo(container)
            .hwuiDropDownList({
                dataTextField: "name",
                dataValueField: "code",
                topable: true,
                autoBind: true,
                dataSource: dict.get("sex"),
                change:change
            });
    }

    config.gridOptions.columns = columns;
    config.gridOptions.editable.template = hwui.template($("#trainTemplatedialog").text());
    var grid = $('#companyGrid').hwuiGrid(config.gridOptions).data('hwuiGrid');
    grid.bind('dblclick', function(e) {
        //e.rowData.set('editable', false);
    });

    /**
     *�鿴����
     */
    grid.element.on("click", ".k-viewRowBtn",function(e){
        $(e.currentTarget).parents("tr").dblclick();
    });

    search.onSearch(function() {
        grid.dataSource.query(search.searchModel.toJSON());
    });
});