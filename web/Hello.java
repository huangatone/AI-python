 
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
 public class Hello{
     public static void main(String[] args)
     {
       System.out.println("Hello");

       File file = new File("/dfnet/touch.py");
	   FileInputStream fis = null;

		try {
			 System.out.println("Try");
			fis = new FileInputStream(file);

			System.out.println("Total file size to read (in bytes) : "
					+ fis.available());

			int content;
			while ((content = fis.read()) != -1) {
				// convert to char and display it
				System.out.println((char) content);
			}

		} catch (IOException e) {
			e.printStackTrace();
			 System.out.println("Error");
		} finally {

			System.out.println("Hello Oh");

			try {
				if (fis != null)
					fis.close();
			} catch (IOException ex) {
				ex.printStackTrace();
			}
		}


		System.out.println("Hello end");

     }
}
