hwui().require('binder','effect', 'grid','dialog','message','tab', function($, hwui) {

    //初始化地图
    $("#mapDiv").height($(window).height() - 20);
    var options = {
        unit: "degrees",
        center: {
            x: 114.9171380558,
            y: 27.8178001085
        },
        level: 14,
        controls: [
            {id: "scalebar"},
            {id: "panzoombar"},
            {id: "mouseposition"},
            {id: "overview"}
        ]
    };
    var map = new com.picc.map.HWMap("mapDiv", options);
    map.getVectorLayer();//初始化默认层
    if (frameElement && frameElement.dialog) {
        frameElement.dialog.markPonit = markPonit;
    }
    markPonit();
    var markId = "markId123";
    var lat,lon;
    /**
     * 标记
     */
    function markPonit(){
        map.removeOverlayById(markId);
        var style = {
            graphic:true,
            externalGraphic:rootPath + "/common/scripts/map/images/default_marker.png",
            graphicWidth:30,
            graphicHeight:30,
            graphicOpacity:0,
            graphicXOffset:-15,
            graphicYOffset:-15,

            label:"",
            // 由两个字符组成的字符串，如：”lt”, “cm”, “rb”， 其中第一个字符代表水平方向上的对齐，”l”=left, “c”=center, “r”=right； 第二个字符代表垂直方向上的对齐，”t”=top, “m”=middle, “b”=bottom。
            labelAlign:"cm",
            labelXOffset:0,
            labelYOffset:0,
            fontColor:"#000000",
            fontFamily:"宋体",
            fontSize:20,
            fontWeight:"blod"
        };
        map.setVectorStyle(style);

        map.changeDragMode({type:"point",style:style},function(feature){
            //转换坐标 result.lon, result.lat
            var result = map.convertMeter2Lonlat(feature.geometry.x,feature.geometry.y);
            lon = result.lon;
            lat = result.lat;
            if (frameElement && frameElement.dialog) {
                frameElement.dialog.lat = lat;
                frameElement.dialog.lon = lon;
            }
            //设置标记ID
            feature["vectorId"] = markId;
            //添加单击事件
            map.selectFeatureControl.featureClickHandlers[feature["vectorId"]] = function(feature){
                markPonit();
            };


        });

    }

});