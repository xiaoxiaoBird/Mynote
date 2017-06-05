package attachment.dao;

import attachment.bean.Attachment;
import com.harmonywisdom.framework.dao.DefaultDAO;
import org.springframework.stereotype.Repository;

@Repository
public class AttachmentDAO extends DefaultDAO<Attachment, String> {
}