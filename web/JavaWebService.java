import java.io.*;
import java.net.*;

public class JavaWebService {
    public static void main(String arg[]) throws Exception
    {
        ServerSocket server=new ServerSocket(8080);
        System.out.println("等待连接.....");
        Socket socket=server.accept();
        OutputStream outStream=socket.getOutputStream();
        System.out.println("连接成功.....");
        BufferedReader bufferReader=new BufferedReader(new FileReader("D:\\Hello.html"));
        String buf="";
        while((buf=bufferReader.readLine())!=null)
        {
            outStream.write(buf.getBytes());            
        }
        bufferReader.close();
        outStream.close();
        socket.close();
        
    }
}
