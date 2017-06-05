package attachment.action;

import attachment.bean.Attachment;
import attachment.service.AttachmentService;
import attachment.service.impl.AttachmentConfigManager;
import com.harmonywisdom.framework.action.DownloadableAction;
import com.harmonywisdom.framework.service.annotation.AutoService;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;

import java.io.*;

public class AttachmentAction extends DownloadableAction<Attachment,AttachmentService> {
	
    @AutoService
    private AttachmentService attachmentService;

    @Override
    protected AttachmentService getService() {
        return attachmentService;
    }

    @Override
    public void save() {
        throw new UnsupportedOperationException("请使用AttachmentServlet进行上传操作");
    }

    public void download() {
        AttachmentConfigManager manager = AttachmentConfigManager.getInstance();
        Attachment attachment = attachmentService.findById(entity.getId());
        if (attachment != null) {
            boolean needCacheFile = false;
            File file = new File(attachment.getPath());

            if (manager.isSaveToDisk()) {
                if (file.exists()) {
                    response.setContentType("application/octet-stream");
                    InputStream is = null;
                    try {
                        response.addHeader("Content-Disposition", "attachment;filename=" + java.net.URLEncoder.encode(attachment.getName(), "UTF-8"));
                        is = new FileInputStream( new File(attachment.getPath()));
                        OutputStream os = response.getOutputStream();
                        byte[] buffer = new byte[1024];
                        int readCount = 0;
                        while((readCount=is.read(buffer))>0){
                            os.write(buffer,0,readCount);
                        }
                        return;
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    finally {
                        if(is != null) {
                            try {
                                is.close();
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        }
                    }
                    response.setStatus(500);
//                    write(new File(attachment.getPath()), attachment.getName());
                    return;
                } else if (manager.isSaveToDB()) {
                    needCacheFile = true;
                } else {
                    response.setStatus(500);
                    write("未找到相关文件");
                    return;
                }
            }

            byte[] data = attachment.getData();
            if (data != null && data.length > 0) {
                write(data, attachment.getName());

                if (needCacheFile) {
                    try {
                        File dir = file.getParentFile();
                        if (!dir.exists()) {
                            dir.mkdirs();
                        }
                        FileUtils.copyInputStreamToFile(new ByteArrayInputStream(data), file);
                    } catch (IOException e) {
                        log.error("保存缓存时发生异常", e);
                    }
                }
            } else {
                response.setStatus(500);
                write("未找到相关文件");
            }
        }
    }

    public void listAttachment() {
        String businessId = entity.getBusinessId();
        String type = entity.getAttachmentType();

        if (StringUtils.isNotBlank(businessId) && StringUtils.isNotBlank(type)) {
            write(attachmentService.getByBusinessIdAndType(businessId, type));
        } else if (StringUtils.isNotBlank(businessId)) {
            write(attachmentService.getByBusinessId(businessId));
        } else {
            write("[]");
        }
    }
    
    public void delete(){
    	String id = request.getParameter("deletedId");
    	write(true, "id", id);
    }
}