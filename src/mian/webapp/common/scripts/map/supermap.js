/**
 * sunzuoquan
 * 初始化supermap js开发包，实现HWMap规定的接口定义
 */

// 根据type，加载底层平台地图支持包
//com.picc.map.utils.DomTools.addJavascriptUrl('http://localhost:8090/iserver/iClient/forJavaScript/libs/SuperMap.Include.js');
com.picc.map.utils.DomTools.addJavascriptUrl(com.picc.map.utils.MapConstUtil.MapDirLocation + '/js/supermap/libs/SuperMap.Include.js');
//com.picc.map.utils.DomTools.addJavascriptUrl(com.picc.map.utils.MapConstUtil.MapDirLocation + '/js/supermap/libs/SuperMap-6.1.1-9214.js');
//com.picc.map.utils.DomTools.addCssUrl(com.picc.map.utils.MapConstUtil.MapDirLocation + '/js/supermap/resource/theme/default/style.css');
//com.picc.map.utils.DomTools.addJavascriptUrl(com.picc.map.utils.MapConstUtil.MapDirLocation + '/js/supermap/libs/Lang/zh-CN.js');

var mapPrototype = com.picc.map.HWMap.prototype;

/**
 * 鼠标选中
 */
mapPrototype.onFeatureSelect = function(feature) {
	// 当选中一个数据时，做的操作
	if(this.featureClickHandlers[feature["vectorId"]])
		this.featureClickHandlers[feature["vectorId"]](feature);
};
/**
 * 取消选中
 */
mapPrototype.onUnFeatureSelect = function(feature) 
{
	// 当取消选中时不做任何操作
};
mapPrototype.vectorLayers = [];
mapPrototype.vectorLayerMap = {};
mapPrototype.modifyFeature = undefined;

mapPrototype.convertLonlat2Meter = function(lonlat){
	//var point2D = SuperMap.OSP.Core.Utility.latLonToMeters(lonlat);
	return lonlat;
};

/**
 * 米转换成经纬度
 * @param x
 * @param y
 * @returns {*}
 */
mapPrototype.convertMeter2Lonlat = function(x,y)
{
    return SuperMap.OSP.Core.Utility.metersToLatLon(new SuperMap.LonLat(x, y) );
}

/**
 * 地图初始化方法，在这个方法里面构造地图	
 * @param divId
 */
