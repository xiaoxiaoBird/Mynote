
package example;


import java.io.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by roger on 2016/12/13.
 */
public class a_productCoding {

        //从指定的bean路径中获取所有de字段
        //将一个bean.java文件的使用流的形式解析，其实可以使用反射实现
    public void getFieldFromBean() throws IOException {
        FileInputStream fis = null;
        InputStreamReader isr = null;
        BufferedReader br = null; //包装输入流
        String str = "",value ="";
        try{
            fis = new FileInputStream("D:/Ideal_Space/yiyao_group/tjmedicine/src/main/java/com/harmonywisdom/medicine/company/bean/CompanyInfo.java");
            isr = new InputStreamReader(fis);             // InputStreamReader 是字节流通向字符流的桥梁,
            br = new BufferedReader(isr);                 // 从字符输入流中读取文件中的内容,封装了一个new InputStreamReader的对象
            List<String> beanlist =new ArrayList<String>(120);
            while ((str = br.readLine()) != null) {
                if(str.indexOf("String")!=-1 ||str.indexOf("Date")!=-1){
                    value = str.substring(str.lastIndexOf(" ")+1,str.lastIndexOf(";"));
                    System.out.print(value+" ");
              /*      beanlist.add(value.trim());*/
                }
            }


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



    public  void beanPrase(String[] argv) throws Exception {
        a_productCoding coding = new a_productCoding();
    }
}
