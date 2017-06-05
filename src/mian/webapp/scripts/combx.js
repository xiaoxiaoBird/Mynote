/**
 * Created by admin on 2016/3/31.
 */
function createComboBox(container, options,dictCode,showDefault,change){
    // 创建一个下拉列表
    $('<input required data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .hwuiComboBox({
            dataTextField: "name",
            dataValueField: "code",
            topable: true,
            autoBind: true,
            dataSource: dictionary,
            change:change
        });
}