mapPrototype.__initMap = function(divId,options)
{
	//this.map = new SuperMap.Map(divId);
//	this.map = new SuperMap.Map(divId,{controls:[],units:options["unit"]});
	this.navigationControl = new SuperMap.Control.Navigation({
        dragPanOptions : {
            enableKinetic : true
        }
    });
	this.map = new SuperMap.Map(divId, {
		controls : [this.navigationControl]
	});
    //	 var mapCacheUrl = "http://10.133.215.5:8698/FileService/image?";
    var mapCacheUrl = "http://t0.supermapcloud.com/FileService/image?";
    if(window.mapConfig)
    {
        mapCacheUrl = mapConfig.mapUrl;
    }

//    var cloudLayer = new SuperMap.Layer.CloudLayer({resolutions: [156605.46875, 78302.734375, 39151.3671875, 19575.68359375, 9787.841796875, 4893.9208984375, 2446.96044921875, 1223.48022460937, 611.740112304687, 305.870056152344, 152.935028076172, 76.4675140380859, 38.233757019043, 19.1168785095215, 9.55843925476074, 4.77921962738037, 2.38960981369019,1.194804906845095]});
//    var cloudLayer = null;
//    if(window.mapConfig && window.mapConfig.useGaoDe && window.mapConfig.useGaoDe===true){
//        cloudLayer = new SuperMap.Layer.MapABC("piccMap");
//        cloudLayer.url = mapCacheUrl + "x=${x}&y=${y}&z=${z}";
//    }
//    else
//    {
//        cloudLayer = new SuperMap.Layer.CloudLayer();
//        cloudLayer.url = mapCacheUrl
//            + "map=${mapName}&type=${type}&x=${x}&y=${y}&z=${z}";
//    }
    //wmts或许所需要的matrixID信息
    var matrixIds = [];
    for (var i=0; i<21; ++i) {
        matrixIds[i] = {identifier:i};
    };
    //当前图层的分辨率数组信息,和matrixIds一样，需要用户从wmts服务获取并明确设置,resolutions数组和matrixIds数组长度相同
    var resolutions = [1.25764139776733,0.628820698883665,0.251528279553466,
        0.125764139776733,0.0628820698883665,0.0251528279553466,
        0.0125764139776733,0.00628820698883665,0.00251528279553466,
        0.00125764139776733,0.000628820698883665,0.000251528279553466,
        0.000125764139776733,0.0000628820698883665,0.0000251528279553466,
        0.0000125764139776733, 0.00000628820698883665,0.00000251528279553466,
        0.00000125764139776733,0.000000628820698883665,0.000000251528279553466];
    //新建图层
    layer = new SuperMap.Layer.WMTS({name: "China",
        url: "http://192.168.3.41:8090/iserver/services/map-china400/wmts100",
        layer: "China",
        style: "default",
        matrixSet: "GlobalCRS84Scale_China",
        format: "image/png",
        resolutions:resolutions,
        matrixIds:matrixIds,
        opacity: 1,
        requestEncoding:"KVP"});
    this.map.addLayer(layer);

    for(var i=0; i< options.controls.length; i++)
    {
        if(options.controls[i].id == "panzoombar")
        {
            var zoombarpanel = new SuperMap.Control.PanZoomBar({
                showSlider : true,
                levelsDesc : {
                    levels : [ 7, 11, 1, 14 ],
                    imageSources : [
                        com.picc.map.utils.MapConstUtil.MapDirLocation + "/js/supermap/resource/controlImages/zoom_city.png",
                        com.picc.map.utils.MapConstUtil.MapDirLocation + "/js/supermap/resource/controlImages/zoom_province.png",
                        com.picc.map.utils.MapConstUtil.MapDirLocation + "/js/supermap/resource/controlImages/zoom_street.png",
                        com.picc.map.utils.MapConstUtil.MapDirLocation + "/js/supermap/resource/controlImages/zoom_country.png" ]
                }
            });
            this.map.addControl(zoombarpanel);
            if(options.controls[i].right)
            {
                zoombarpanel.div.style.right = "100px";
            }
        }
        if(options.controls[i].id == "overview")
        {
            var overmap = new SuperMap.Control.OverviewMap({maximized: true});
            var overmapLayer = new SuperMap.Layer.WMTS({name: "China",
                url:layer.url,
                layer: "China",
                style: "default",
                matrixSet: "GlobalCRS84Scale_China",
                format: "image/png",
                resolutions:resolutions,
                matrixIds:matrixIds,
                opacity: 1,
                requestEncoding:"KVP"});
            overmap.layers= [overmapLayer];
            this.map.addControl(overmap);
            overmap.activate();
        }
    }

//	var zoombarpanel = new SuperMap.Control.PanZoomBar({
//		showSlider : true,
//		levelsDesc : {
//			levels : [ 7, 11, 1, 14 ],
//			imageSources : [
//                com.picc.map.utils.MapConstUtil.MapDirLocation + "/js/supermap/resource/controlImages/zoom_city.png",
//                com.picc.map.utils.MapConstUtil.MapDirLocation + "/js/supermap/resource/controlImages/zoom_province.png",
//                com.picc.map.utils.MapConstUtil.MapDirLocation + "/js/supermap/resource/controlImages/zoom_street.png",
//                com.picc.map.utils.MapConstUtil.MapDirLocation + "/js/supermap/resource/controlImages/zoom_country.png" ]
//		}
//	});
//	this.map.addControl(zoombarpanel);

	
	// 增加导航操作组件
	this.selectFeatureControl = new SuperMap.Control.SelectFeature(mapPrototype.vectorLayers,{onSelect:this.onFeatureSelect,onUnSelect:this.onUnFeatureSelect});
	this.map.addControl(this.selectFeatureControl);
	this.selectFeatureControl.repeat = true;
	this.selectFeatureControl.activate();
	this.selectFeatureControl.featureClickHandlers = {};

    var zoomLevel = 6;
    if(options.level)
     {
         zoomLevel = options.level;
     }
     if(options.center)
     {
         var center = this.convertLonlat2Meter(new SuperMap.LonLat(options.center.x, options.center.y));
         this.map.setCenter(center, zoomLevel);
     }
     var _self = this;
     var toolbar = "<div class='map-toolbar' style='z-index: 1000;margin-top:265px;margin-left: 32px'>"
    	 + "</div>";
     	 // 工具箱显示地图上     	 
     	 toolbar = $(toolbar).prependTo($("#"+divId));
     	 
     var pan = "<img title='平移' src='" + com.picc.map.utils.MapConstUtil.MapDirLocation + "/images/pan.png' width='21px' height='21px' id='pan'/>"
    	 + "<div></div>";
     	 //平移图标放入工具箱
     	 $(pan).appendTo(toolbar).bind('click',function(){
     		_self.pan();
     		mapPrototype.addBorder("pan");
     	});
     	 
     	 
     var ruler = "<img title='测距' src='" + com.picc.map.utils.MapConstUtil.MapDirLocation + "/images/ruler.png' width='21px' height='21px' id='ruler'/>"
     	 + "<div></div>";
     	//测距图标放入工具箱
     	$(ruler).appendTo(toolbar).bind('click',function(){
     		_self.measureDistance();
     		mapPrototype.addBorder("ruler");
     	});
     	 
     var zoomIn = "<img title='放大' src='" + com.picc.map.utils.MapConstUtil.MapDirLocation + "/images/zoomin.png' width='21px' height='21px' id='zoomin'/>"
 	 	 + "<div></div>";
     	//放大图标放入工具箱
     	$(zoomIn).appendTo(toolbar).bind('click',function(){
        	 _self.zoomIn();
        	 mapPrototype.addBorder("zoomin");
        });
     	 
     var zoomOut = "<img title='缩小' src='" + com.picc.map.utils.MapConstUtil.MapDirLocation + "/images/zoomout.png' width='21px' height='21px' id='zoomout'/>"
     	//缩小图标放入工具箱
  		$(zoomOut).appendTo(toolbar).bind('click',function(){
     		 _self.zoomOut();
     		 mapPrototype.addBorder("zoomout");
         });
     
     /**
      * 按esc后，调用map.pan 停止（画多边形、测距操作）
      */
     $(document).unbind("keydown.spgl_sp_esc").bind("keydown.spgl_sp_esc",function(e){
     	var keyCode = window.event?e.keyCode:e.which;
     	if(keyCode==27){  //esc按钮
     		$(".map-toolbar img.current").removeClass("current");
     		_self.pan();
     	}
     });
     
};



