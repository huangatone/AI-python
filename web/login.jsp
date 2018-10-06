<%@ include file = "header.jsp" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<center>
        <form action="LoginServlet" method="get">
            用户：<input type="text" name="username">
            pass：<input type="password" name="password">
            <input type="submit" value="go">
        </form>
</center>
<%@ include file = "footer.jsp" %>
