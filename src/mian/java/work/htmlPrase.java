/**
 * Created by roger on 2016/12/20.
 */
package work;

import org.junit.Test;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by roger on 2016/12/20.
 */
public class htmlPrase {

    //关键点：strTD为读取的文件的进度，以它的内容做判断，来获取想要的东东

    public void jspPrase(String path ) throws IOException {
        FileInputStream fis = null;
        InputStreamReader isr = null;
        BufferedReader br = null; //包装输入流
        String str = "",strTD="",tdField="";
        String value ="";
        try{

            fis = new FileInputStream(path);
            isr = new InputStreamReader(fis);             // InputStreamReader 是字节流通向字符流的桥梁,
            br = new BufferedReader(isr);                 // 从字符输入流中读取文件中的内容,封装了一个new InputStreamReader的对象
            List<String> hanzilist =new ArrayList<String>(150);
            while ((strTD = br.readLine()) != null) {

                if(strTD.indexOf("<div")!=-1 && strTD.indexOf("class=\"inputname\"")!=-1 ){
                    String tdName="";
                  //读取到第一个单元格
                    while((strTD = br.readLine().trim())!= null){
                        if("</div>".equals(strTD)){
                            hanzilist.add(tdName);
                            break;
                        }
                            tdName = tdName+strTD;
                    }
                }


            }
            //输出汉字
            for (int i = 0; i <hanzilist.size() ; i++) {
                System.out.print("\""+hanzilist.get(i)+"\",");

            }

            System.out.println("------------");

        } catch (FileNotFoundException e) {
            System.out.println("找不到指定文件");
        } catch (IOException e) {
            System.out.println("读取文件失败");
        } finally {
            br.close();
            isr.close();
            fis.close();
        }
    }

    @Test
    public  void Test() throws IOException {
        htmlPrase hp = new htmlPrase();
        hp.jspPrase("D:\\Ideal_Space\\tjsecurity\\src\\main\\webapp\\gov\\model\\uvce.jsp");

    }
}
