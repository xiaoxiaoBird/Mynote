/**
 * Created by roger on 2016/12/20.
 */
package work;

import org.junit.Test;

/**
 * Created by roger on 2016/12/20.
 * 用于生成bean
 */
public class newJavaBeanUtil {
    //给定字符串的数组，输出bean的属性
    public void print(String[] strs ){
        for (int i = 0; i <strs.length ; i++) {
            System.out.println("@Column(name = \""+this.getColumn(strs[i])+"\",length = "+0+")");
            System.out.println("private String "+strs[i]+";");
            System.out.println();
        }
    }

    //将字符串的大小写 全部转换为大写 ，且用“_”连接
    public String getColumn(String str ){
        String  Column = "";
        int m  = 0; //截断容器标记
        for (int i = 0; i < str.length(); i++) {
            char c=str.charAt(i);
            int k=(int)c;
            if((k>=65&&k<=90)){
                Column = Column+str.substring(m,i).toUpperCase()+"_" ;  //将小写部分获取到
                m = i ;
            };
        }
        Column = Column +str.substring(m,str.length()).toUpperCase();
        return Column ;
    }


    //使用测试
    @Test
    public void testGenerate()    {
        newJavaBeanUtil util = new newJavaBeanUtil();
        String[] strs = new String[]{"id","examId","name","exWorkType","exWorkName","examCard","idCard","examineAddr","examineNum","exDate"};
        util.print(strs);

    }



}
