package Jdbc; /**
 * Created by roger on 2016/10/18.
 */

import commonUtil.ObjectAndBlob;
import demo.bean.Demo;

import java.sql.*;

/**
 * Created by roger on 2016/10/18.
 */
public class Jdbc {
    /**
     * 加载驱动
     * */
    static {
        try {
            Class.forName("com.mysql.jdbc.Driver");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 获取数据库连接
     * */
    public static Connection getConnection() {
        String url = "jdbc:mysql://127.0.0.1/test_qy?zeroDateTimeBehavior=convertToNull&autoReconnect=true&useUnicode=true&characterEncoding=utf8";
        String username = "root";
        String password = "Passw0rd";
        Connection con = null;
        try {
            con = DriverManager.getConnection(url, username, password);
            con.setAutoCommit(true);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return con;
    }

       /**
     * 数据库出来的Bolb变成对象
     * */
    public static void baseOutObject() {
        Connection con = getConnection();
        PreparedStatement ps = null;
        Statement st = null;
        ResultSet rs = null;
        Demo demo = new Demo();
        demo.setCheckStatus("1");
        demo.setAttamchmentid("123");
        try {
            String sql2 = "select *  from aa where id ='402881f2524e33da01524eb039510001'";
            st = con.createStatement();
            rs =   st.executeQuery(sql2);
            while (rs.next()){
                byte[] job =  rs.getBytes("BUS_LICENSE_NUM");  //出来的是bytes[]
                Object obj = ObjectAndBlob.BytesToObject(job);
                System.out.print((Demo)obj);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            close(rs, ps, con);
        }
    }


    /*
        对象存储到库里 变成Blob
     */
    public static void ObjectIntoBASE(){
        Connection con = getConnection();
        PreparedStatement ps = null;
        Statement st =null;
        ResultSet rs = null;

        try {
            Demo demo = new Demo();
            demo.setCheckStatus("1");
            demo.setAttamchmentid("123");

            String sql = "INSERT INTO aa VALUES ('402881f2524e33da01524eb039510001',? )";
            st = con.prepareStatement(sql);
            ps.setObject(1,demo);  //主要是这个步骤
            ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            close(rs, ps, con);
        }
    }

    /**
     * 处理返回结果集
     * */
    public static void printResultSet(ResultSet rs) {
        if (rs == null) {
            return;
        }
        try {
            ResultSetMetaData meta = rs.getMetaData();
            int cols = meta.getColumnCount();
            StringBuffer b = new StringBuffer();
            while (rs.next()) {
                for (int i = 1; i <= cols; i++) {
                    b.append(meta.getColumnName(i) + "=");
                    b.append(rs.getString(i) + "/t");
                }
                b.append("/n");
            }
            System.out.print(b.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 关闭连接
     * */
    public static void close(ResultSet rs, Statement stm, Connection con) {
        try {
            if (rs != null) {
                rs.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        try {
            if (stm != null) {
                stm.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        try {
            if (con != null) {
                con.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }



}
