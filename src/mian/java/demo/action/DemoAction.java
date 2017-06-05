package demo.action;

import attachment.service.AttachmentService;
import com.harmonywisdom.framework.dao.*;
import demo.bean.Demo;
import demo.service.DemoService;
import com.harmonywisdom.framework.action.BaseAction;
import com.harmonywisdom.framework.service.annotation.AutoService;
import com.hazelcast.util.StringUtil;
import org.apache.commons.lang.StringUtils;

public class DemoAction extends BaseAction<Demo, DemoService> {
    @AutoService
    private DemoService demoService;

    @AutoService
    private AttachmentService attachmentService;


    @Override
    protected DemoService getService() {
        return demoService;
    }


    public void CheckStatuschange() {
        String id = request.getParameter("id");
        String status = request.getParameter("status");
        entity = demoService.findById(id);
        entity.setCheckStatus(status);
        demoService.update(entity);
        write("{\"state\":\"successful\"}"); //JSON.toJSONString("success")
    }

    /*
     *  查询方法
     */

    protected QueryCondition getQueryCondition() {
        QueryParam param = new QueryParam();
        if (StringUtils.isNotBlank(entity.getTaskId())) {
            param.andParam(new QueryParam("taskId", QueryOperator.EQ, entity.getTaskId()));
        }
        if (StringUtils.isNotBlank(entity.getCheckStatus())) {
            param.andParam(new QueryParam("CheckStatus", QueryOperator.NE, entity.getCheckStatus()));
        }
        QueryCondition condition = new QueryCondition();
        if (param.getField() != null) {
            condition.setParam(param);
        }
        String rqstartTime=request.getParameter("startTime");
      /*  if(org.apache.commons.lang3.StringUtils.isNotBlank(rqstartTime)){
            Date startTime=DateTypeConverter.strToDate(rqstartTime, "yyyy-MM-dd");
            param.andParam(new QueryParam("treatDate", QueryOperator.GE,startTime));
        }
        String rqendTime=request.getParameter("endTime");
        if(org.apache.commons.lang3.StringUtils.isNotBlank(rqendTime)){
            Date endTime= DateTypeConverter.strToDate(rqendTime, "yyyy-MM-dd", 1);
            param.andParam(new QueryParam("treatDate", QueryOperator.LT, endTime));
        }*/
        condition.setDirection(getDirection());
        condition.setOrderBy("uploadTime", Direction.DESC);
        condition.setPaging(getPaging());

      //  QueryResult<TrainingPlan> result = trainingPlanService.find(qc);
        return condition;
    }


     @Override
	    public void save() {
			 //获取删除的附件IDS
	  		String removeId = request.getParameter("removeId");
	  		if(!StringUtil.isNullOrEmpty(removeId)){
	  			String[] removeIds = removeId.split(",");
	  			//删除附件
	      		attachmentService.removeByIds(removeIds);
	  		}
	  		String id = demoService.saveOrUpdate(entity);

	        if (!"".equals(entity.getAttamchmentid()) && entity.getAttamchmentid() != null){
	        	attachmentService.updateBusinessId(entity.getId(),entity.getAttamchmentid());
            }

	        write(true, "id", id);
	    }
	 @Override
	 public void delete() {
		 String deleteId = request.getParameter("deletedId");
		 if(!StringUtil.isNullOrEmpty(deleteId)){
             String[] deleteIds = deleteId.split(",");
	      		attachmentService.removeByBusinessIds(deleteIds);
	  		}
			super.delete();
		}

}