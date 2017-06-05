/**
 * sunzuoquan
 * 定义关键地图类，所有操作依据于地图类
 */
com.picc.map.HWMap = function (divId,options)
{
	this.mapContainerId = divId;
	this.mapOptions = options;
	this.__initMap(divId,options);
};

var mapPrototype = com.picc.map.HWMap.prototype;

/**
 * 地图初始化方法，在这个方法里面构造地图	
 * @param divId
 */
mapPrototype.__initMap = function(divId,options)
{
	alert("执行类init方法");
};

/**
 * 在地图上增加矢量图层
 * @param layerId
 */
mapPrototype.addVectorLayer = function (layerId)
{
	
};
/**
 * 在地图上增加矢量图层
 * @param layerId
 */
mapPrototype.addMarkerLayer = function (layerId)
{
	
};

/**
 * 删除一个图层
 * @param layerId
 */
mapPrototype.removeLayer = function (layerId)
{
	
};

/**
 * 在地图上增加一个点
 * @param marker
 * @param callback
 * @param layerId	可以不传入
 */
mapPrototype.addMarker = function (markerObj,callback,layerId)
{
	
};

/**
 * 添加多边形
 * @param polygonObj
 * @param callback
 * @param layerId	可以不传入
 */
mapPrototype.addPolygon = function(polygonObj,callback,layerId)
{
};

/**
 * 添加线
 * @param polylineObj
 * @param callback
 * @param layerId	可以不传入
 */
mapPrototype.addPolyline = function(polylineObj,callback,layerId)
{
};


/**
 * 添加文字
 * @param textObj
 * @param callback
 * @param layerId	可以不传入
 */
mapPrototype.addText = function(textObj,callback,layerId)
{
};

/**
 * 清空标记
 * @param layerId	可以不传入
 */
mapPrototype.clearOverlays = function(layerId)
{
};

/**
 * 删除一个标记
 * @param overlayId
 * @param layerId	可以不传入
 */
mapPrototype.removeOverlayById = function(overlayId,layerId)
{
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
mapPrototype.showOverlayInfo = function(overlayId)
{
	
};

/**
 * 隐藏信息窗口
 */
mapPrototype.hideInfoWindow = function()
{
};

/**
 * 修改当前地图操作模式
 * @param mode
 * @param callback
 */
mapPrototype.changeDragMode = function(mode,callback)
{
};

/**
 * 中心对焦
 * @param centerX
 * @param centerY
 * @param level
 */
mapPrototype.panByPointAndLevel = function(centerX,centerY,level)
{
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
};

/**
 * 缩放到指定等级
 * @param level
 */
mapPrototype.zoomToLevel = function(level)
{
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
