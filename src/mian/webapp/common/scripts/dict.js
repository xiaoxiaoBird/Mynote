define('dict', ['jquery'], function ($) {
    var dict = {
        dictCache:getDictCache()
    };

    /**
     * 获取最顶层的window字典码缓存
     * @param window
     * @returns {*}
     */
    function getDictCache(){
        var cacheWindow = window.top;
        if (!cacheWindow['dictCache']) {
            cacheWindow['dictCache'] = {};
        }
        return cacheWindow['dictCache'];
    }

    $.extend(dict,{
        getDctionnary : function(params){
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
        },

        getDctionnaryName : function(dic , column , code){
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
        },
        
        init: function(dictCodes){
            //获取没有缓存的字典码
            var noCacheCodes = [];
            for (var i = 0; i < arguments.length; i++) {
                var dictCode = arguments[i];
                if (typeof(dictCode) == "string" && !this.dictCache[dictCode]) {
                    noCacheCodes.push(dictCode);
                }
            }

            //加载并缓存没有缓存的字典码
            if (noCacheCodes.length > 0) {
                var params = '';
                for(var i = 0; i < noCacheCodes.length; i++) {
                    if (i != 0) {
                        params +="&"
                    }
                    params += 'code=' + noCacheCodes[i];
                }
                var that = this;
                $.ajax({
                    type:"post",
                    url:rootPath + "/S_dict_Dict_list.action",
                    data:params,
                    dataType:"json",
                    async:false,
                    success:function(data){
                        if (data instanceof Array){ //如果是数据说明只返回了一种字典码
                            that.dictCache[noCacheCodes[0]] = data;
                        }else{
                            $.extend(that.dictCache,data);
                        }

                    },
                    error:function(){
                        hwui.Msg.alert("获取字典信息，出错....");
                    }
                });
            }
            var result = {};
            for (var i = 0; i < arguments.length; i++) {
                var dictCode = arguments[i];
                if (typeof(dictCode) == "string" && this.dictCache[dictCode]) {
                    result[dictCode] = this.dictCache[dictCode];
                }
            }
            return result;
        },
        get: function (dictCode, dictItemCode) {
            var dict = this.dictCache[dictCode];
            if (!dict) {
                this.init(dictCode);
                dict = this.dictCache[dictCode];
            }

            if (dictItemCode && dict){
                for (var i = 0; i < dict.length; i++) {
                    if (dict[i].code == dictItemCode) {
                        return dict[i].name
                    }
                }
            }
            //参数如果大于1，说明取的是name,没有取到
            if (arguments.length > 1) {
                return "";
            }
            return $.extend(true,[],dict);
        }
    });

    return dict;
});