/**
 * 工具选中效果
 */
mapPrototype.addBorder = function(id){
	$("div .current").removeClass("current");
	$("#"+id).addClass("current");
};

/**
 * 根据id获取图层
 */
mapPrototype.getLayer = function (layerId)
{
	if(layerId)
	{
		return this.map.getLayer(layerId);
	}
};
/**
 * 根据id获取图层
 */
mapPrototype.getVectorLayer = function (layerId)
{
	if(layerId)
	{
		return this.vectorLayerMap[layerId];
	}
	else if(this.defaultVectorLayer)
	{
		return this.defaultVectorLayer;
	}
	else
	{
		// 初始增加一个vector图层
		this.defaultVectorLayer = this.addVectorLayer("defaultVectorLayer");
        return this.defaultVectorLayer;
	}
};
/**
 * 根据id获取图层
 */
mapPrototype.getMarkerLayer = function (layerId)
{
	if(layerId)
	{
		return this.map.getLayer(layerId);
	}
	else if(this.defaultMarkerLayer)
	{
		return this.defaultMarkerLayer;
	}
	else
	{
		// 初始增加一个图层
		this.defaultMarkerLayer = new SuperMap.Layer.Markers("defaultMarkerLayer");
		this.map.addLayer(this.defaultMarkerLayer);
		return this.defaultMarkerLayer;
	}
};


/**
 * 在地图上增加矢量图层
 * @param layerId
 */
mapPrototype.addVectorLayer = function (layerId)
{
	// 初始增加一个vector图层
	var vectorLayer = new SuperMap.Layer.Vector(layerId);
	this.vectorLayers.push(vectorLayer);
    this.vectorLayerMap[layerId] = vectorLayer;
	this.selectFeatureControl.setLayer(this.vectorLayers);
	this.map.addLayer(vectorLayer);
	return vectorLayer;
};
/**
 * 在地图上增加矢量图层
 * @param layerId
 */
mapPrototype.addMarkerLayer = function (layerId)
{
	var markerLayer = new SuperMap.Layer.Vector(layerId);
	this.map.addLayer(markerLayer);
	return markerLayer;
};

/**
 * 删除一个图层
 * @param layerId
 */
mapPrototype.removeLayer = function (layerId)
{
	var layer = this.getLayer(layerId);
	if(layer != null && layer["CLASS_NAME"] == "SuperMap.Layer.Vector")
	{
		// 处理选择控件
		var newVectorLayers = [];
		for(var i=0; i<this.vectorLayers.length; i++)
		{
			if(this.vectorLayers[i] != layer )
			{
				newVectorLayers.push(this.vectorLayers[i]);
			}
		}
		this.vectorLayers = newVectorLayers;
		this.selectFeatureControl.setLayer(this.vectorLayers);
	}
	if(layer != null)
	{
		// 移除图层
		this.map.removeLayer(layer);
	}
};

/**
 * 定义自增长id初始值
 */
mapPrototype.sequenceValue = 0;
/**
 * 自动生成id
 */
mapPrototype.generateId = function()
{
	this.sequenceValue += 1;
	return "unknown_"+this.sequenceValue;
};

///**
// * 定义默认的marker配置项
// */
//mapPrototype.markerDefaultConfig = {
//		id:"",
//		attributes:{},
//		point:{x:104.055,y:30.6792},
//		icon:{iconSrc:com.picc.map.utils.MapConstUtil.MapDirLocation + "/images/default_marker.png",
//			width:-10,
//			height:-20
//			},
//		offset:{xOffset:0,yOffset:0}
//};
///**
// * 在地图上增加一个点
// * @param marker
// * @param callback
// * @param layerId	可以不传入
// */
//mapPrototype.addMarker = function (markerObj,callback,layerId)
//{
//	var markerLayer = this.getMarkerLayer(layerId);
//	// 判断坐标配置
//	if(!markerObj.hasOwnProperty("point") || !markerObj["point"].hasOwnProperty("x") || !markerObj["point"].hasOwnProperty("y"))
//	{
//		alert("has not point config,config:{point:{x:104,y:30}}");
//		return null;
//	}
//	// 获取图标配置
//	var iconConfig = this.markerDefaultConfig["icon"];
//	if(markerObj["icon"])
//		iconConfig = markerObj["icon"];
//	// 获取偏移配置
//	var offsetConfig = this.markerDefaultConfig["offset"];
//	if(markerObj["offset"])
//		offsetConfig  = markerObj["offset"];
//	var attributes = {};
//	// 获取属性
//	if(markerObj["attributes"])
//		attributes = markerObj["attributes"];
//
//	var size = new SuperMap.Size(iconConfig["width"],iconConfig["height"]);
//	var offset = new SuperMap.Pixel(offsetConfig["xOffset"], offsetConfig["yOffset"]);
//	var icon = new SuperMap.Icon(iconConfig["iconSrc"], size, offset);
//	var tempPoint = this.convertLonlat2Meter(new SuperMap.LonLat(markerObj["point"]["x"],markerObj["point"]["y"]));
//	var marker = new SuperMap.Marker(tempPoint,icon);
//	markerLayer.addMarker(marker);
//	marker["attributes"] = attributes;
//	if(markerObj["id"])
//		marker["markerId"] = markerObj["id"];
//	else
//		marker["markerId"] = this.generateId();
//	if(typeof callback === "function")
//	{
//		// 需要考虑callback的参数
//		marker.events.register("click",null,callback);
//	}
//	return marker;
//};


