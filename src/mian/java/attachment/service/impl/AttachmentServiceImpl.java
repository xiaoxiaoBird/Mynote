package attachment.service.impl;

import attachment.bean.Attachment;
import attachment.dao.AttachmentDAO;
import attachment.service.AttachmentService;
import com.harmonywisdom.framework.dao.BaseDAO;
import com.harmonywisdom.framework.exception.ServiceException;
import com.harmonywisdom.framework.service.BaseService;
import com.harmonywisdom.framework.utils.UUIDGenerator;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Service("attachmentService")
public class AttachmentServiceImpl extends BaseService<Attachment, String> implements AttachmentService {
	
	
   private AttachmentConfigManager configManager = AttachmentConfigManager.getInstance();
	
    @Autowired
    private AttachmentDAO attachmentDAO;

    @Override
    protected BaseDAO<Attachment, String> getDAO() {
        return attachmentDAO;
    }

    @Override
    public byte[] download(String id) throws ServiceException {
        Attachment entity = attachmentDAO.findById(id);
        return entity.getData();
    }

    @Override
    public List<Attachment> getByBusinessId(String bussinessId) throws ServiceException {
        return attachmentDAO.find("entity.businessId = ?1", bussinessId);
    }

    @Override
    public List<Attachment> getByBusinessIdAndType(String bussinessId, String attachmentType) throws ServiceException {
        return attachmentDAO.find("entity.businessId = ?1 and entity.attachmentType = ?2", bussinessId, attachmentType);
    }
    
    @Override
    public void updateBusinessId(String businessId, String... ids) throws ServiceException {
        attachmentDAO.executeJPQL("update Attachment entity set entity.businessId = ?1 where entity.id in ?2", businessId, Arrays.asList(ids));
    }

    @Override
    public void removeByBusinessIds(String... businessIds) {
        for (String businessId : businessIds) {
            List<Attachment> attachments = getByBusinessId(businessId);

            for (Attachment attachment : attachments) {
                File f = new File(attachment.getPath());    // 输入要删除的文件位置
                if (f.exists()) {
                    f.delete();        //如果存在删除
                }
            }
        }

        attachmentDAO.executeJPQL("delete from Attachment entity where entity.businessId in ?1", Arrays.asList(businessIds));
    }
    
    @Override
    public void removeByIds(String... ids) {
        for (String id : ids) {
        	Attachment attachment = attachmentDAO.findById(id);
        	if(attachment != null){
                File f = new File(attachment.getPath());    // 输入要删除的文件位置
                if (f.exists()) {
                    f.delete();        //如果存在删除
                }
                
        	}
        }

        attachmentDAO.remove(ids);
    }
    
    @Override
    public void copy(String oldbusinessIds , String newbusinessIds){ 
		try {
			List<Attachment> attachments = getByBusinessId(oldbusinessIds);
	    	for(Attachment attachment : attachments){
	    		 
	    		 File oldFile = new File(attachment.getPath());
	    		 File cacheFile = new File(oldFile.getParentFile().getAbsolutePath(), UUIDGenerator.generateUUID());
                 FileUtils.copyInputStreamToFile(new FileInputStream(oldFile), cacheFile);
                 
				 Attachment act = new Attachment();
				 act.setBusinessId(newbusinessIds);
				 act.setPath(cacheFile.getAbsolutePath());
				 act.setData(attachment.getData());
				 act.setName(attachment.getName());
				 act.setExt(attachment.getExt());
				 act.setSize(attachment.getSize());
				 act.setAttachmentType(attachment.getAttachmentType());
				 attachmentDAO.save(act);
	    	}
		}catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}