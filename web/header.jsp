<%! 
   int pageCount = 0;
   void addCount() {
      pageCount++;
   }
%>

<% addCount(); %>

<html>
   <head>
      <title>The include Directive Example</title>
      <style>
body {margin:0;}

.navbar {
  overflow: hidden;
  background-color: #333;
  position: fixed;
  top: 0;
  width: 100%;
}

.navbar a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.navbar a:hover {
  background: #ddd;
  color: black;
}

.main {
  padding: 16px;
  margin-top: 30px;
  height: 1500px; /* Used in this example to enable scrolling */
}
</style>

<meta charset="UTF-8">
   </head>
   
   <body>
      <div class="navbar">
  <a href="index.jsp">Home</a>
  <a href="news.jsp">News</a>
  <a href="contact.jsp">Contact</a>
  <a href="login.jsp">login</a>
  <a href="list.jsp" float=right>list</a>
</div>
      <center>
         <h2>The include Directive Example</h2>
         <p>This site has been visited <%= pageCount %> times.</p>
      </center>
      <br/><br/>