/**
* 定义默认的polygon配置项
*/
mapPrototype.markerDefaultConfig = {
		id:"",
		attributes:{},
		point:{x:104.055,y:30.6792},
		style:{
			graphicName:"circle",
			fill:true,
			fillColor:"#00FF00",
			fillOpacity:0.5,
			stroke:true,
			strokeColor:"#FF0000",
			strokeOpacity:0.5,
			// dot,dash,dashot,longdash,longdashdot,solid
			strokeDashstyle:"solid",
			pointRadius:"20",

			graphic:true,
			externalGraphic:com.picc.map.utils.MapConstUtil.MapDirLocation + "/images/default_marker.png",
			graphicWidth:20,
			graphicHeight:20,
			graphicOpacity:0.5,
			graphicXOffset:0,
			graphicYOffset:0,

			label:"",
			// 由两个字符组成的字符串，如：”lt”, “cm”, “rb”， 其中第一个字符代表水平方向上的对齐，”l”=left, “c”=center, “r”=right； 第二个字符代表垂直方向上的对齐，”t”=top, “m”=middle, “b”=bottom。
			labelAlign:"cm",
			labelXOffset:0,
			labelYOffset:0,
			fontColor:"#000000",
			fontFamily:"宋体",
			fontSize:20,
			fontWeight:"blod"
		}
};

/**
* 在地图上增加一个点
* @param marker
* @param callback
* @param layerId	可以不传入
*/
mapPrototype.addMarker = function (markerObj,callback,layerId)
{
	var vectorLayer = this.getVectorLayer(layerId);
	// 判断坐标配置
	if(!markerObj.hasOwnProperty("point") || !markerObj["point"].hasOwnProperty("x") || !markerObj["point"].hasOwnProperty("y"))
	{
		alert("has not point config,config:{point:{x:104,y:30}}");
		return null;
	}
	// 获取图标配置
	var styleConfig = this.markerDefaultConfig["style"];
	if(markerObj["style"])
		styleConfig  = markerObj["style"];
	// 获取属性
	var attributes = {};
	if(markerObj["attributes"])
		attributes = markerObj["attributes"];
	var tempPoint = this.convertLonlat2Meter(new SuperMap.LonLat(markerObj["point"]["x"],markerObj["point"]["y"]));
	var marker = new SuperMap.Feature.Vector(new SuperMap.Geometry.Point(tempPoint.lon,tempPoint.lat),attributes,styleConfig);

//	marker.events.register("click",attributes,callback);

	vectorLayer.addFeatures(marker);
	if(markerObj["id"])
		marker["vectorId"] = markerObj["id"];
	else
		marker["vectorId"] = this.generateId();
	if(typeof callback === "function")
	{
		// 需要考虑callback的参数
		this.selectFeatureControl.featureClickHandlers[marker["vectorId"]] = callback;
	}
	return marker;
};

/**
 * 定义默认的polygon配置项
 */
mapPrototype.polygonDefaultConfig = {
		id:"",
		attributes:{},
		points:[{x:104.055,y:30.6792},{x:104.155,y:30.5792},{x:104.175,y:30.5592}],
		style:{
			fill:true,
			fillColor:"#00FF00",
			fillOpacity:0.5,
			stroke:true,
			strokeColor:"#FF0000",
			strokeOpacity:0.5,
			// dot,dash,dashot,longdash,longdashdot,solid
			strokeDashstyle:"solid"
		}
};

/**
 * 添加多边形
 * @param polygonObj
 * @param callback
 * @param layerId	可以不传入
 */
mapPrototype.addPolygon = function(polygonObj,callback,layerId)
{
	// 判断坐标配置
	if(!polygonObj.hasOwnProperty("points") || !(polygonObj["points"].length>2))
	{
		alert("has not point config,config:{points:[{x:104,y:30},{x:105,y:31},{x:104,y:36}]}");
		return null;
	}
	var vectorLayer = this.getVectorLayer(layerId);
    if(!vectorLayer){
        vectorLayer = this.addVectorLayer(layerId);
    }
	var styleConfig = this.polygonDefaultConfig["style"];
	if(polygonObj["style"])
		styleConfig = polygonObj["style"];
	var points = [];
	for(var i=0; i<polygonObj["points"].length; i++)
	{
        var tempPoint = this.convertLonlat2Meter(new SuperMap.LonLat(polygonObj["points"][i]["x"],polygonObj["points"][i]["y"]));
		points.push(new SuperMap.Geometry.Point(tempPoint.lon,tempPoint.lat));
	}
	var linearRing = new SuperMap.Geometry.LinearRing(points);
	var polygon = new SuperMap.Geometry.Polygon([linearRing]);
	var polygonFeature = new SuperMap.Feature.Vector(polygon,polygonObj["attributes"],styleConfig);
	if(polygonObj["id"])
		polygonFeature["vectorId"] = polygonObj["id"];
	else
		polygonFeature["vectorId"] = this.generateId();
	vectorLayer.addFeatures(polygonFeature);
	if(typeof callback === "function")
	{
		// 需要考虑callback的参数
		this.selectFeatureControl.featureClickHandlers[polygonFeature["vectorId"]] = callback;
	}
};
/**
 * 编辑多边形
 * @param callback
 * @param layerId 多边形所在的图层
 */
