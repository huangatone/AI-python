
<%@ include file = "header.jsp" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<center>
<%

    String username = (String)session.getAttribute("username");

    if(username == null) {

       out.print("您还没有登录！");

    } else {

       out.print("用户名：" + username);

    }

%>

<hr/>

<a href="index2.jsp">index2</a>
<h1><a href= "StudyServlet">Study - 1</a> </h1>
<h1><a href= "HelloWorld">Hellow - 1</a> </h1>
<h1><a href= "googlemap.html">google map</a> </h1>
<h1><a href= "data_date.html">google chart map</a> </h1>
<h1><a href= "Base64Image.html">Base64Image</a> </h1>
</center>
<%@ include file = "footer.jsp" %>