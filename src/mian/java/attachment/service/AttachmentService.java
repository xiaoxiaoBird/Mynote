package attachment.service;

import attachment.bean.Attachment;
import com.harmonywisdom.framework.exception.ServiceException;
import com.harmonywisdom.framework.service.IBaseService;

import java.util.List;

public interface AttachmentService extends IBaseService<Attachment, String> {
    /**
     * 下载数据
     *
     * @param id
     * @return
     */
    public byte[] download(String id) throws ServiceException;

    /**
     * 查找业务关联的附件
     *
     * @param bussinessId
     * @return
     * @throws ServiceException
     */
    public List<Attachment> getByBusinessId(String bussinessId) throws ServiceException;

    /**
     * 查找业务关联的附件
     *
     * @param bussinessId
     * @param attachmentType
     * @return
     * @throws ServiceException
     */
    public List<Attachment> getByBusinessIdAndType(String bussinessId, String attachmentType) throws ServiceException;

    /**
     * 更新附件业务ID
     *
     * @param businessId 业务ID
     * @param ids        附件ID
     * @throws ServiceException
     */
    public void updateBusinessId(String businessId, String... ids) throws ServiceException;

    /**
     * 通过业务ID删除附件
     *
     * @param businessIds
     * @author
     */
    public void removeByBusinessIds(String... businessIds);
    
    /**
     * 通过ID删除附件
     *
     * @param ids
     * @author
     */
    public void removeByIds(String... ids);
    
    /**
     * 赋值文件
     * @param oldbusinessIds
     * @param newbusinessIds
     */
    public void copy(String oldbusinessIds, String newbusinessIds);
}