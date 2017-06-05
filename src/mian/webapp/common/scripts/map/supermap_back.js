/**
 * sunzuoquan
 * 初始化supermap js开发包，实现HWMap规定的接口定义
 */

// 根据type，加载底层平台地图支持包
//com.picc.map.utils.DomTools.addJavascriptUrl('http://localhost:8090/iserver/iClient/forJavaScript/libs/SuperMap.Include.js');
com.picc.map.utils.DomTools.addJavascriptUrl(com.harmonywisdom.map.utils.MapConstUtil.MapDirLocation + '/js/supermap/libs/SuperMap.Include.js');
//com.picc.map.utils.DomTools.addJavascriptUrl(com.harmonywisdom.map.utils.MapConstUtil.MapDirLocation + '/js/supermap/libs/SuperMap-6.1.1-9214.js');
//com.picc.map.utils.DomTools.addCssUrl(com.harmonywisdom.map.utils.MapConstUtil.MapDirLocation + '/js/supermap/resource/theme/default/style.css');
//com.picc.map.utils.DomTools.addJavascriptUrl(com.harmonywisdom.map.utils.MapConstUtil.MapDirLocation + '/js/supermap/libs/Lang/zh-CN.js');

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
/**
 * 地图初始化方法，在这个方法里面构造地图	
 * @param divId
 */
