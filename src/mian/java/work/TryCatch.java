/**
 * Created by roger on 2017/4/14.
 */
package work;

import org.junit.Test;

import java.io.*;

/**
 * Created by roger on 2017/4/14.
 */

//实现AutoCloseable 的close方法可以使用新的tryCatch用法
public class TryCatch implements AutoCloseable{

    @Override
    public void close() throws Exception {
        System.out.print("关闭了资源");
    }

    //java7以前的写法
    public void oldStyle() throws IOException {
        InputStream input = null;
        try {
            input = new FileInputStream("file.txt");
            int data = input.read();
            while (data != -1) {
                System.out.print((char) data);
                data = input.read();
            }
        } finally {
            if (input != null) {
                input.close();
            }
        }
    }

    //将需要关闭的资源对象在TRY()里生成
    public void newStyle() throws IOException {
        //单个资源
        try(FileInputStream input = new FileInputStream("file.txt")) {
            int data = input.read();
            while(data != -1){
                System.out.print((char) data);
                data = input.read();
            }
        }

        //多个资源的写法
        try(FileInputStream input = new FileInputStream("file.txt");
            BufferedInputStream bis = new BufferedInputStream(input);
        ) {
            int data = bis.read();
            while(data != -1){
                System.out.print((char) data);
                data = input.read();
            }
        }
    }

    //接口实现使用示例
    @Test
    public void example() throws Exception {
        try (   TryCatch test = new TryCatch(); ){
            System.out.println("做一些事情");
        }
    }


    





}
