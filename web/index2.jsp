<%@ include file = "header.jsp" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<center>

<h1>index2.jsp</h1>
<h1><a href= "StudyServlet">Study - 1</a> </h1>

<%

    String username = (String)session.getAttribute("username");

    if(username == null) {

       out.print("您还没有登录！");

    } else {

       out.print("用户名：" + username);

    }

%>

<hr/>

<a href="index1.jsp">index1</a>

</center>
<%@ include file = "footer.jsp" %>
