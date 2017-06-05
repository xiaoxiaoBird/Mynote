/**
 * Created by roger on 2016/12/3.
 */
package demo.bean;

import org.junit.Test;

import javax.persistence.Column;
import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Date;

/**
 * Created by roger on 2016/12/3.
 */
public class User {
    private String name;
    private int age;
    private String passport;
    private Date birth;

    // columnDefinition的使用示例
    @Column(name = "FIELD",columnDefinition = "text")
    private String field;


    //getters and setters, constructor


    public User() {
    }

    public User(String name, int age, String passport) {
        this.name = name;
        this.age = age;
        this.passport = passport;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassport() {
        return passport;
    }

    public void setPassport(String passport) {
        this.passport = passport;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public Date getBirth() {
        return birth;
    }

    public void setBirth(Date birth) {
        this.birth = birth;
    }

    //自定义对象相等的条件
    @Override
    public boolean equals(Object o) {

        if (o == this) return true;
        if (!(o instanceof User)) {
            return false;
        }

        User user = (User) o;

        return user.name.equals(name) &&
                user.age == age &&
                user.passport.equals(passport);
    }

    //自定义哈希code
    @Override
    public int hashCode() {
        int result = 17;
        result = 31 * result + name.hashCode();
        result = 31 * result + age;
        result = 31 * result + passport.hashCode();
        return result;
    }

    @Test
    public  void reflect() throws IntrospectionException, InvocationTargetException, IllegalAccessException {

        User user =new User(null,18,"123456");
        user.setBirth(new Date());
        Class clazz = user.getClass();
        //获取某一个字段的 对象
        PropertyDescriptor pd = new PropertyDescriptor("name",clazz);
        //读的方法
        Method getMethod = pd.getReadMethod();
        //通过clazz，字段名，获取字段值
        System.out.println(getMethod.invoke(user));

        //写的方法
        Method writeMethod = pd.getWriteMethod();
        //通过clazz，字段名，重新写字段值
        System.out.println(writeMethod.invoke(user, "李四"));

        //类型
        Class type = pd.getPropertyType();
        System.out.println(type.getSimpleName());

        //获取某一个字段的 对象
        PropertyDescriptor pd2 = new PropertyDescriptor("birth",clazz);
        Class time=   pd2.getPropertyType();
        System.out.println(time.getSimpleName());

    }
}
