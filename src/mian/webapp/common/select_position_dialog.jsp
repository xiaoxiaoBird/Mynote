<%@ page language="java" contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta charset="utf-8">
    <title>选择坐标Dialog</title>
</head>
<body>
<div id="selectPosition"></div>
</body>
<script type="text/javascript">
    if (!window.globalMapData){
        window.globalMapData = {};
    }
    window.globalMapData.showSelectPositionDialog= function($,hwui,callback){
        if (!window.globalMapData.selectPositionDialog){
            window.globalMapData.selectPositionDialog = $("#selectPosition").hwuiDialog({
                title:"选择坐标",
                topable:true,
                iframe:true,
                content:rootPath + '/common/select_position.jsp',
                width: 800,
                height:500,
                buttons:[
                    {
                        name:'ok',
                        text:'确定',
                        handler: function(){
                            callback(this.lat,this.lon);
                            this.close();
                        }
                    },
                    {
                        name:'cancel',
                        text:'取消',
                        handler: function(){
                            this.close();
                        }
                    }
                ]
            }).data('hwuiDialog');
            window.globalMapData.selectPositionDialog.element.find("iframe").css({height:'483px'});
        }
        window.globalMapData.selectPositionDialog.open();
        if (window.globalMapData.selectPositionDialog.markPonit) {
        	window.globalMapData.selectPositionDialog.markPonit();
        }
        
        return window.globalMapData.selectPositionDialog;
    };

</script>
</html>
