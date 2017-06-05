package example;

import com.jacob.activeX.ActiveXComponent;
import com.jacob.com.Dispatch;
import com.jacob.com.Variant;

import java.io.File;

/**
 * Created by roger on 2016/5/12.
 */
public class docDisplay {

        int WORD_HTML = 8;
        int WORD_TXT = 7;
        int EXCEL_HTML = 44;

        /**
         * WORDתHTML
         * @param docfile WORD�ļ�ȫ·��
         * @param htmlfile ת����HTML���·��
         */
    public void wordToHtml(String docfile, String htmlfile)
    {
        ActiveXComponent app = new ActiveXComponent("Word.Application"); // ����word
        try
        {
            app.setProperty("Visible", new Variant(false));
            Dispatch docs = app.getProperty("Documents").toDispatch();
            Dispatch doc = Dispatch.invoke(docs, "Open", Dispatch.Method, new Object[]{docfile, new Variant(false), new Variant(true)}, new int[1]).toDispatch();
            Dispatch.invoke(doc, "SaveAs", Dispatch.Method, new Object[] {htmlfile, new Variant(WORD_HTML) }, new int[1]);
            Variant f = new Variant(false);
            Dispatch.call(doc, "Close", f);
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        finally
        {
            app.invoke("Quit", new Variant[] {});
        }
    }

    /**
     * EXCELתHTML
     * @param xlsfile EXCEL�ļ�ȫ·��
     * @param htmlfile ת����HTML���·��
     */
    public void excelToHtml(String xlsfile, String htmlfile)
    {
        ActiveXComponent app = new ActiveXComponent("Excel.Application"); // ����excel
        try
        {
            app.setProperty("Visible", new Variant(false));
            Dispatch excels = app.getProperty("Workbooks").toDispatch();
            Dispatch excel = Dispatch.invoke(excels,"Open",Dispatch.Method,new Object[] { xlsfile, new Variant(false),new Variant(true) }, new int[1]).toDispatch();
            Dispatch.invoke(excel, "SaveAs", Dispatch.Method, new Object[] {htmlfile, new Variant(EXCEL_HTML) }, new int[1]);
            Variant f = new Variant(false);
            Dispatch.call(excel, "Close", f);
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        finally
        {
            app.invoke("Quit", new Variant[] {});
        }
    }

    /**
     * /ɾ��ָ���ļ���
     * @param folderPath �ļ���ȫ·��
     * @param htmlfile ת����HTML���·��
     */
    public void delFolder(String folderPath)
    {
        try
        {
            delAllFile(folderPath); //ɾ����������������
            String filePath = folderPath;
            filePath = filePath.toString();
            java.io.File myFilePath = new java.io.File(filePath);
            myFilePath.delete(); //ɾ�����ļ���
        } catch (Exception e) {e.printStackTrace();}
    }

    /**
     * /ɾ��ָ���ļ����������ļ�
     * @param path �ļ�ȫ·��
     */
    public boolean delAllFile(String path)
    {
        boolean flag = false;
        File file = new File(path);
        if (!file.exists())
        {
            return flag;
        }
        if (!file.isDirectory())
        {
            return flag;
        }
        String[] tempList = file.list();
        File temp = null;
        for (int i = 0; i < tempList.length; i++)
        {
            if (path.endsWith(File.separator))
            {
                temp = new File(path + tempList[i]);
            }
            else
            {
                temp = new File(path + File.separator + tempList[i]);
            }
            if (temp.isFile())
            {
                temp.delete();
            }
            if (temp.isDirectory())
            {
                delAllFile(path + "/" + tempList[i]);//��ɾ���ļ���������ļ�
                delFolder(path + "/" + tempList[i]);//��ɾ�����ļ���
                flag = true;
            }
        }
        return flag;
    }


    public static void main(String[] args) {

        docDisplay trans = new docDisplay();
        File docfile =new File("C:/Users/admin/Desktop/�ĵ�/04_1��1�ֲ��Լ�¼.docx");
        File htmlfile =new File("C:/Users/admin/Desktop/jixian.html");
        trans.wordToHtml(docfile.toString(),htmlfile.toString());
    }
}



