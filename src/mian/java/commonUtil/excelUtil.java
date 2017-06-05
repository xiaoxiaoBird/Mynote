/**
 * Created by roger on 2017/3/3.
 */
package commonUtil;

import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.struts2.dispatcher.multipart.MultiPartRequestWrapper;
import org.junit.Test;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.Iterator;

/**
 * Created by roger on 2017/3/3.
 */
public class excelUtil {

    protected HttpServletRequest request;
    protected HttpServletResponse response;

    /*读取excel数据*/
    @Test
    public void getExcelData() throws IOException {

        File file = new File("C:\\Users\\admin\\Desktop\\excelTest.xlsx");
        FileInputStream fIs = new FileInputStream(file);
        //Get the workbook instance for XLSX file  xlsx的实例
        XSSFWorkbook workbook = new XSSFWorkbook(fIs);

        XSSFSheet spreadsheet = workbook.getSheetAt(0);
        Iterator< Row > rowIterator = spreadsheet.iterator();
        while (rowIterator.hasNext()) {
            XSSFRow  row = (XSSFRow) rowIterator.next();
            if (row == null) {// 如果为空，不处理
                                 continue;
                 }
            Iterator < Cell > cellIterator = row.cellIterator();
            while ( cellIterator.hasNext())
            {
                Cell cell = cellIterator.next();

                switch (cell.getCellType())
                {
                    case Cell.CELL_TYPE_NUMERIC:
                        if(HSSFDateUtil.isCellDateFormatted(cell)){  //判断是否为excel的时间
                            System.out.print(  cell.getDateCellValue() );
                        }else{                                  //将excel自带的double类型转换成int类型
                            System.out.print(  (int) cell.getNumericCellValue() + " \t\t " );
                        }

                        break;
                    case Cell.CELL_TYPE_STRING:
                        System.out.print(  cell.getStringCellValue() + " \t\t " );
                        break;
                }
            }
            System.out.println();
        }
        fIs.close();


    }



    //excel的批量导入
    public void excelImport() throws IOException {
        String examID = request.getParameter("importExamID");

        MultiPartRequestWrapper wrapper = (MultiPartRequestWrapper)request;
        //获取缓存在内存的临时文件
        File file = wrapper.getFiles("excelImport")[0];
        String fileName = wrapper.getFileNames("excelImport")[0];
        String msg = "success";

        try(FileInputStream fis = new FileInputStream(file)){
            HSSFWorkbook workbook = new HSSFWorkbook(fis);
            HSSFSheet spreadsheet = workbook.getSheetAt(0);
            Iterator< Row > rowIterator = spreadsheet.iterator();
            while (rowIterator.hasNext()) {
                Row  row = (Row) rowIterator.next();
                if (row.getRowNum()==0||row.getRowNum()==1 ) {// 如果为空，不处理
                    continue;
                }
                Iterator <Cell> cellIterator = row.cellIterator();

                while ( cellIterator.hasNext())
                {
                    Cell cell = cellIterator.next();
                    String value = cell.getStringCellValue();
                    switch(cell.getColumnIndex()){
                        case 0:
                            break;
                        case 1:
                            break;
                    }
                }

            }
        }catch (Exception e){
            msg = "fail";
            e.printStackTrace();
        }
    }


