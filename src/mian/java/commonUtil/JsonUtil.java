/**
 * Created by roger on 2016/12/4.
 */
package commonUtil;

import com.alibaba.fastjson.JSON;

/**
 * Created by roger on 2016/12/4.
 */
public class JsonUtil {
    public JsonUtil() {
    }
    public static String  ConvertToJSON(Object obj){
         return JSON.toJSONString(obj) ;
    }

}
