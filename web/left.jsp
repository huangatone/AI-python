<!DOCTYPE html>
<html lang="en">
<head>
  <title>Bell </title>
 
  <style>
  html, body {
    height: 100%;
  }

  body {
    padding: 8px;
    background-color: #F6F6F6;
    box-sizing: border-box;
  }

  .split {
    -webkit-box-sizing: border-box;
       -moz-box-sizing: border-box;
            box-sizing: border-box;

    overflow-y: auto;
    overflow-x: hidden;
  }

  .content {
    border: 1px solid #C0C0C0;
    box-shadow: inset 0 1px 2px #e4e4e4;
    background-color: #fff;
  }

  .gutter {
    background-color: transparent;

    background-repeat: no-repeat;
    background-position: 50%;
  }

  .gutter.gutter-horizontal {
    cursor: col-resize;
    background-image: url('/rong/project/web/grips/vertical.png');
  }

  .gutter.gutter-vertical {
    cursor: row-resize;
    background-image: url('/rong/project/web/grips/horizontal.png');
  }

  .split.split-horizontal, .gutter.gutter-horizontal {
    height: 100%;
    float: left;
  }

  .accordion {
    background-color: #eee;
    color: #444;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 15px;
    transition: 0.4s;
}

.active, .accordion:hover {
    background-color: #ccc; 
}

.accordion:after {
    content: '\02795'; /* Unicode character for "plus" sign (+) */
    font-size: 13px;
    color: #777;
    float: right;
    margin-left: 5px;
}

.active:after {
    content: "\2796"; /* Unicode character for "minus" sign (-) */
}

.panel {
    padding: 0 18px;
    display: none;
    background-color: white;
    overflow: scroll;
}
  </style>
     

   <script src= "init.js"> </script> 
    <script src="split.js"></script>    

   
</head>
<body onload="init();">
    <div id="a" class="split split-horizontal" style="width: 150px;">
      <div id="c" class="split content">
            <button class="accordion" Sibling= "menu1">1. Select File </button>
            <div class="panel" id ="menu1">
                <form >     
                 <fieldset>
                    <h5>excel File</h5> 
                  <input type="file" id="file" ng-model="csvFile"  onchange='ExcelExport(event)'/>

                   </fieldset>
                </form>
            </div>

            <button class="accordion"  Sibling= "menu2">2. Choose elements </button>

            <div class="panel" id ="menu2">
                <h4 id = "highband"> Choose Column for each item </h2>
                <button onclick="CreateMap_selector()" height = "30px">Generate </button>
                <table border = 1 id = "paremeterTable">
                    <tr id = "field_name"> 
                        <td> Group </td> <td> Lat </td>  <td> Lng</td>
                    </tr>       
                </table>
            </div>

            <button class="accordion"  Sibling= "menu3">3. Create Markers</button>
            <div class="panel" id ="menu3">
                
               <li> <a href="main.jsp">Home</a>
                <li><a href="news.jsp">News</a>
                <li><a href="contact.jsp">Contact</a>
            </div>

            <button class="accordion"  Sibling= "piechart">4. Show Chart</button>
            <div  id="piechart" style="width: 100px; height: 300px; display: none"></div>

            <button class="accordion"  Sibling= "menu5">5. About</button>
            <div class="panel" id ="menu5">
                
            </div>
      </div>
     <script>
    initMenu();  
    
</script>
    </div>
  