    //导出excel模板
    public void excelExport(){
        ServletOutputStream outputStream;
        try {
            setResponseHeader("准考证的导入模板.xls"); //设置响应头
            outputStream = response.getOutputStream();
            exportExcel(outputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 设置响应头
     * @param fileName 导出文件名
     */
    private void setResponseHeader(String fileName) {
        response.setContentType("application/vnd.ms-excel;charset=utf-8");
        try {
            response.setHeader("Content-Disposition", "attachment;filename=" + java.net.URLEncoder.encode(fileName, "UTF-8"));
            //客户端不缓存
            response.addHeader("Pragma", "no-cache");
            response.addHeader("Cache-Control", "no-cache");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }

    /**
     * 组织导出数据
     */
    public void exportExcel(  ServletOutputStream outputStream) throws IOException {

        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet("准考证导出模板");
        sheet.addMergedRegion(new CellRangeAddress(0, (short) 0, 0, (short) 7));
        setColumnWidth(sheet);

        HSSFCellStyle titleStyle = setHeadCellStyle(workbook, (short)12);
        Row row0 = sheet.createRow(0);
        HSSFCell cell = (HSSFCell) row0.createCell(0);
        cell.setCellStyle(titleStyle);
        cell.setCellValue("准考证导出模板(请所有的填写内容设置为文本格式)");

        Row row = sheet.createRow(1);
        String[] Title = new String[]{
                "考试者名字","岗位类别","岗位名称","准考证号","证件证号","考试地点","考 场 号","考试日期"
        };

        String[] fieldS =  new String[]{
                "张三","类别XX","岗位XX","20171012010001（年月日+考场+考试序号4位数字）","120103********4872","考场的具体地址","01","2017-10-12(时间格式：yyyy-MM-dd)"
        };
        //第二行的key值
        for (int i = 0; i <Title.length ; i++) {
            HSSFCell cell0 = (HSSFCell) row.createCell(i);
            cell0.setCellStyle(titleStyle);
            cell0.setCellValue(Title[i]);
        }

        //第三行的value值
        row = sheet.createRow(2);
        for (int i = 0; i <Title.length ; i++) {
            HSSFCell cell0 = (HSSFCell) row.createCell(i);
            cell0.setCellStyle(titleStyle);
            cell0.setCellValue(fieldS[i]);
            cell0.setCellType(HSSFCell.CELL_TYPE_STRING);
        }
        workbook.write(outputStream);
        outputStream.flush();
        outputStream.close();
    }


    protected HSSFCellStyle setCellStyle(HSSFWorkbook workbook, short fontSize) {
        HSSFFont headfont = workbook.createFont();
        //headfont.setFontName("黑体");
        headfont.setFontHeightInPoints(fontSize);// 字体大小
        headfont.setBoldweight(HSSFFont.BOLDWEIGHT_NORMAL);// 正常

        HSSFCellStyle cellStyle = workbook.createCellStyle();
        cellStyle.setFont(headfont);
        cellStyle.setFillForegroundColor(HSSFColor.WHITE.index);// 设置背景色
        cellStyle.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
        cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 左右居中
        cellStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 上下居中
        cellStyle.setLocked(true);
        cellStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN); //下边框
        cellStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);//左边框
        cellStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);//上边框
        cellStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);//右边框

        return cellStyle;
    }

    /**
     * 设置表头样式
     * @param workbook
     * @return
     */
    protected HSSFCellStyle setHeadCellStyle(HSSFWorkbook workbook, short fontSize) {

        HSSFFont headfont = workbook.createFont();
        headfont.setFontName("黑体");
        headfont.setFontHeightInPoints(fontSize);// 字体大小
        headfont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);// 加粗

        HSSFCellStyle headstyle = workbook.createCellStyle();
        headstyle.setFont(headfont);
        headstyle.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
        headstyle.setFillForegroundColor(HSSFColor.WHITE.index);// 设置背景色
        headstyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 左右居中
        headstyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 上下居中
        headstyle.setLocked(true);
        headstyle.setBorderBottom(HSSFCellStyle.BORDER_THIN); //下边框
        headstyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);//左边框
        headstyle.setBorderTop(HSSFCellStyle.BORDER_THIN);//上边框
        headstyle.setBorderRight(HSSFCellStyle.BORDER_THIN);//右边框

//		    headstyle.setWrapText(true);// 自动换行
        return headstyle;
    }

    /**
     * 设置列宽
     * @param sheet
     */
    protected void setColumnWidth(HSSFSheet sheet) {
        sheet.setColumnWidth(0, 15 * 256);
        sheet.setColumnWidth(1, 30 * 256);
        sheet.setColumnWidth(2, 18 * 256);
        sheet.setColumnWidth(3, 55 * 256);
        sheet.setColumnWidth(4, 30 * 256);
        sheet.setColumnWidth(5, 18 * 256);
        sheet.setColumnWidth(6, 15 * 256);
        sheet.setColumnWidth(7, 15 * 256);
        sheet.setColumnWidth(8, 15 * 256);
    }



}
