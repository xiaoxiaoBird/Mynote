hwui().require("message",function($, hwui) {
	
	$.fn.getDctionnary = function(params){
		var dictionaryData = "";
		$.ajax({
            type:"post",
            url:rootPath + "/S_dict_Dict_list.action",
            data:params,
            dataType:"json",
            async:false,
            success:function(data){
            	dictionaryData = data;
            },
            error:function(){
            	hwui.Msg.alert("获取字典信息，出错....");
            }
        });
		return dictionaryData;
	};
	
	$.fn.getDctionnaryName = function(dic , column , code){
		var name = "";
		var obj = dic[column];
		var len = obj.length;		
		for(var i = 0 ; i < len ; i++){
			if(obj[i].code == code){
				name = obj[i].name;
				break;
			}
		}
		return name;
	};
	
});