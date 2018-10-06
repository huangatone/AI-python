import java.io.*;//IOException所在的命名空间
  import javax.servlet.*;//ServletException所在命名空间
  import  javax.servlet.http.*;//HttpServlet、HttpServletRequest、HttpServletResponse所在命名空
  public class StudyServlet extends HttpServlet {
    
    
    public  void doGet(HttpServletRequest request,
    HttpServletResponse response)
    throws ServletException,
    IOException 
    {
    
    //获得用户传来的参数，参数名称即form表单中<input>的name属性
    String cmd=request.getParameter("cmd");
    String password=request.getParameter("password");
    
    // 设置响应内容类型
    response.setContentType("text/html");
    
    // 实际的逻辑是在这里
    PrintWriter out = response.getWriter();
    HttpSession session = request.getSession();
    
    
    String username = (String)session.getAttribute("username");
    
    if(username == null) {    
    out.print("Not login！");
    response.sendRedirect("login.html");
    return;    
    }
    
    out.println("<h1>" + "Testing ..." + "</h1>");
    
    char[] data = new char[1024]; 
    String sst = "this is a test";
    char[] charArray = sst.toCharArray();
    
    for(int count=0;count<charArray.length;count++)
    {    
    data[count] = charArray[count];    
    }


    ServletContext context = this.getServletContext(); //Get the servlet context
    
    File file = new File( context.getRealPath("site.txt") );

     out.println("<h1>" + context.getRealPath("site.txt") + "</h1>");
    
    
    FileInputStream fis = null; 
    try{
         out.println("<h1>  File - 1 </h1>");
        //创建流对象
        fis = new FileInputStream(file);
        out.println("<h1>" + fis.available() + "</h1>");
        //读取数据，并将读取到的数据存储到数组中
        
        //当前下标       
        int i = 0; 
        //读取流中的第一个字节数据，一次读一个字节
        int n = fis.read();
        //依次读取后续的数据
        //未到达流的末尾       
        while(n != -1){
        //将有效数据存储到数组中，将已经读取到的数据n强制转换为byte，即取n中的有效数据——最后一个字节
        data[i] = (char)n;
        //下标增加
        i++;
        //读取下一个字节的数据
        n = fis.read();
      }
    
    //解析数据
    String s = new String(data,0,i);
    //输出字符串
    System.out.println(s);
    out.println("<h1>" + s + "</h1>");
  }
  catch(Exception e){
    out.println("<h1>  File - 2 </h1>");
    e.printStackTrace();
  }
  finally
  {
     out.println("<h1>  File - 3 </h1>");
    try{
    //关闭流，释放资源
    fis.close();
      }
      catch(Exception e)
      {
       
      }
  }  
    
    out.println("<h1>" + username + "</h1>");
    out.println("<h1>" + data + "</h1>");
    
    
  }
    
    
    
  }
    