mapPrototype.editPolygon = function(callback,layerId){
    var vectorLayer = this.getVectorLayer(layerId);
    if (typeof callback == "function") {
        vectorLayer.events.on({"afterfeaturemodified": callback});
    }
    if(!this.modifyFeature){
        var modifyFeature = new SuperMap.Control.ModifyFeature(vectorLayer);
        this.map.addControl(modifyFeature);
        this.modifyFeature = modifyFeature;
    }
    this.modifyFeature.activate();
}
/**
 * 定义默认的polygon配置项
 */
mapPrototype.circleDefaultConfig = {
    id:"",
    attributes:{},
    center:{x:104.175,y:30.5592},
    radius:5000,
    style:{
        fill:true,
        fillColor:"#00FF00",
        fillOpacity:0.5,
        stroke:true,
        strokeColor:"#FF0000",
        strokeOpacity:0.5,
        // dot,dash,dashot,longdash,longdashdot,solid
        strokeDashstyle:"solid"
    }
};

/**
 * 添加
 * @param polygonObj
 * @param callback
 * @param layerId	可以不传入
 */
mapPrototype.addCircle = function(pCircleObj,callback,layerId)
{
    // 判断坐标配置
    if(!pCircleObj.hasOwnProperty("center") || !pCircleObj.hasOwnProperty("radius"))
    {
        alert("has not center  or radius config !");
        return null;
    }
    var vectorLayer = this.getVectorLayer(layerId);
//    var vectorLayer = this.getVectorLayer();
    var styleConfig = this.polygonDefaultConfig["style"];
    if(pCircleObj["style"])
        styleConfig = pCircleObj["style"];
    var points = [];

    var tempPoint = this.convertLonlat2Meter(new SuperMap.LonLat(pCircleObj["center"]["x"],pCircleObj["center"]["y"]));
    var tempPoints = com.picc.map.utils.MapTools.getCircles(pCircleObj["radius"],tempPoint.lon,tempPoint.lat);
    for(var i=0; i<tempPoints.length;i++)
    {
        points.push(new SuperMap.Geometry.Point(tempPoints[i].x,tempPoints[i].y));
    }
    var linearRing = new SuperMap.Geometry.LinearRing(points);
    var polygon = new SuperMap.Geometry.Polygon([linearRing]);
    var polygonFeature = new SuperMap.Feature.Vector(polygon,pCircleObj["attributes"],styleConfig);
    if(pCircleObj["id"])
        polygonFeature["vectorId"] = pCircleObj["id"];
    else
        polygonFeature["vectorId"] = this.generateId();
    vectorLayer.addFeatures(polygonFeature);
    if(typeof callback === "function")
    {
        // 需要考虑callback的参数
        this.selectFeatureControl.featureClickHandlers[polygonFeature["vectorId"]] = callback;
    }
};

/**
 * 定义默认的polyline配置项
 */
mapPrototype.lineDefaultConfig = {
		id:"",
		attributes:{},
		points:[{x:104.055,y:30.6792},{x:104.155,y:30.5792},{x:104.175,y:30.5592}],
		style:{
			stroke:true,
			strokeColor:"#FF0000",
			strokeOpacity:0.5,
			// dot,dash,dashot,longdash,longdashdot,solid
			strokeDashstyle:"solid"
		}
};

/**
 * 添加线
 * @param polylineObj
 * @param callback
 * @param layerId	可以不传入
 */
mapPrototype.addPolyline = function(polylineObj,callback,layerId)
{
	// 判断坐标配置
	if(!polylineObj.hasOwnProperty("points") || !(polylineObj["points"].length>1))
	{
		alert("has not point config,config:{points:[{x:104,y:30},{x:105,y:31},{x:104,y:36}]}");
		return null;
	}
	var vectorLayer = this.getVectorLayer(layerId);
	var styleConfig = this.lineDefaultConfig["style"];
	if(polylineObj["style"])
		styleConfig = polylineObj["style"];
	var points = [];
	for(var i=0; i<polylineObj["points"].length; i++)
	{
        var tempPoint = this.convertLonlat2Meter(new SuperMap.LonLat(polylineObj["points"][i]["x"],polylineObj["points"][i]["y"]));
        points.push(new SuperMap.Geometry.Point(tempPoint.lon,tempPoint.lat));
	}
	var lineString = new SuperMap.Geometry.LineString(points);
	var polylineFeature = new SuperMap.Feature.Vector(lineString,polylineObj["attributes"],styleConfig);
	if(polylineObj["id"])
		polylineFeature["vectorId"] = polylineObj["id"];
	else
		polylineFeature["vectorId"] = this.generateId();
	vectorLayer.addFeatures(polylineFeature);
	if(typeof callback === "function")
	{
		// 需要考虑callback的参数
		this.selectFeatureControl.featureClickHandlers[polylineFeature["vectorId"]] = callback;
	}
};

