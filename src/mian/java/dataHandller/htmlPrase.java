/**
 * Created by roger on 2016/12/20.
 */
package dataHandller;

import org.junit.Test;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by roger on 2016/12/20.
 */
public class htmlPrase {

    //关键点：strTD为读取的文件的进度，以它的内容做判断，来获取想要的东东
    //解析一个页面的table，获取对应的字段名和汉字
    public void jspPrase(String path ) throws IOException {
        FileInputStream fis = null;
        InputStreamReader isr = null;
        BufferedReader br = null; //包装输入流
        String str = "",strTD="",tdField="";
        String value ="";
        try{
            String tdName="";
            fis = new FileInputStream(path);
            isr = new InputStreamReader(fis);             // InputStreamReader 是字节流通向字符流的桥梁,
            br = new BufferedReader(isr);                 // 从字符输入流中读取文件中的内容,封装了一个new InputStreamReader的对象
            List<String> hanzilist =new ArrayList<String>(150);
            List<String> fiedlist =new ArrayList<String>(150);
            while ((strTD = br.readLine()) != null) {
                Boolean flag = true ;
                if(strTD.indexOf("<td")!=-1 && strTD.indexOf("editor-label")!=-1 ){
                  //读取到第一个单元格
                    while((strTD = br.readLine())!= null){
                        if(strTD.indexOf(":")!=-1){
                            //读到中文名
                            tdName = strTD.substring(0,strTD.indexOf(":"));
                            //不要附件字段
                            if(tdName.indexOf("附件")!=-1){
                                flag = false ;
                                break;
                            }
                            hanzilist.add(tdName.trim());
                            break;
                        }
                    }
                }

                if(strTD.indexOf("<td")!=-1 && strTD.indexOf("editor-field")!=-1 && flag){
                    //读取到第二个单元格,且不是附件
                    while((strTD = br.readLine())!= null){
                        if(strTD.indexOf("data-container-for")!=-1){
                            //读到字段名如 comCode
                            tdField =strTD.substring(strTD.indexOf("\"")+1,strTD.lastIndexOf("\""));
                            //不要附件字段
                            if(tdField.indexOf("Card")!=-1){
                                break;
                            }

                            //如果此字段有字典，将进行加上字典 -dict
                            while ((strTD = br.readLine())!=null){
                                  if(strTD.indexOf("data-bind")!=-1){
                                      int startIndex = strTD.indexOf("source:");
                                      int endIndex =strTD.indexOf(",");
                                      String dict =strTD.substring(startIndex+7, endIndex);
                                      tdField =tdField+"-"+dict;
                                      break;
                                  }
                                //读到第二单元格的 </td>时，退出循环，说明此字段无字典
                                  if(strTD.indexOf("</td>")!=-1){
                                      break;
                                  }
                            }
                            fiedlist.add(tdField.trim());
                            break;
                        }
                    }
                }
            }
            //输出汉字
            for (int i = 0; i <hanzilist.size() ; i++) {
                System.out.print("\""+hanzilist.get(i)+"\",");
                if(i%10==0&&i!=0){
                    System.out.println();
                }
            }

            System.out.println();
            System.out.println("------------");
            for (int i = 0; i <fiedlist.size() ; i++) {
                System.out.print("\""+fiedlist.get(i)+"\",");
                if(i%10==0&&i!=0){
                    System.out.println();
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

    @Test
    public  void getTdName() throws IOException {
        htmlPrase hp = new htmlPrase();
        hp.jspPrase("C:/Users/admin/Desktop/addCOM.jsp");

    }
}
