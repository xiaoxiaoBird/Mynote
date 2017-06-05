/**
 * Created by roger on 2016/12/18.
 */
package work;


/**
 * Created by roger on 2016/12/18.
 */
public class newGridTemplate {
    //打印输出页面的template
    //参数为所有String 数组，
    //type ：0 无数据绑定 1 有数据绑定 默认text
    public void print(String Templateid,String[] strs ,String type  ){
        System.out.println("<%@ page language=\"java\" pageEncoding=\"UTF-8\"%>");
        System.out.println("<script type=\"text/hwui-template\" id=\""+Templateid+"\">");
        System.out.println("    <!-- 表格Template -->");
        System.out.println("\t\t<table width=\"100%\">");
        for (int i = 0; i <strs.length ; i+=2) {
            //第一个表格
            System.out.println("\t\t\t<tr>");
            System.out.println("\t\t\t\t<td class=\"editor-label\">");
            System.out.println("\t\t\t\t\t <label for=\""+strs[i]+"\">XXXXX:</label>");
            System.out.println("\t\t\t\t</td>");
            System.out.println("\t\t\t\t<td class=\"editor-field\">");
            if("0".equals(type)){
                System.out.println("\t\t\t\t\t <div data-container-for=\""+strs[i]+"\" ></div>");
            }else{
                System.out.println("\t\t\t\t\t <div data-container-for=\""+strs[i]+"\" data-bind=\"text:"+strs[i]+"\" ></div>");
            }
            System.out.println("\t\t\t\t</td>");
            System.out.println("  ");
            //第二个表格
            if(i+1<=strs.length){
                System.out.println("\t\t\t\t<td class=\"editor-label\">");
                System.out.println("\t\t\t\t\t <label for=\""+strs[i+1]+"\">XXXXX:</label>");
                System.out.println("\t\t\t\t</td>");
                System.out.println("\t\t\t\t<td class=\"editor-field\">");
                if("0".equals(type)){
                    System.out.println("\t\t\t\t\t <div data-container-for=\""+strs[i+1]+"\" ></div>");
                }else{
                    System.out.println("\t\t\t\t\t <div data-container-for=\""+strs[i+1]+"\" data-bind=\"text:"+strs[i+1]+"\" ></div>");
                }
                System.out.println("\t\t\t\t</td>");
            }
            System.out.println("\t\t\t</tr>");
        }
        System.out.println("\t\t</table>");
        System.out.println("</script>");
    }

    // 调用方法
    public static void main(String[] args) {
        newGridTemplate template = new newGridTemplate();
        //参数设置
        String Templateid = "chemicalsTemplate";
        String[] strs =new String[]{"state","chemicalsName","casNum","unNum","riskClass","productType","hazardProcess","physicalState","workTempreture","wordPressure","stock","unitStock","criticalMass","inventory","ratedCapacity","unitOfMeasurement"};
        String type ="0";
        template.print(Templateid,strs,type);
    }
}
