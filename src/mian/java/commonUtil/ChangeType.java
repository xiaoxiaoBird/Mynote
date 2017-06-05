package commonUtil;

/**
 * Created by roger on 2017/2/20.
 */
public class ChangeType {
    public ChangeType() {
    }
    //将String型转换为Int型
    public static int stringTolnt(String intstr) {
        Integer integer;
        integer = Integer.valueOf(intstr);
        return integer.intValue();
    }
    //将Int型转换为String型
    public static String intToString(int value) {
        Integer integer = new Integer(value);
        return integer.toString();
    }
    //将String型转换为float型
    public static float stringToFloat(String floatstr) {
        Float floatee;
        floatee = Float.valueOf(floatstr);
        return floatee.floatValue();
    }
    //将float型转换为String型
    public static String floatToString(float value) {
        Float floatee = new Float(value);
        return floatee.toString();
    }

    //将String型转换为sqlDate型
    public static java.sql.Date stringToDate(String dateStr) {
        return java.sql.Date.valueOf(dateStr);
    }

    //将sqlDate型转换为String型
    public static String dateToString(java.sql.Date datee) {
        return datee.toString();
    }
}
