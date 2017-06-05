package attachment.bean;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "HW_ATTACHMENT")
public class Attachment implements Serializable {
    private static final long serialVersionUID = 1L;

    public Attachment() {}

    @Id
    @Column(name = "ID", length = 32)
    private String id;

    /**
     * 文件名称
     */
    @Column(name = "FILE_NAME", length = 100, nullable = false)
    private String name;

    /**
     * 扩展名
     */
    @Column(name = "FILE_EXT", length = 10)
    private String ext;

    /**
     * 保存位置
     */
    @Column(name = "FILE_PATH", length = 255)
    private String path;

    @Lob    //mysql是longBlob ，oracle是 CLOB
    @Basic(fetch = FetchType.LAZY, optional = true)    //fetch = FetchType.LAZY 表示延迟加载
    @Column(name = "DATA")
    private byte[] data;

    /**
     * 大小
     */
    @Column(name = "FILE_SIZE", length = 10, nullable = false)
    private String size;

    /**
     * 关联业务ID
     */
    @Column(length = 32, name = "BUSINESS_ID")
    private String businessId;

    /**
     * 附件类型
     */
    @Column(name = "ATT_TYPE", length = 50)
    private String attachmentType;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getExt() {
        return ext;
    }

    public void setExt(String ext) {
        this.ext = ext;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getBusinessId() {
        return businessId;
    }

    public void setBusinessId(String businessId) {
        this.businessId = businessId;
    }

    public byte[] getData() {
        return data;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public String getAttachmentType() {
        return attachmentType;
    }

    public void setAttachmentType(String attachmentType) {
        this.attachmentType = attachmentType;
    }
}