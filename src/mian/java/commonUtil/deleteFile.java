/**
 * Created by roger on 2016/11/29.
 */
package commonUtil;

import java.io.File;

/**
 * Created by roger on 2016/11/29.   删除文件
 *
 * File类的List的 参数 Filter类 需要实现 accept（） ，因为由它表示文件是否包含在目录内
 */
public class deleteFile {

    //删除文件和目录
    private void clearFiles(String workspaceRootPath){
        File file = new File(workspaceRootPath);
        if(file.exists()){
            deleteFile(file);
        }
    }

    private void deleteFile(File file){
        if(file.isDirectory()){   //是目录则删除所属的文件，否则删除文件
            File[] files = file.listFiles();
            for(int i=0; i<files.length; i++){
                deleteFile(files[i]);
            }
        }
        file.delete();
    }



}
