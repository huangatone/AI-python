
<%@ include file = "header.jsp" %>
<%@ page import="java.io.*" %>
<% 
String file = application.getRealPath("/");
File f = new File(file);
String [] fileNames = f.list();
File [] fileObjects= f.listFiles();
for (int i = 0; i < fileObjects.length; i++) 
{
	if(!fileObjects[i].isDirectory())
	{
	    String fname = file+fileNames[i];
		out.println("<li><a href="+  fileNames[i] + ">" + fileNames[i] + "</a>");
	 }
}
%>

<%@ include file = "footer.jsp" %>