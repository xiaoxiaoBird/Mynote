/**
 * Created by roger on 2016/12/4.
 */
package commonUtil;

import java.io.*;

/**
 * Created by roger on 2016/12/4.
 */
public class readKeyWord {
    public readKeyWord() {
    }
    //从指定的文件中获取、关键字获取此文本的所有的值， keyword= "Value"
    //参数  path：文本路径     ,keyword :"="前的单词
    public void getField(String path, String keyWord) throws IOException {
        File filePath = new File(path);
        FileInputStream fis = null;
        InputStreamReader isr = null;
        BufferedReader br = null; //包装输入流
        String str = "",value ="";
        try{
            fis = new FileInputStream(filePath);
            isr = new InputStreamReader(fis);             // InputStreamReader 是字节流通向字符流的桥梁,
            br = new BufferedReader(isr);                 // 从字符输入流中读取文件中的内容,封装了一个new InputStreamReader的对象
            while ((str = br.readLine()) != null) {
                if(str.indexOf(keyWord)!=-1){
                    //截取引号之间的值
                    value = str.substring(str.indexOf("\"")+1,str.lastIndexOf("\""));
                    System.out.print(value + ",");
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
}