mapPrototype.__initMap = function(divId,options)
{
	//this.map = new SuperMap.Map(divId);
	this.map = new SuperMap.Map(divId,{controls:[],units:options["unit"]});
	// 增加导航操作组件
	this.navigation = new SuperMap.Control.Navigation({dragPanOptions: {enableKinetic: true}});
	this.map.addControl(this.navigation);
	this.selectFeatureControl = new SuperMap.Control.SelectFeature(mapPrototype.vectorLayers,{onSelect:this.onFeatureSelect,onUnSelect:this.onUnFeatureSelect});
	this.map.addControl(this.selectFeatureControl);
	this.selectFeatureControl.repeat = true;
	this.selectFeatureControl.activate();
	this.selectFeatureControl.featureClickHandlers = {};
	
	// 向地图中增加各种控件
	for(var i=0; i<options["controls"].length; i++)
	{
		var control = options["controls"][i];
		if(control["id"] == "scalebar")
			this.map.addControl(new SuperMap.Control.ScaleLine());
		else if(control["id"] == "panzoombar")
		{
			var panzoombar = new SuperMap.Control.PanZoomBar({
			});
			this.map.addControl(panzoombar);
		}	
		else if(control["id"] == "mouseposition")
			this.map.addControl(new SuperMap.Control.MousePosition());
		else if(control["id"] == "overview")
			this.map.addControl(new SuperMap.Control.OverviewMap());
	}
	
	// 向地图中增加图层
	var baseLayers = com.picc.map.utils.MapConstUtil.BaseLayers;
	for(var i=0; i<baseLayers.length; i++ )
	{
		var layerConfig = baseLayers[i] ;
		var layer = null;
		var layerOptions = {};
		// 根据图层类型判断不同图层
		if(layerConfig["layerType"] == "tiledcache")
		{
			layerOptions["dpi"] = 96;
			layerOptions["scales"] = [1/2000000,1/1000000,1/500000,1/200000];
		    layer = new SuperMap.Layer.SimpleCachedLayer(layerConfig["id"], layerConfig["mapUrl"], 
		    		layerConfig["layerName"], layerOptions);
		    layer.tileSize = new SuperMap.Size(256,256);	
		}
		else if(layerConfig["layerType"] == "tiled")
		{
			layerOptions["maxExtent"] = new SuperMap.Bounds(
					102.98919370546899,
					31.435825014569971,
					104.89035685110733,
					30.091620989702939);
			layerOptions["scales"] = [1/2000000,1/1000000,1/500000,1/200000];
			//layerOptions["useCanvas"] =false;
			layerOptions.viewer = new SuperMap.Size(256,256);
			layerOptions.maxResolution = "auto";
		    layer = new SuperMap.Layer.TiledDynamicRESTLayer(layerConfig["id"], layerConfig["mapUrl"], 
		    		 {transparent: false, cacheEnabled: true}, layerOptions);
		    layer.tileSize = new SuperMap.Size(256,256);			
		}
		
	    var map = this.map;
	    addLayer = function()
	    {
	    	map.addLayer(layer);
	    	map.setCenter(new SuperMap.LonLat(options["center"]["x"], options["center"]["y"]), options["level"]);
	    };
	    layer.events.on({"layerInitialized": addLayer});   
	}	
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
		return this.map.getLayer(layerId);
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
//		icon:{iconSrc:com.harmonywisdom.map.utils.MapConstUtil.MapDirLocation + "/images/default_marker.png",
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
//	var marker = new SuperMap.Marker(new SuperMap.LonLat(markerObj["point"]["x"],markerObj["point"]["y"]),icon);
//	markerLayer.addMarker(marker);
//	marker["attributes"] = attributes;
//	if(markerObj["id"])
//		marker["markerId"] = markerObj["id"];
//	else
//		marker["markerId"] = this.generateId();
//	if(typeof callback === "function")
//	{
//		// 需要考虑callback的参数
//		marker.on("click",callback);
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
			externalGraphic:com.harmonywisdom.map.utils.MapConstUtil.MapDirLocation + "/images/default_marker.png",
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
	
	var marker = new SuperMap.Feature.Vector(new SuperMap.Geometry.Point(markerObj["point"]["x"],markerObj["point"]["y"]),attributes,styleConfig);
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
	var styleConfig = this.polygonDefaultConfig["style"];
	if(polygonObj["style"])
		styleConfig = polygonObj["style"];
	var points = [];
	for(var i=0; i<polygonObj["points"].length; i++)
	{
		points.push(new SuperMap.Geometry.Point(polygonObj["points"][i]["x"],polygonObj["points"][i]["y"]));
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
	if(!polylineObj.hasOwnProperty("points") || !(polylineObj["points"].length>2))
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
		points.push(new SuperMap.Geometry.Point(polylineObj["points"][i]["x"],polylineObj["points"][i]["y"]));
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
	var textFeature = new SuperMap.Feature.Vector(new SuperMap.Geometry.Point(textObj["point"]["x"],textObj["point"]["y"]),textObj["attributes"],styleConfig);
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
		this.defaultMarkerLayer.removeAllFeatures();
		this.defaultVectorLayer.removeAllFeatures();
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
		this.removeVectorById(this.defaultVectoryLayer);
		this.removeMarkerById(this.defaultMarkerLayer);
	}
};
/**
 * 删除vector
 */
mapPrototype.removeVectorById = function(overlayId,layer)
{
	var deleteFeatures = getOverlayById(overlayId,layer);
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
mapPrototype.showOverlayInfo = function(overlayId,html,layerId)
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
		this.popup = this.addAnchoredDomElement("", centerPoint["x"], centerPoint["y"], 0, 0, html, true);
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
	var popup = new SuperMap.Popup.FramedCloud(
			id,
			new SuperMap.LonLat(x,y),
			new SuperMap.Size(width,height),
			html,
			null,
			closable);
	popup.autoSize = true;
	popup.closeOnMove = true;
	this.map.addPopup(popup);
	return popup;
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
mapPrototype.changeDragMode = function(mode,callback)
{
	this.deactiveAllDraw();
	var handlerOptions = {
			layerOptions:{
				styleMap: new SuperMap.StyleMap(     
					    new SuperMap.Style(mode["style"])
					)
			}
	};
	var vectorLayer = this.getVectorLayer();
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
	this.map.setCenter(new SuperMap.LonLat(centerX,centerY));
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
	this.map.zoomToExtent(new SuperMap.Bounds(xmin,ymin,xmax,ymax), true);
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
	this.map.panTo(new SuperMap.LonLat(x,y));
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
