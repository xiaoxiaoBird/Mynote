/**
 * sunzuoquan
 * 检测环境，加载必须的js
 */

// 定义包结构，com.harmonywisdom.map包是地图的基础包
var com={};
com.picc = {};
com.picc.map = {};
com.picc.map.utils = {};
/**
 * 地图类型工具包
 */
com.picc.map.utils.MapConstUtil = {
	MapDirLocation:'/map',
	MapTypes:'supermap',
	BaseLayers:[
	    {
	    	id:'vectorTiledLayer',
	    	visible:true,
	    	mapUrl:'http://localhost:8090/iserver/services/map-PICC_test/rest/maps/PICC_Test1',
	    	layerType:'tiled',
	    	//layerType:'tiledcache',
	    	layerName:'PICC_Test1'
	    }
	]
};
/**
 * dom操作工具包
 */
com.picc.map.utils.DomTools = {
//	addJavascriptUrl : function(srcUrl)
//	{
//		var s = document.createElement('script');
//	    s.setAttribute('src', srcUrl);
//	    s.setAttribute('type', 'text/javascript');
//	    document.getElementsByTagName('head')[0].appendChild(s);
//	},
//	addCssUrl : function(srcUrl)
//	{
//		var s = document.createElement('link');
//	    s.setAttribute('rel', "stylesheet");
//	    s.setAttribute('href', srcUrl);
//	    s.setAttribute('type', 'text/css');
//	    document.getElementsByTagName('head')[0].appendChild(s);
//	}

	addJavascriptUrl : function(srcUrl)
	{
		document.writeln('<script type="text/javascript" src="'+srcUrl+'" > </script>');
	},
	addCssUrl : function(srcUrl)
	{
		document.writeln('<link type="text/css" rel="stylesheet" href="'+srcUrl+'" >');
	}
};

/**
 * js工具集合
 */
com.picc.JSTools={
		cloneObject:function (obj)
		{    
			var o = obj.constructor === Array ? [] : {};    
			for(var i in obj)
			{        
				if(obj.hasOwnProperty(i))
				{            
					o[i] = typeof obj[i] === "object" ? cloneObject(obj[i]) : obj[i];        
				}    
			}    
			return o;
		}
};

/**
 * 地图工具类
 */
com.picc.map.utils.MapTools = {
		/**
		 * 取圆周上的点集合
		 * @param point
		 * @param radius
		 * @return
		 */
		getCircleLinePoint : function (point,radius)
		{
			var points = [];
			for(var i=0; i<361; i=i+1)
			{
				points.push(com.picc.map.utils.MapTools.getCirclePoint(i/180*Math.PI,radius,point.x,point.y));
				points.push(com.picc.map.utils.MapTools.getCirclePoint((i+0.5)/180*Math.PI,radius,point.x,point.y));
			}
			return points;
		},
		/**
		 * 经纬度转换成米
		 */
		lonLatToMeters : function (lon,lat)
		{
			var originShift = 2 * Math.PI * 6378137/2;
			var mx = lon * originShift / 180;
			var my = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
			my=my * originShift / 180;
			return {x:mx, y:my};
		},
		/**
		 * 米转换成经纬度
		 */
		metersToLonLat : function (mx,my)
		{
			var originShift = 2 * Math.PI * 6378137/2;
			var lon =(mx / originShift) * 180.0;
			var lat =(my / originShift) * 180.0;
			lat=180 / Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180.0)) - Math.PI / 2.0);
			return {x:lon, y:lat};
		},
		/**
		 * 根据角度，获取圆形上的一个点坐标
		 * @param angle
		 * @param radius
		 * @param x
		 * @param y
		 * @return
		 */
		getCirclePoint : function(angle,radius,x,y)
		{
			var circlePointX = x+Math.cos(angle)*radius;
			var circlePointY = y + Math.sin(angle)*radius;
			var endPoint = {x:circlePointX,y:circlePointY};
			return endPoint;
		},
        /**
         * 根据角度，获取圆形上的一个点坐标
         * @param angle
         * @param radius
         * @param x
         * @param y
         * @return
         */
        getCircles : function(radius,x,y)
        {
            var points = [];
            for(var i=0; i<90; i++)
            {
                var angle = i*4/180.0*Math.PI;
                points.push(com.picc.map.utils.MapTools.getCirclePoint(angle,radius,x,y));
            }
            return points;
        },
		/**
		 * 计算线段上距离第一个点，给定百分比的点的坐标
		 */
		calPointByLineAndDistance : function(point1,point2,percent)
		{
			var returnPoint = {x:0,y:0};
			returnPoint.x = point1.x+percent*(point2.x-point1.x);
			returnPoint.y = point1.y+percent*(point2.y-point1.y);
			return returnPoint;
		},
		/**
		 * 计算两点间的距离
		 */
		calDistanceByTowPoint : function(point1,point2)
		{
			return Math.pow(Math.pow(point1.x-point2.x,2)+Math.pow(point1.y-point2.y,2),0.5);
		},
        /**
         * 计算线的长度
         * @param points
         */
        calLineLength:function(points)
        {
            var lineLength = 0;
            for(var i=0; i< points.length-1; i++)
            {
                lineLength = lineLength + com.picc.map.utils.MapTools.calDistanceByTowPoint(points[i],points[i+1]);
            }
            return lineLength;
        }
};

/**
 * 初始化必须的js包
 * @param mapLocation	地图文件位置
 * @param type 地图类型，暂时只支持supermap
 */
function init(mapLocation,maptype)
{
	com.picc.map.utils.MapConstUtil.MapDirLocation = mapLocation;
	// 判断type传入是否正确
	if(com.picc.map.utils.MapConstUtil.MapTypes.indexOf(maptype) == -1)
	{
        alert('请传入合法的type类型:'+com.picc.map.utils.MapConstUtil.MapTypes);
        return;
	}
	// 判断jquery是否加载，如果没有加载，加载默认jquery包
//	if(!(window.jQuery)) {
//		com.picc.map.utils.DomTools.addJavascriptUrl(mapLocation + '/js/jquery-1.10.2.js');
//	  }
	
	// 加载map定义
    com.picc.map.utils.DomTools.addJavascriptUrl(mapLocation + '/'+'HWMap.js');
	
	// 根据type，加载底层平台地图支持包
    com.picc.map.utils.DomTools.addJavascriptUrl(mapLocation + '/'+maptype+'.js');
};