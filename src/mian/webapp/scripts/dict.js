/**
 * Created by roger on 2016/11/10.
 *
 * 字典：  字典 code  ，字典名称 （数据数组的名称）
 *
 *数据数组 ：多个{code:code，name：name} 组成
 *
 */


 //由字典code，获取字典数组
  var dict_sex = dict.getDctionnary("code=sex");


//字典中的那么获取
function getName(dict , code){
    var name = "";
    var len = dict.length;
    for(var i = 0 ; i < len ; i++){
        if(dict[i].code == code){
            name = dict[i].name;
            break;
        }
    }
    return name;
}
