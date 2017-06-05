
//写一个属性名替换的工具JS方法

function changeJsonName(obj ,mapObj) {
    var objStr = JSON.stringify(obj);
    for(var key in mapObj){
        obj.replace(/key/g,mapObj.key);
    }
    return JSON.parse(objStr);
}
