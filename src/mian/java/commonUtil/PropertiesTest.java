/**
 * Created by roger on 2017/2/27.
 */
package commonUtil;

import org.junit.Test;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Properties;

/**
 * Created by roger on 2017/2/27.
 */
public class PropertiesTest {
    public Properties properties = new Properties();
    String path =properties.getClass().getResource("/").getPath();

    //如何装载properties文件并列出它当前的一组键和值。
    @Test
    public void loadproperTest() {
        try {
            properties.load(new FileInputStream(path+"/test.properties"));//加载属性文件
            properties.list(System.out);//将属性文件中的键值对儿打印到控制台
            properties.getProperty("foo");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    //如何装载XML版本的属性文件并列出它当前的一组键和值。（只有装载方法有差异，其余完全相同load(),loadFromXML()）
    @Test
    public void loadFromXMLTest(){
        try {
            properties.loadFromXML(new FileInputStream(path + "test.xml"));//加载属性文件
            properties.list(System.out);//将属性文件中的键值对儿打印到控制台
           System.out.print(properties.getProperty("thee"));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    //如何将文件保存到属性文件中？
    @Test
    public void storeFiel() throws IOException {
        Properties prop = new Properties();
        prop.setProperty("one-two", "buckle my shoe");
        prop.setProperty("three-four", "shut the door");
        prop.setProperty("five-six", "pick up sticks");
        prop.setProperty("seven-eight", "lay them straight");
        prop.setProperty("nine-ten", "a big, fat hen");
        //后面的参数是prop对象的comment的值
        prop.storeToXML(new FileOutputStream(path + "/test.xml"), "保存到xml中");//将键值对儿保存到test.xml文件中
        prop.store(new FileOutputStream(path +"/test.properties"),"保存到properties文件中");//将键值对儿保存到/test.properties文件中
    }

   /*
   *Properties获取数据乱码解决
   *
   *原因:Properties调用load(InputStream)时，读取文件时使用的默认编码为ISO-8859-1；
    当我们将中文放入到properties文件中，通过getProperty(key)获取值时，取到得数据是ISO-8859-1格式的，但是ISO-8859-1是不能识别中文的。
   *
   *
   * 通过getProperty()获取的数据data既然是ISO-8859-1编码的，就通过data.getByte(“iso-8859-1”)获取获取，
使用new String(data.getByte(“iso-8859-1”),”UTF-8”)进行转换。当然properties文件的编码类型需要和new String(Byte[],charset)中的第二个参数的编码类型相同。
   * */
}