/**
 * 定义默认的polyline配置项
 */
mapPrototype.textDefaultConfig = {
		id:"",
		attributes:{},
		point:{x:104.055,y:30.6792},
		style:{
			// 由两个字符组成的字符串，如：”lt”, “cm”, “rb”， 其中第一个字符代表水平方向上的对齐，”l”=left, “c”=center, “r”=right； 第二个字符代表垂直方向上的对齐，”t”=top, “m”=middle, “b”=bottom。
			labelAlign:"cm",
			labelXOffset:0,
			labelYOffset:0,
			fontColor:"#000000",
			fontFamily:"宋体",
			fontSize:20,
			fontWeight:"blod"
		}
};

/**
 * 添加文字
 * @param textObj
 * @param callback
 * @param layerId	可以不传入
 */
mapPrototype.addText = function(textObj,layerId)
{
	// 判断坐标配置
	if(!textObj.hasOwnProperty("point") || !textObj["point"].hasOwnProperty("x") || !textObj["point"].hasOwnProperty("y"))
	{
		alert("has not point config,config:{point:{x:104,y:30}}");
		return null;
	}
	var vectorLayer = this.getVectorLayer(layerId);
	var styleConfig = this.textDefaultConfig["style"];
	if(textObj["style"])
		styleConfig = textObj["style"];
    var tempPoint = this.convertLonlat2Meter(new SuperMap.LonLat(textObj["point"]["x"],textObj["point"]["y"]));
	var textFeature = new SuperMap.Feature.Vector(new SuperMap.Geometry.Point(tempPoint.lon,tempPoint.lat),textObj["attributes"],styleConfig);
	if(textObj["id"])
		textFeature["vectorId"] = textObj["id"];
	else
		textFeature["vectorId"] = this.generateId();
	vectorLayer.addFeatures(textFeature);
};

/**
 * 清空标记
 * @param layerId	可以不传入
 */
mapPrototype.clearOverlays = function(layerId)
{
	var layer = this.getLayer(layerId);
	if(layer != null && (layer["clearMarkers"]) )
	{
		layer.clearMarkers();
	}
	else if(layer != null && layer["removeAllFeatures"])
	{
		layer.removeAllFeatures();
	}
	else
	{
		this.getMarkerLayer(layerId).removeAllFeatures();
		this.getVectorLayer(layerId).removeAllFeatures();
	}
};

/**
 * 删除一个标记
 * @param overlayId
 * @param layerId	可以不传入
 */
mapPrototype.removeOverlayById = function(overlayId,layerId)
{
	var layer = this.getVectorLayer(layerId);
	if(layer != null && layer["removeMarker"])
	{
		this.removeMarkerById(overlayId, layer);
	}
	else if(layer != null && layer["removeFeatures"])
	{
		this.removeVectorById(overlayId, layer);
	}
	else
	{
		this.removeVectorById(overlayId, this.getVectorLayer(layerId));
		this.removeMarkerById(overlayId, this.getMarkerLayer(layerId));
	}
};
/**
 * 删除vector
 */
mapPrototype.removeVectorById = function(overlayId,layer)
{
	var deleteFeatures = this.getOverlayById(overlayId,layer);
	if(deleteFeatures.length>0)
	{
		layer.removeFeatures(deleteFeatures);
	}
};

/**
 * 删除marker
 */
mapPrototype.removeMarkerById = function(overlayId,layer)
{
	var markers = layer["markers"];
	var deleteMarkers = [];
	for(var i=0; i<markers.length; i++)
	{
		if(markers[i]["markerId"] == overlayId)
			deleteMarkers.push(markers[i]);
	}
	for(i=0; i<deleteMarkers.length; i++)
	{
		layer.removeMarker(deleteMarkers[i]);
	}
	deleteMarkers = null;
};
/**
 * 查找vector中的数据
 */
mapPrototype.getOverlayById = function(overlayId,layer)
{
	var features = layer["features"];
	var deleteFeatures = [];
	for(var i=0; i<features.length; i++)
	{
		if(features[i]["vectorId"] == overlayId)
			deleteFeatures.push(features[i]);
	}
	return deleteFeatures;
};

/**
 * 设置高亮
 * @param overlayId
 * @param options
 * @param layerId	可以不传入
 */
mapPrototype.setMarkerHighlight = function(overlayId,options,layerId)
{
};

/**
 * 移除高亮
 * @param overlayId
 * @param layerId	可以不传入
 */
mapPrototype.removeMarkerHighlight = function(overlayId,layerId)
{
};


/**
 * 显示详情信息
 * @param overlayId
 */
mapPrototype.showOverlayInfo = function(overlayId,width,height,html,layerId)
{
	if(this.popup != null)
	{
		this.map.removePopup(this.popup);
		this.popup = null;
	}
	
	var vectorLayer = this.getVectorLayer(layerId);
	var features = this.getOverlayById(overlayId,vectorLayer);
	if(features.length>0)
	{
		var centerPoint = features[0].geometry.getCentroid();
        var Sys = {};
        var ua = navigator.userAgent.toLowerCase();
        var s;
        (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] : undefined;
        if(Sys.ie == "8.0" || Sys.ie == "7.0"){
            width += 10;
        }
		this.popup = this.addAnchoredDomElementByMapCoord(overlayId, centerPoint["x"], centerPoint["y"], width, height, html,true);
	}
};


