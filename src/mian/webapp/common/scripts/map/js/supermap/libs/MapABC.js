/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/Layer/CanvasLayer.js
 */

/**
 * Class: SuperMap.Layer.MapABC
 *    ��ͼ����Է��� MapABC �ĵ�ͼ����
 *
 * Inherits from:
 *  - <SuperMap.Layer.CanvasLayer>
 */
SuperMap.Layer.MapABC = SuperMap.Class(SuperMap.CanvasLayer, {

    /**
     * APIProperty: name
     * {String}ͼ�����ƣ�Ĭ��Ϊ��MapABC������ֹ��ʼ��ʱδ����ͼ����
     *
     */
    name: "MapABC",

    /**
     * Property: url
     * {String}Ĭ�ϵ�MapABC�ķ�������ַ������ҪҪ�û�����
     */
    //url: "http://emap${a}.mapabc.com/mapabc/maptile?v=w2.61&&x=${x}&y=${y}&z=${z}",
    url: "http://10.133.210.7:25002/maptile-service/maptile?x=${x}&y=${y}&z=${z}",


    /**
     * Constructor: SuperMap.Layer.MapABC
     * ����MapABCͼ�㣬�������MapABC��ͼ
     * Example:
     * (code)
     *
     * var layer = new SuperMap.Layer.MapABC("MyName");
     * //��Layerͼ����ص�Map������
     * map.addLayer(layer);
     * //��ͼ��map.setCenter������ʾ��ͼ
     * //MapABCͼ��Ĭ��Ϊī����ͶӰ�����Զ�λ��Ҫת��
     * map.setCenter(
     *  new SuperMap.LonLat(110,39.5 ).transform(
     *  new SuperMap.Projection("EPSG:4326"),
     *  map.getProjectionObject()
     *  ), 4
     *  );
     *
     * (end)
     *
     *
     * Parameters:
     * name - {String} ͼ������
     */
    initialize: function(name) {
        //debugger
        this.name = name;
        //����Ϊī����ͶӰ
        var options = {

            projection: "EPSG:900913",
            numZoomLevels: 18
            //maxZoomLevel:3,


        };
        /* var minX = -20037508.34;
        var minY = -20037508.34;
        var maxX = 20037508.34;
        var maxY = 20037508.34;

        var options = {
            maxExtent: new SuperMap.Bounds(
                minX, minY, maxX, maxY
            ),
            projection: "EPSG:900913",
             resolutions: [19567.87923828125, 9783.939619140625, 4891.9698095703125, 
            2445.9849047851562, 1222.9924523925781, 611.4962261962891, 305.74811309814453,
            152.87405654907226,76.43702827453613,38.218514137268066,19.109257068634033,
            9.554628534317016,4.777314267158508,2.388657133579254,1.194328566789627]
            //numZoomLevels: 19,
        };*/



        SuperMap.CanvasLayer.prototype.initialize.apply(this, [name, this.url, {},
            options
        ]);

    },

    /**
     * Method: clone
     */
    clone: function(obj) {
        if (obj == null) {
            obj = new SuperMap.Layer.MapABC(
                this.name);
        }
        obj = SuperMap.CanvasLayer.prototype.clone.apply(this, [obj]);
        return obj;
    },

    /**
     * APIMethod: destroy
     * �⹹MapABC�࣬�ͷ���Դ��
     */
    destroy: function() {
        var me = this;
        me.name = null;
        me.url = null;
        SuperMap.CanvasLayer.prototype.destroy.apply(me, arguments);
    },
    /**
     * Method: getTileUrl
     * ��ȡ��Ƭ��URL��
     *
     * Parameters:
     * xyz - {Object} һ���ֵ�ԣ���ʾ��ƬX, Y, Z�����ϵ�������
     *
     * Returns
     * {String} ��Ƭ�� URL ��
     */
    getTileUrl: function(xyz) {
        var me = this,
            url;
        url = me.url;
        url = SuperMap.String.format(url, {
            //a: xyz.x%4,
            x: xyz.x,
            y: xyz.y,
            z: xyz.z
        });
        return url;
    },

    CLASS_NAME: "SuperMap.Layer.MapABC"
});