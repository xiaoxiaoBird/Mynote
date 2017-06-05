/**
 * Created by roger on 2016/12/26.
 */
package work;


/**
 * Created by roger on 2016/12/26.
 */
public class modelGridTemplate {
    //打印输出页面的template
    //参数为所有String 数组，
    //type ：0 无数据绑定 1 有数据绑定 默认text
    public void print(String title ,String Templateid,String[] strs ,String[] strName,String type  ){
        System.out.println("<%@ page language=\"java\" pageEncoding=\"UTF-8\"%>");
        System.out.println("<!DOCTYPE html>");
        System.out.println("<html>");
        System.out.println("<head>");
        System.out.println("\t<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\" />");
        System.out.println("\t<meta charset=\"utf-8\">");
        System.out.println("\t<title>"+title+"</title>");
        System.out.println("\t<jsp:include page=\"/common/common.jsp\" flush=\"true\"/>");
        System.out.println("\t<script type=\"text/javascript\" src=\"${pageContext.request.contextPath}/common/scripts/dictionary.js\"></script>");
        System.out.println("\t<script type=\"text/javascript\" src=\"scripts/"+Templateid+".js\"></script>");


        System.out.println("<body>");
        System.out.println("<div class=\"k-edit-form-container\">");
        System.out.println("<form id=\""+Templateid+"\">");
        System.out.println("    <!-- 表格Template -->");
        System.out.println("\t\t<table width=\"100%\">");
        for (int i = 0; i <strs.length ; i+=2) {
            //第一个表格
            System.out.println("\t\t\t<tr>");
            System.out.println("\t\t\t\t<td class=\"editor-label\">");
            System.out.println("\t\t\t\t\t <label for=\""+strs[i]+"\">"+strName[i]+":<span class=\"k-required\">*</span></label>");
            System.out.println("\t\t\t\t</td>");
            System.out.println("\t\t\t\t<td class=\"editor-field\">");
            if(strs[i].indexOf("-1")==-1){
                System.out.println("\t\t\t\t\t <div data-container-for=\""+strs[i]+"\" >");
                System.out.println("\t\t\t\t\t\t<input class=\"k-input k-textbox\"");
                System.out.println("\t\t\t\t\t\t  type=\"text\" id=\""+strs[i]+"\" name=\""+strs[i]+"\"  required=\"true\" data-required-msg=\"不能为空\" />");
                System.out.println("\t\t\t\t\t </div>");
            }else{
                strs[i] = strs[i].split("-")[0];
                System.out.println("\t\t\t\t\t <div data-container-for=\""+strs[i]+"\" >");
                System.out.println("\t\t\t\t\t\t<select required=\"true\" name=\""+strs[i]+"\" data-option-label=\"请选择...\" data-role=\"dropdownlist\" id=\""+strs[i]+"\"");
                System.out.println("\t\t\t\t\t\t  data-text-field=\"name\" data-value-primitive=\"true\" ");
                System.out.println("\t\t\t\t\t\t   data-value-field=\"code\" data-bind=\"source:"+strs[i]+"Dict,value: "+strs[i]+"\"></select>");
                System.out.println("\t\t\t\t\t </div>");
            }
            System.out.println("\t\t\t\t</td>");
            System.out.println("  ");
            //第二个表格
            if(i+1<strs.length){
                System.out.println("\t\t\t\t<td class=\"editor-label\">");
                System.out.println("\t\t\t\t\t <label for=\""+strs[i+1]+"\">"+strName[i+1]+":<span class=\"k-required\">*</span></label>");
                System.out.println("\t\t\t\t</td>");
                System.out.println("\t\t\t\t<td class=\"editor-field\">");
                if(strs[i+1].indexOf("-1")==-1){
                    System.out.println("\t\t\t\t\t <div data-container-for=\""+strs[i+1]+"\" >");
                    System.out.println("\t\t\t\t\t\t<input class=\"k-input k-textbox\"");
                    System.out.println("\t\t\t\t\t\t  type=\"text\" id=\""+strs[i+1]+"\" name=\""+strs[i+1]+"\"  required=\"true\" data-required-msg=\"不能为空\" />");
                    System.out.println("\t\t\t\t\t </div>");
                }else{
                    strs[i] = strs[i].split("-")[0];
                    System.out.println("\t\t\t\t\t <div data-container-for=\""+strs[i+1]+"\" >");
                    System.out.println("\t\t\t\t\t\t<select required=\"true\" name=\""+strs[i+1]+"\" data-option-label=\"请选择...\" data-role=\"dropdownlist\" id=\""+strs[i+1]+"\"");
                    System.out.println("\t\t\t\t\t\t  data-text-field=\"name\" data-value-primitive=\"true\" ");
                    System.out.println("\t\t\t\t\t\t   data-value-field=\"code\" data-bind=\"source:"+strs[i+1]+"Dict,value: "+strs[i+1]+"\"></select>");
                    System.out.println("\t\t\t\t\t </div>");
                }
                System.out.println("\t\t\t\t</td>");
            }
            System.out.println("\t\t\t</tr>");
        }
        System.out.println("\t\t</table>");
        System.out.println("</form>");
        System.out.println("</div>");
        System.out.println("</body>");
        System.out.println("</html>");
    }

    // 调用方法
    public static void main(String[] args) {
        modelGridTemplate template = new modelGridTemplate();
        //参数设置
        String title ="模拟结果展示";
        String Templateid = "result";
        String[] strs =new String[]{"r1","n1","r2","n2","r3","n3","s1","s2","r4","modelType","remark"};
        String[] strName =new String[]{"死亡半径","伤亡人数","重伤半径","重伤人数","轻伤半径","轻伤半径","直接财产损失","间接财产损失","人员安全半径","模型类型","备注"};
        String type ="0";
        template.print(title,Templateid,strs,strName,type);
    }
}