/**
 * 增加html到地图窗口
 */
mapPrototype.addDomElement = function(id,x,y,width,height,html,closable)
{
	var popup = new SuperMap.Popup(
			id,
			new SuperMap.LonLat(x,y),
			new SuperMap.Size(width,height),
			html,
			closable);
	popup.autoSize = true;
	this.map.addPopup(popup);
};
/**
 * 增加html到地图窗口
 */
mapPrototype.addAnchoredDomElement = function(id,x,y,width,height,html,closable)
{
    if(this.popup != null)
    {
        this.map.removePopup(this.popup);
        this.popup = null;
    }
    //获取IE版本
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] : undefined;
    if(Sys.ie == "8.0" || Sys.ie == "7.0"){
        width += 10;
    }
    this.popup = new SuperMap.OSP.Core.InfoWindow("lipeiInfowindow",
					this.convertLonlat2Meter (new SuperMap.LonLat(x,y) ),
					  new SuperMap.Size(width,height),
		html,
		 null,
		 false);
    this.popup.autoSize = false;
    this.popup.panMapIfOutOfView = true;
	this.map.addPopup(this.popup);
	return this.popup;
};
/**
 * 增加html到地图窗口
 */
mapPrototype.addAnchoredDomElementByMapCoord = function(id,x,y,width,height,html,closable)
{
    if(this.popup != null)
    {
        this.map.removePopup(this.popup);
        this.popup = null;
    }
    this.popup = new SuperMap.OSP.Core.InfoWindow("lipeiInfowindow",
        new SuperMap.LonLat(x,y),
        new SuperMap.Size(width,height),
        html,
        null,
        false);
    this.popup.autoSize = false;
    this.popup.panMapIfOutOfView = true;
    this.map.addPopup(this.popup);
    return this.popup;
};

/**
 * 隐藏信息窗口
 */
mapPrototype.hideInfoWindow = function()
{
	if(this.popup != null)
	{
		this.map.removePopup(this.popup);
		this.popup = null;
	}
};

/**
 * 绘制操作结束
 */
mapPrototype.setVectorStyle = function(style,layerId)
{
	var vectorLayer = this.getVectorLayer(layerId);
	vectorLayer["style"] = style;
};


/**
 * 绘制操作结束
 */
mapPrototype.drawCompleted = function(args)
{
	this["drawcallback"](args.feature);
	this["mapContainer"].deactiveAllDraw();
};

mapPrototype.deactiveAllDraw = function()
{
	if(this.drawPointTool != null)
	{
		this.drawPointTool.deactivate();
	}
	if(this.drawPolylineTool != null)
	{
		this.drawPolylineTool.deactivate();
	}
	if(this.drawPolygonTool != null)
	{
		this.drawPolygonTool.deactivate();
	}
};

/**
 * 修改当前地图操作模式
 * @param mode {type:"point/polyline/polygon"}
 * @param callback
 */
mapPrototype.changeDragMode = function(mode,callback,layerId)
{
	this.deactiveAllDraw();
	var handlerOptions = {
			layerOptions:{
				styleMap: new SuperMap.StyleMap(     
					    new SuperMap.Style(mode["style"])
					)
			}
	};
	var vectorLayer = this.getVectorLayer(layerId);
	if(mode["type"] == "point")
	{
		if(this.drawPointTool == null)
		{
			this.drawPointTool = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.Point,{handlerOptions:handlerOptions});
			this.drawPointTool.events.on({"featureadded": this.drawCompleted});
			this.drawPointTool["mapContainer"] = this;
			this.map.addControl(this.drawPointTool);			
		}
		// 激活绘制点
		this.drawPointTool["drawcallback"] = callback;
		this.drawPointTool.activate();
	}
	else if(mode["type"] == "polyline")
	{
		if(this.drawPolylineTool == null)
		{
			this.drawPolylineTool = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.Path,{handlerOptions:handlerOptions});
			this.drawPolylineTool.events.on({"featureadded": this.drawCompleted});
			this.map.addControl(this.drawPolylineTool);		
			this.drawPolylineTool["mapContainer"] = this;
		}
		// 激活绘制点
		this.drawPolylineTool["drawcallback"] = callback;
		this.drawPolylineTool.activate();
	}
	else if(mode["type"] == "polygon")
	{
		if(this.drawPolygonTool == null)
		{
			this.drawPolygonTool = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.Polygon,{handlerOptions:handlerOptions});
			this.drawPolygonTool.events.on({"featureadded": this.drawCompleted});
			this.map.addControl(this.drawPolygonTool);		
			this.drawPolygonTool["mapContainer"] = this;
		}
		// 激活绘制多边形
		this.drawPolygonTool["drawcallback"] = callback;
		this.drawPolygonTool.activate();
	}
};

/**
 * 中心对焦
 * @param centerX
 * @param centerY
 * @param level
 */
mapPrototype.panByPointAndLevel = function(centerX,centerY,level)
{

	this.map.setCenter(this.convertLonlat2Meter(new SuperMap.LonLat(centerX,centerY)));
	this.map.zoomTo(level);
};

/**
 * 缩放位置
 * @param xmin
 * @param ymin
 * @param xmax
 * @param ymax
 */
