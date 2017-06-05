package demo.dao;

import demo.bean.Demo;
import com.harmonywisdom.framework.dao.DefaultDAO;
import org.apache.poi.ss.formula.functions.T;
import org.springframework.stereotype.Repository;

import javax.persistence.Query;
import java.util.List;

@Repository
public class DemoDAO extends DefaultDAO<Demo, String> {
    //??????sql
    public List<Object[]> getListByObjs(String sql) {
        Query query = em.createNativeQuery(sql);
        return query.getResultList();
    }

     /* *
     * 根据原生SQL查询列表
     * @param sql
     * @return*/

    public List<Demo> getListBySQL(String sql) {

        Query query = em.createNativeQuery(sql, entityClass);

        List<Demo> list = query.getResultList();

        return list;
    }

         /* *
     * 根据原生SQL查询列表
     * @param sql
     * @return*/

    public List<T> getListBySQL(String sql,Class clazz) {

        Query query = em.createNativeQuery(sql, clazz);

        List<T> list = query.getResultList();

        return list;
    }


}