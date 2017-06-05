package example;

import org.junit.Test;

/**
 * Created by admin on 2016/3/16.
 */

public class HelloWorld  {
    public int id ;
    public String value;

    @Override
    public String toString() {
        return "HelloWorld{" +"id=" + id + ", value='" + value + '\'' +  '}';
    }

    @Test
    public  void getResult(String[] argv) {
        int m=10,n=20;
        int []a={m,n};
        System.out.println(a[0]);     //输出 10
        m =50   ;          //将a值更改了，其
        System.out.println(a[0]);
    }
}
