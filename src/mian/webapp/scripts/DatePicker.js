function createDatePicker(container, options){
    // 创建一个时间控件
    $('<input required data-bind="value:' + options.field + '"/>')
        .appendTo(container).hwuiDatePicker({
           option:{
               start:"year"
           }
        });
}

//只有时 分 秒
function makeTime( container, options){
    $('<input required data-bind="value:' + options.field +'')
        .appendTo(container).hwuiTimePicker({
            value:new Date()
        });
}


/*
options: {
    name: "DatePicker",
    /!**
     * 是否显示在最顶级页面
     * @attribute {Boolean} topable
     * @default false
     *!/
        topable: false,
    /!**
     * 选中的日期
     * @attribute {String|Data} value
     * @default null
     *!/
        value: null,
    /!**
     * 底端的内容模板，设置为false时，不显示
     * @attribute {String|Function|Boolean} footer
     * @default ""
     *!/
        footer: "",
    /!**
     * 完整日期的显示格式
     * @attribute {String} format
     * @default ""
     *!/
        format: "",
    /!**
     * 指定日历使用的区域，此设置会影响文本框内容的显示格式
     *
     * @attribute {String} culture
     * @default "zh-CN"
     *!/
        culture: "",
    /!**
     * 指定解析`value`方法设置的值或用户输入的值的格式。如果未指定，则使用`format`指定的格式进行解析
     * @attribute parseFormats {Array}
     * @default []
     *!/
        parseFormats: [],
    /!**
     * 显示日历能显示的最小值
     * @attribute {Data} min
     * @default 1900-1-1
     *!/
        min: new Date(1900, 0, 1),
    /!**
     * 显示日历能显示的最大值
     * @attribute {Data} max
     * @default 2099-12-31
     *!/
        max: new Date(2099, 11, 31),
    /!**
     * 初始显示的视图, 默认值: "month", 显示月视图，可用的有：
     * <ul>
     *     <li>month - 显示月的每一天</li>
     *     <li>year - 显示月</li>
     *     <li>decade - 十年中的每一年</li>
     *     <li>century - 世纪中的每十年</li>
     * </ul>
     * @attribute {String} start
     * @default month
     *!/
        start: MONTH,
    /!**
     * 显示的深度，可用的值有：
     * <ul>
     *     <li>month - 显示月的每一天</li>
     *     <li>year - 显示月</li>
     *     <li>decade - 十年中的每一年</li>
     *     <li>century - 世纪中的每十年</li>
     * </ul>
     * @attribute {String} depth
     * @default month
     *!/
        depth: MONTH,
    /!**
     * <ul>
     *     <li>
     *         open - {Object} 打开时的效果
     *         <ul>
     *             <li>effects - {String} 效果名称，多个效果使用空格分隔</li>
     *             <li>duration - {Number} 持续时间</li>
     *         </ul>
     *     </li>
     *     <li>
     *         cose - {Object} 关闭时的效果
     *         <ul>
     *             <li>effects - {String} 效果名称，多个效果使用空格分隔</li>
     *             <li>duration - {Number} 持续时间</li>
     *         </ul>
     *     </li>
     * </ul>
     * 打开和关闭时的动画效果，设置为false时可禁用
     * @attribute animation {Object|Boolean}
     *!/
        animation: {},
    /!**
     * 设置月视图中日期的显示模板
     * <ul>
     *     <li>content - 设置月视图中日期的显示模板, 默认值: #=data.value#</li>
     *     <li>empty - 设置月视图中不在`min`和`max`之间的日期的显示模板, 默认值: " "</li>
     * </ul>
     * @attribute {Object} month
     *!/
    month: {},
    /!**
     * 指定特殊日期, 这些日期会被传入月模板
     * @attribute {Array} dates
     * @default []
     *!/
    dates: [],
    /!**
     * aria-label模板，关于aria, 见<a href="http://www.w3.org/WAI/intro/aria" target="_blank">Accessible Rich Internet Applications</a>
     * @attribute ARIATemplate {String}
     * @default 当前选中的日期是#=hwui.toString(data.current, "D")#
     *!/
        ARIATemplate: '当前选中的日期是#=hwui.toString(data.current, "D")#'
}*/
