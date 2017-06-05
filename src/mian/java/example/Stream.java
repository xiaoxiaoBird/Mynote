package example;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.ServletActionContext;

/**
 * Created by admin on 2016/3/22.   ��վ�ļ�����
 */
public class Stream {
    private static final long serialVersionUID = 1L;

    /**
     * �ļ�����
     */
    public void download() {

        String rootPath = getRequest().getRealPath("/doc"); //Ҫ���ص��ļ�����Ŀ¼

        String fileName = getRequest().getParameter("fileName"); //Ҫ���ص��ļ���

        File file = new File(rootPath + File.separator + fileName);

        writeBytes(file, fileName);
    }

    /**
     * ��ȡResponse����
     * @return
     */
    protected HttpServletResponse getResponse() {
        return ServletActionContext.getResponse();
    }

    /**
     * ��ȡRequest����
     * @return
     */
    protected HttpServletRequest getRequest() {
        return ServletActionContext.getRequest();
    }

    /**
     * ����ͷ�ļ���ʽ
     * @param fileName
     * @param totalSize
     * @return
     */

//      Accept:application/json, text/javascript, */*; q=0.01
//    Accept-Encoding:gzip, deflate
//    Accept-Language:zh-CN,zh;q=0.8
//    Cache-Control:no-cache
//    Connection:keep-alive
//    Content-Length:0
//    Cookie:JSESSIONID=615F0252B03CEF3DF5AE9E2464CF00CC
//    Host:localhost:8080
//    Origin:http://localhost:8080
//    Pragma:no-cache
//    Referer:http://localhost:8080/ajproduct/gov/emalert/alertReRemind.jsp
//    User-Agent:Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.82 Safari/537.36
//    X-Requested-With:XMLHttpRequest

    private Map<String, Long> setResponseHeader(String fileName, long totalSize) {

        HttpServletResponse response = getResponse();
        HttpServletRequest request = getRequest();

        Map<String, Long> result = new HashMap<String, Long>();
        long rangeSwitch = 0;
        long contentLength;
        long from = 0;
        long to = totalSize - 1;

        String range = request.getHeader("Range");
        if (StringUtils.isNotBlank(range)) {
            response.setStatus(javax.servlet.http.HttpServletResponse.SC_PARTIAL_CONTENT);
            String rangBytes = range.split("=")[1];
            int splitIndex = rangBytes.indexOf("-");
            if (rangBytes.endsWith("-")) { // bytes=from-, ���̶߳ϵ�����
                rangeSwitch = 1;
                from = Long.valueOf(rangBytes.substring(0, splitIndex));
            } else { // bytes=from-to, ���߳�����
                rangeSwitch = 2;
                from = Long.valueOf(rangBytes.substring(0, splitIndex));
                to = Long.valueOf(rangBytes.substring(splitIndex + 1));
            }
        }

        contentLength = to - from + 1;

        response.setHeader("Accept-Ranges", "bytes");
        response.setHeader("Content-Length", String.valueOf(contentLength));
        // Content-Range: bytes [�ļ���Ŀ�ʼ�ֽ�]-[�ļ����ܴ�С - 1]/[�ļ����ܴ�С]
        response.setHeader("Content-Range", rangeSwitch == 2 ? (range.replace("=", " ") + "/" + totalSize) : ("bytes " + from + "-" + to + "/" + totalSize));
        response.setContentType("application/octet-stream");
        try {
            response.addHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(fileName, "UTF-8"));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        result.put("rangeSwitch", rangeSwitch);
        result.put("contentLength", contentLength);
        result.put("from", from);
        result.put("to", to);

        return result;
    }

    /**
     * ����ļ���
     * @param file
     * @param fileName
     */
    protected void writeBytes(File file, String fileName) {

        Map<String, Long> result = setResponseHeader(fileName, file.length());
        long rangeSwitch = result.get("rangeSwitch");
        long from = result.get("from");
        long contentLength = result.get("contentLength");

        BufferedInputStream bis;
        InputStream ins;

        try {
            ins = new FileInputStream(file);
            bis = new BufferedInputStream(ins);

            // �����
            bis.skip(from);

            OutputStream out = getResponse().getOutputStream();

            int read;
            long readLength = 0;
            int bufferSize = 1024;
            byte[] buffer = new byte[bufferSize];

            if (rangeSwitch == 2) {
                // д����
                while (readLength <= contentLength - bufferSize) {
                    read = bis.read(buffer);
                    readLength += read;
                    out.write(buffer, 0, read);
                }
                if (readLength < contentLength) {
                    read = bis.read(buffer, 0, (int) (contentLength - readLength));
                    out.write(buffer, 0, read);
                }
            } else {
                // д�����£�ȫ��
                while ((read = bis.read(buffer)) != -1) {
                    out.write(buffer, 0, read);
                }
            }
            out.flush();
            out.close();
            bis.close();

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }  catch (IOException e) {
            e.printStackTrace();
        }
    }
}
