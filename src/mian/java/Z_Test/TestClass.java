/**
 * Created by roger on 2016/12/25.
 */
package Z_Test;

import FileUtils.ImgCompressUtil;
import org.dom4j.DocumentException;
import org.junit.Test;

import java.awt.image.BufferedImage;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * Created by roger on 2016/12/25.
 */
public class TestClass {

    @Test
    public void testParseMethod1() throws DocumentException
    {
        /*xmlPrase tc = new xmlPrase();
        tc.createXml("C:\\Users\\admin\\Desktop\\t测试");*/
        String  a ="[{\"kcmc\":\"课程2\",\"aqllxs\":\"安全\",\"sjczxs\":\"实际\",\"skjs\":\"老师\",\"xyjc\":\"选用\"}," +
                "{\"kcmc\":\"课程2\",\"aqllxs\":\"安全\",\"sjczxs\":\"实际\",\"skjs\":\"老师\",\"xyjc\":\"选用\"}]";
        a =   a.replace("kcmc", "courseName");
        a =   a.replace("aqllxs", "period");
        a =   a.replace("sjczxs", "actualPeriod");
        a =   a.replace("skjs", "teacher");
        a =   a.replace("xyjc", "textbooks");

        System.out.print(a.replace("kcmc", "courseName"));

    }



    @Test
    public void testGenerate()    {
           BufferedImage bi =  ImgCompressUtil.resize("C:\\Users\\admin\\Desktop\\1.png", 0.5);
            ImgCompressUtil.writeToFile("C:\\Users\\admin\\Desktop\\2.png",bi);

    }

    @Test
    public void Tes(){
/*
        Calendar c = Calendar.getInstance();
        c.add(Calendar.DAY_OF_YEAR, -60);
        SimpleDateFormat sdf  = new SimpleDateFormat("yyyy-MM-dd");
        String timeStr =  sdf.format(c.getTime());
        System.out.println(timeStr);


        //字符串的测试
        System.out.println( "20170101020001".substring(10));
*/



        //
        int a=1;
        System.out.println("a 非的结果是："+(1^a));


    }
}
