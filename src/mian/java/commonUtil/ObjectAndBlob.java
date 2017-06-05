/**
 * Created by roger on 2016/12/2.
 */
package commonUtil;

import java.io.*;

/**
 * Created by roger on 2016/12/2.
 */
public class ObjectAndBlob {

    /*
     * 将对象转化成byte[]    存储在数据库里的对象形式
     * 要求 对象是序列化的
      */
    public static   byte[] ObjectToBytes(Object obj)  {
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            ObjectOutputStream outputStream = new ObjectOutputStream(out);
            outputStream.writeObject(obj);   //对象序列化的本质
            byte[] bytes = out.toByteArray();   //直接存储到数据库里  变成blob
            return bytes ;
        } catch (Exception e) {
            // TODO: handle exception

            System.out.println( " ObjectToBytes " );
            return null ;
        }
    }


    /*
    * 将序列化的直接数组 byte[] 转化成 对象 相应对象
    * 要求 对象是序列化的
     */
    public static Object BytesToObject(byte[] bytes) {
        try {
            ByteArrayInputStream bin = new ByteArrayInputStream(bytes);
            ObjectInputStream in = new ObjectInputStream(bin);
            Object obj = in.readObject();
            in.close();
            return obj;
        } catch (Exception e) {
            // TODO: handle exception
            System.out.println( " BytesToObject " );
            e.printStackTrace();
            return null ;
        }
    }

}
