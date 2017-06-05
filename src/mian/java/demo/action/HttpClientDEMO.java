package demo.action;

/**
 * Created by roger on 2016/4/29.
 */
public class HttpClientDEMO {

    //访问其他应用的方法调取结果
 /*
      供市级调用查询当前ip的区县的日报统计,默认为昨天的日报统计
     */
/*

    public void  findReportNum(){
        String number = "0";
        String  startTime = request.getParameter("startTime");
        PersonUtil person=new PersonUtil();
        String organCode=person.getValue("organCode");
        List<DailyDTO> dailyDTO = companyInfoService.getCompanyCount(startTime, organCode, "district", "02");
        if(dailyDTO.size()!=0){
            number = dailyDTO.get(0).getReportedNum()+"";
        }
        write(number) ;
    }

    */
/*
    统计市级的日报情况和区县的情况,默认昨天的日报情况
     *//*

    public  void reportSuitation(){
        List<CityDistrictVO> cdvo = new ArrayList<CityDistrictVO>(20);
        String  startTime = request.getParameter("startTime");
        //DailyDTO的reportedNum,districtId有用
        List<DailyDTO> dailyDTO = companyInfoService.getCompanyCount(startTime, "120000000", "city", "02");
        PersonUtil person=new PersonUtil();
        //遍历区县取值
        List<Organ> organs = organService.findByOrganLevel("district");
        for(Organ og :organs ){
            String cityNum ="0";
            for(int i=0;i<dailyDTO.size();i++){
                if(og.getOrganCode().equals(dailyDTO.get(i).getDistrictId())){
                    cityNum = dailyDTO.get(i).getReportedNum()+"";
                }
            }
            String url	=  person.getValue("districtServer_"+og.getOrganCode());
            if(!StringUtils.isNotBlank(url)){continue;}
            url+="/action/S_information_DailyMaster_findReportNum.action?startTime="+startTime;
            String offLineRemindData = "";
            HttpClient httpClient = new HttpClient();
            GetMethod getMethod = new GetMethod(url);
            getMethod.getParams().setParameter(HttpMethodParams.RETRY_HANDLER, new DefaultHttpMethodRetryHandler());
            try {
                // 执行getMethod
                int statusCode = httpClient.executeMethod(getMethod);
                if (statusCode != HttpStatus.SC_OK) {
                    System.err.println("Method failed: " + getMethod.getStatusLine());
                }
                // 处理内容
                offLineRemindData = getMethod.getResponseBodyAsString();
            } catch (HttpException e) {
                // 发生致命的异常，可能是协议不对或者返回的内容有问题
                e.printStackTrace();
            } catch (IOException e) {
                // 发生网络异常
                e.printStackTrace();
            } finally {
                // 释放连接
                getMethod.releaseConnection();
            }
            CityDistrictVO dat = new CityDistrictVO();
            dat.setOrganName(og.getOrganName());
            dat.setOrganCode(og.getOrganCode());
            dat.setDistrictNum(offLineRemindData);
            dat.setCityNum(cityNum);
            String diff = Integer.valueOf(dat.getCityNum())-Integer.valueOf(dat.getDistrictNum())+"";
            dat.setDifference(diff);
            cdvo.add(dat);
        }
        write(cdvo);
    }
*/
}
