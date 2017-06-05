package attachment.action;

import attachment.bean.Attachment;
import attachment.service.AttachmentService;
import attachment.service.impl.AttachmentConfigManager;
import com.harmonywisdom.framework.service.SpringUtil;
import com.harmonywisdom.framework.utils.UUIDGenerator;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.FileCleanerCleanup;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.FileCleaningTracker;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.Writer;
import java.util.List;

/**
 * Created by hotleave on 15-3-10.
 */
public class AttachmentServlet extends HttpServlet {
    public static final String ATT_TYPE = "type";
    public static final String BUSINESS_ID = "businessId";
    private static final String ENCODING = "UTF-8";

    private DiskFileItemFactory factory;
    private AttachmentConfigManager configManager = AttachmentConfigManager.getInstance();
    private Logger logger = LoggerFactory.getLogger(getClass());
    private File cacheDir;
    private boolean saveToDisk;
    private boolean saveToDB;

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);

        saveToDisk = configManager.isSaveToDisk();
        saveToDB = configManager.isSaveToDB();
        if (saveToDisk) {
            File saveDir = new File(configManager.getSavePath());
            if (!saveDir.exists()) {
                saveDir.mkdirs();
            }
            cacheDir = saveDir;
        }

        factory = new DiskFileItemFactory();

        if (configManager.isNeedChangeTempDir()) {
            File tmpDir = new File(configManager.getTempDir());
            if (!tmpDir.exists()) {
                tmpDir.mkdirs();
            }

            factory.setRepository(tmpDir);
        }

        factory.setSizeThreshold(configManager.getThreshold());

        FileCleaningTracker fileCleaningTracker = FileCleanerCleanup.getFileCleaningTracker(config.getServletContext());
        factory.setFileCleaningTracker(fileCleaningTracker);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Writer out = null;
        ServletFileUpload upload = new ServletFileUpload(factory);

        upload.setFileSizeMax(configManager.getMaxSize());
        upload.setHeaderEncoding(ENCODING);

        try {
            Attachment attachment = new Attachment();

            attachment.setAttachmentType(request.getParameter(ATT_TYPE));
            attachment.setBusinessId(request.getParameter(BUSINESS_ID));

            List<FileItem> fileItemList = upload.parseRequest(request);
            for (FileItem fileItem : fileItemList) {
                String name = fileItem.getName();

                // 文件
                if (!fileItem.isFormField()) {
                    if (fileItem.getSize() == 0) {
                        continue;
                    }

                    attachment.setName(FilenameUtils.getName(name));
                    attachment.setExt(FilenameUtils.getExtension(name));
                    attachment.setSize(FileUtils.byteCountToDisplaySize(fileItem.getSize()));

                    if (saveToDisk) {
                        // 保存到磁盘
                        File cacheFile = new File(cacheDir, UUIDGenerator.generateUUID());
                        FileUtils.copyInputStreamToFile(fileItem.getInputStream(), cacheFile);

                        attachment.setPath(cacheFile.getAbsolutePath());
                    }

                    if (saveToDB) {
                        // 保存到数据库
//                        if (cacheFile != null) {
//                            attachment.setData(FileUtils.readFileToByteArray(cacheFile));
//                        } else {
                        attachment.setData(fileItem.get());
//                        }
                    }
                }
            }

            // 保存到数据库
            AttachmentService service = SpringUtil.getBean("attachmentService");
            service.save(attachment);

            response.setCharacterEncoding("UTF-8");
//            response.setContentType("application/json;charset=utf-8");
            response.setContentType("text/plain;charset=utf-8");
            response.setHeader("Cache-Control", "no-cache");
            out = response.getWriter();
            out.write(String.format("{\"success\": true, \"id\": \"%s\"}", attachment.getId()));
        } catch (FileUploadException e) {
            logger.error(e.getMessage(), e);
        } finally {
            if (out != null) {
                out.close();
            }
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.getWriter().write("Please use POST method!");
    }
}
