
<%@ page import="java.io.*" %>
<HTML>
    <HEAD>
        <TITLE>Reading Binary Data</TITLE>
    </HEAD>

    <BODY>
        <H1>Reading Binary Data</H1>
        This page reads binary data from a file.
        <BR>
        Read this data:
        <BR>
        <BR>

        <%
            String file = application.getRealPath("/") + "site.txt";
            out.println("<h1>" + "dddd " + "</h1>");
            FileInputStream fileinputstream = new FileInputStream(file);

            int numberBytes = fileinputstream.available();
            byte bytearray[] = new byte[numberBytes];

            fileinputstream.read(bytearray);

            String s = new String(bytearray,0,numberBytes);
            out.println("<h1>" + s + "</h1>");

            for(int i = 0; i < numberBytes; i++){
                out.println(bytearray[i]);
            }

            fileinputstream.close();
        %>
    </BODY>
</HTML>
           