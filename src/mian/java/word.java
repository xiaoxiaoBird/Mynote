import org.apache.poi.hpsf.Variant;

/**
 * Created by admin on 2016/3/18.
 */
//public class word {
//    public static void main( String[] args )
//    {
//        //启动word
//        ActiveXComponent app = new ActiveXComponent( "Word.Application" );
//
//        //要转换的word文件
//        String inFile = "c:\\aaa.doc";
//
//        //目标文件
//        String tpFile = "c:\\aaa.html";
//
//        boolean flag = false;
//
//        try
//        {
////设置word不可见
//            app.setProperty( "Visible", new Variant(false) );
//
//            Object docs = app.getProperty( "Documents" ).toDispatch();
//
////打开word文件
//            Object doc = Dispatch.invoke(
//                    (Dispatch) docs ,
//                    "Open" ,
//                    Dispatch.Method ,
//                    new Object[]
//                            {
//                                    inFile ,
//                                    new Variant(false) ,
//                                    new Variant(true)
//                            } ,
//                    new int[1]
//            ).toDispatch();
//
////作为html格式保存到临时文件
//            Dispatch.invoke(
//                    (Dispatch) doc ,
//                    "SaveAs" ,
//                    Dispatch.Method ,
//                    new Object[]
//                            {
//                                    tpFile,new Variant( 8 )
//                            } ,
//                    new int[1]
//            );
//
//            Variant f = new Variant( false );
//            Dispatch.call( (Dispatch) doc , "Close" , f );
//            flag = true;
//        }
//        catch( Exception e )
//        {
//            e.printStackTrace();
//        }
//        finally
//        {
//            app.invoke( "Quit" , new Variant[]{} );
//
//        }
//    }
//}
