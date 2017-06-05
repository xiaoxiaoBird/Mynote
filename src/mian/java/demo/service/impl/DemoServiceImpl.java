package demo.service.impl;

import demo.bean.Demo;
import demo.dao.DemoDAO;
import demo.service.DemoService;
import com.harmonywisdom.framework.dao.BaseDAO;
import com.harmonywisdom.framework.service.BaseService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;
import java.util.Map;

@Service("demoService")
public class DemoServiceImpl extends BaseService<Demo, String> implements DemoService {
    @Autowired
    private DemoDAO demoDAO;

    @Override
    protected BaseDAO<Demo, String> getDAO() {
        return demoDAO;
    }

    private Map<String,String> nativeSQLMap;
    @Autowired
    @Qualifier("nativeSQLMap")
    public void setNativeSQLMap(Map<String, String> nativeSQLMap) {
        this.nativeSQLMap = nativeSQLMap;
    }

    //String dbType = nativeSQLMap.get("dbType")

    public void page(){
        long n ; StringBuffer  sql = new StringBuffer() ; String startTime ="";
        String dbType = nativeSQLMap.get("dbType");
        if("mysql".equals(dbType)){
            n = ((BigInteger) demoDAO.getListByObjs(sql.toString()).get(0)[0]).longValue();
        }
        if("oracle".equals(dbType)){
            n = ((BigDecimal) demoDAO.getListByObjs(sql.toString()).get(0)[0]).longValue();
        }
        //时间转换
        if("oracle".equals(dbType)){
            if(StringUtils.isNotBlank(startTime) && StringUtils.isNotEmpty(startTime)){
                sql.append("   and to_char(hd.fill_date,'yyyy-MM-dd') = '"+startTime+"'");
            }


        }else if("mysql".equals(dbType)){
            if(StringUtils.isNotBlank(startTime) && StringUtils.isNotEmpty(startTime)){
                    sql.append("   and date_format(hd.fill_date,'%Y-%m-%d')  = '"+startTime+"'");


            }
        }else if("gbase".equals(dbType)){
            if(StringUtils.isNotBlank(startTime) && StringUtils.isNotEmpty(startTime)){
                sql.append("   and extend(hd.fill_date,year to day)  = '"+startTime+"'");
            }
        }

    }

    public long getPatrolRecordNum (String planId){
        //使用hql语句查询
        List<Demo> list =  demoDAO.find("select entity from PatrolRecord entity where entity.planID = ?",planId);
        //hql直接条件的查询
        List<Demo> list2 =  demoDAO.find("entity.planID='"+planId+"'");
        return list.size();
    }

   /* *//**
     * 根据原生SQL查询列表
     * @param sql
     * @return
     *//*
    public List<CompanyAlertInfo> getListBySQL(String sql) {

        Query query = em.createNativeQuery(sql, entityClass);

        List<CompanyAlertInfo> list = query.getResultList();

        return list;
    }*/


}