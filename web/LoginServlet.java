import java.io.*;//IOException所在的命名空间
 import javax.servlet.*;//ServletException所在命名空间
 import  javax.servlet.http.*;//HttpServlet、HttpServletRequest、HttpServletResponse所在命名空
public class LoginServlet extends HttpServlet {


    public  void doGet(HttpServletRequest request,
                     HttpServletResponse response)
              throws ServletException,
                     IOException {

        //获得用户传来的参数，参数名称即form表单中<input>的name属性
        String username=request.getParameter("username");
        String password=request.getParameter("password");

        //在命令窗口输出用户名和密码
        System.out.println("username="+ username);
        System.out.println("password=" + password);

        //将提示信息输出到网页上

  HttpSession session = request.getSession();

           session.setAttribute("username", username);

           response.sendRedirect("index1.jsp");

       // response.setContentType("text/html;charset=GBK");
       // response.getWriter().println("成功Success!!!");

    }

}
