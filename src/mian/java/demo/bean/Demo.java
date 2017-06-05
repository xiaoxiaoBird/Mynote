package demo.bean;

import com.alibaba.fastjson.annotation.JSONField;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "T_DEMO")
public class Demo implements Serializable {
    public static final long serialVersionUID = 1L;

    @Id
    @Column(name="ID", length = 36)
    private String id ;

    //��������id
    @Column(name="TASK_ID",length = 32)
    private String taskId;

    //�㱨��λ
    @Column(name="REPORT_ORGAN",length = 32)
    private String reportOrgan;

    //�㱨ʱ��
    @Column(name = "REPORT_TIME")
    @JSONField(format="yyyy-MM-dd")
    private Date repotrTime;

    //���״̬   1:δ�ϱ�  2�����ϱ� 3 δͨ�� 4����ͨ�����
    @Column(name ="CHECK_STATUS")
    private String CheckStatus;

    //�㱨����
    @Column(name ="REPORT_CONTEXT" ,length =1000)
    private String reportContext;

    //�㱨��ز���
    @Column(name ="ATTACHMENT",length = 32)
    private String  attamchmentid;

    public Demo() {
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public void setReportOrgan(String reportOrgan) {
        this.reportOrgan = reportOrgan;
    }

    public void setRepotrTime(Date repotrTime) {
        this.repotrTime = repotrTime;
    }

    public void setReportContext(String reportContext) {
        this.reportContext = reportContext;
    }

    public void setAttamchmentid(String attamchment) {
        this.attamchmentid = attamchment;
    }

    public String getAttamchmentid() {
        return attamchmentid;
    }

    public String getId() {
        return id;
    }

    public String getTaskId() {
        return taskId;
    }

    public String getReportOrgan() {
        return reportOrgan;
    }

    public Date getRepotrTime() {
        return repotrTime;
    }

    public String getReportContext() {
        return reportContext;
    }

    public String getCheckStatus() {
        return CheckStatus;
    }

    public void setCheckStatus(String checkStatus) {
        CheckStatus = checkStatus;
    }


    @Override
    public String toString() {
        return "Demo{" +
                "id='" + id + '\'' +
                ", taskId='" + taskId + '\'' +
                ", reportOrgan='" + reportOrgan + '\'' +
                ", repotrTime=" + repotrTime +
                ", CheckStatus='" + CheckStatus + '\'' +
                ", reportContext='" + reportContext + '\'' +
                ", attamchmentid='" + attamchmentid + '\'' +
                '}';
    }
}