mapPrototype.panByExtent = function(xmin,ymin,xmax,ymax)
{
    var leftbottom = this.convertLonlat2Meter(new SuperMap.LonLat(xmin,ymin));
    var rightTop = this.convertLonlat2Meter(new SuperMap.LonLat(xmax,ymax));
	this.map.zoomToExtent(new SuperMap.Bounds(leftbottom.lon,leftbottom.lat,rightTop.lon,rightTop.lat), true);
};


/**
 * 缩放位置
 * @param xmin
 * @param ymin
 * @param xmax
 * @param ymax
 */
mapPrototype.panTo = function(x,y)
{
	//this.map.panTo();
    this.map.setCenter(this.convertLonlat2Meter(new SuperMap.LonLat(x,y)));
};

/**
 * 缩放到指定等级
 * @param level
 */
mapPrototype.zoomToLevel = function(level)
{
	this.map.zoomTo(level);
};

/**
 * 更新图标
 * @param markerObj
 */
mapPrototype.updateMarker = function(markerObj)
{
	
};

/**
 * 更新线
 * @param polylineObj
 */
mapPrototype.updatePolyline = function(polylineObj)
{
};


/**
 * 更新多边形
 * @param polygonObj
 */
mapPrototype.updatePolygon = function(polygonObj)
{
};

/**
 * 更新多边形
 * @param textObj
 */
mapPrototype.updateText = function(textObj)
{
};

/**
 * 闪烁图标
 */
mapPrototype.refreshOverlay = function(overlayId)
{
};

/**
 * 移除闪烁效果
 */
mapPrototype.removeRefreshOverlay = function(overlayId)
{
};

/**
 * 移除所有闪烁效果
 */
mapPrototype.removeAllRefresh = function()
{
};

/**
 * 放大
 */
mapPrototype.zoomIn = function()
{
	this.pan();
    if(this.zoomControl)
    {
        this.zoomControl.out = false;
    }
    else
    {
        this.zoomControl = new SuperMap.Control.ZoomBox({out:false});
        this.map.addControl(this.zoomControl);
    }
    this.removeOverlayById("measureFeatureId");
//    this.navigationControl.deactivate();
    this.zoomControl.activate();
};

/**
 * 缩小
 */
mapPrototype.zoomOut = function()
{
	this.pan();
    if(this.zoomControl)
    {
        this.zoomControl.out = true;
    }
    else
    {
        this.zoomControl = new SuperMap.Control.ZoomBox({out:true});
        this.map.addControl(this.zoomControl);
    }
    this.removeOverlayById("measureFeatureId");
//    this.navigationControl.deactivate();
    this.zoomControl.activate();
};

/**
 * 平移
 */
mapPrototype.pan = function()
{
	if(this.zoomControl)
    {
        this.zoomControl.deactivate();
    }
	if(this.drawPointTool != null){
		this.drawPointTool.deactivate();
	}
	if(this.drawPolylineTool != null){
		this.drawPolylineTool.deactivate();
	}
	if(this.drawPolygonTool != null){
		this.drawPolygonTool.deactivate();
	}
    this.removeOverlayById("measureFeatureId");
//    this.navigationControl.deactivate();
//    this.navigationControl.activate();
//    this.selectFeatureControl.deactivate();
//    this.selectFeatureControl.activate();
};

/**
 * 测距
 */
mapPrototype.measureDistance = function()
{
//    if(this.zoomControl)
//    {
//        this.zoomControl.deactivate();
//    }
	this.pan();
    this.removeOverlayById("measureFeatureId");
    var style = {
        stroke:true,
        strokeColor:"#FF0000",
        strokeOpacity:0.7,
        strokeWidth:2,
        // dot,dash,dashot,longdash,longdashdot,solid
        strokeDashstyle:"solid"
    };
    this.setVectorStyle(style);
    this.changeDragMode({type:"polyline",style:style},this.addMeasureText);
}
mapPrototype.addMeasureText = function(feature)
{
    feature["vectorId"] = "measureFeatureId";
    var point = feature.geometry.getCentroid();
    // 获取线长度
    var length = com.picc.map.utils.MapTools.calLineLength(feature.geometry.getVertices());
    // 判断以公里为单位还是以米为单位
    var unitType = "千米";
    if(length>10000)
    {
        length = length/1000;
        unitType = "千米";
    }
    else
        unitType = "米";
    var strLength = length+"";
    strLength = strLength.split(".")[0];
    // 定义标绘样式
    textDefaultConfigStyle ={
            label:strLength+unitType,
            // 由两个字符组成的字符串，如：”lt”, “cm”, “rb”， 其中第一个字符代表水平方向上的对齐，”l”=left, “c”=center, “r”=right； 第二个字符代表垂直方向上的对齐，”t”=top, “m”=middle, “b”=bottom。
            labelAlign:"cm",
            labelXOffset:0,
            labelYOffset:0,
            fontColor:"#FF0000",
            fontFamily:"宋体",
            fontSize:20,
            fontWeight:"bold"
        };
    // 绘制
    var marker = new SuperMap.Feature.Vector(point,{},textDefaultConfigStyle);
    marker["vectorId"] = "measureFeatureId";
    this["mapContainer"].getVectorLayer().addFeatures(marker);
}