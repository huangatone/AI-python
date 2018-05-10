
var excel_sheet;

var clr=[];

var band_marker = new Map();

var daily_arr = new Array();
var weekly_arr = new Array();
var monthly_arr = new Array();


var colors = [
   { color: 'green' },  //high
   { color: 'yellow' },      //medium
   { color: 'red' },   //low
   ];


function formatTable( headers )
    {
    var table =document.getElementById("paremeterTable");
    //add group
    var tr = document.createElement('tr');
    var td = document.createElement('td');   
    var td_lat  = document.createElement('td');  
    var td_lng = document.createElement('td');  
    
    headers.forEach(function(h)
    {
        var ol = document.createElement('li');
        var x = document.createElement("INPUT");
        x.setAttribute("type", "checkbox");
        x.name = "GroupCK";
        x.value = h;
        ol.appendChild(x);
        ol.appendChild(document.createTextNode(h));
        td.appendChild(ol);
        tr.appendChild(td);
        
        
        ol = document.createElement('li');
        x = document.createElement("INPUT");
        x.setAttribute("type", "radio");
        x.name = "LatRadio";
        x.value = h;
        ol.appendChild(x);
        ol.appendChild(document.createTextNode(h));
        td_lat.appendChild(ol);
        tr.appendChild(td_lat);
        
        
        ol = document.createElement('li');
        x = document.createElement("INPUT");
        x.setAttribute("type", "radio");
        x.name = "LngRadio";
        x.value = h;
        ol.appendChild(x);
        ol.appendChild(document.createTextNode(h));
        td_lng.appendChild(ol);
        tr.appendChild(td_lng);
        
    });
    table.appendChild(tr);    

    //console.log("Open and Close");
    var panel = document.getElementById('menu2');
    //console.log(panel);
    panel.style.display = "block"; 
    panel = document.getElementById('menu1');
    panel.style.display = "none"; 
    panel = document.getElementById('menu3');
    panel.style.display ="block"; 
  
}

function drawChart() {

 
}


function GeneratorData()
{
  

   //get daily report;
  
   var daily_map = new Map();
   var weekly_map = new Map();
   var monthly_map = new Map();
 
    for (var [key, value] of band_marker.entries()) 
   {
      var g = key.split(",");  
      var group_key="";
      for (let i=0; i<g.length-1; i++) 
      {
        if( group_key != "")
          group_key +="," + g[i];
        else 
          group_key += g[i];
      } 

      

      if(daily_map.has(group_key) == false)
        {    
            var new_map = new Map(); 
            new_map.set(key,value);   
            daily_map.set(group_key, new_map); 
        }
        else
        {

            var new_map = daily_map.get(group_key); 
            new_map.set(key,value); 
            daily_map.set(group_key, new_map); 
        }

        var wk = week_index( g[g.length-1]);
       
        var wk_key = wk.toString();

        if(weekly_map.has(group_key) == false)
        {    
            var new_map = new Map();          
            new_map.set(wk_key,value);  
            //console.log("week 1= ", wk, value); 
            weekly_map.set(group_key, new_map); 
        }
        else
        {

            var new_map = weekly_map.get(group_key); 

            if( new_map.has(wk_key))
            {
              var o_v = new_map.get(wk_key);
              o_v = o_v.concat(value);
              new_map.set(wk_key,o_v); 
             // console.log("week 2= ", wk, o_v); 
              weekly_map.set(group_key, new_map); 
            }
            else
            {
              new_map.set(wk_key,value); 
              //console.log("week 3= ", wk, value);
              weekly_map.set(group_key, new_map); 
            }
            
        }


        var month =  g[g.length-1].split("/")[0];
        //console.log("date = " + g[g.length-1]);
        var month_key =  month.toString();

        if(monthly_map.has(group_key) == false)
        {    
            var new_map = new Map(); 
            new_map.set(month_key,value);   
            monthly_map.set(group_key, new_map); 
        }
        else
        {

            var new_map = monthly_map.get(group_key); 

            if( new_map.has(month_key))
            {
              var o_v = new_map.get(month_key);
              o_v = o_v.concat(value);
              new_map.set(month_key,o_v); 
              monthly_map.set(group_key, new_map); 
            }
            else
            {
              new_map.set(month_key,value); 
              monthly_map.set(group_key, new_map); 
            }
            
        }
        console.log(value.length);
        console.log(monthly_map);


   }

     for (var [key, value] of daily_map.entries()) 
     {
       build_chart(key, value,"day_div" , daily_arr);       
     }

   //get weekly report;
   for (var [key, value] of weekly_map.entries()) 
     {
       build_weekly_chart(key, value,"week_div",weekly_arr);       
     }

   //get monthly report;
   for (var [key, value] of monthly_map.entries()) 
     {
       build_weekly_chart(key, value,"month_div",monthly_arr);       
     }


   

}



function build_chart(title_text ,data_map, div_name, arr)
{
  var chart = c3.generate({
    bindto: '#day_div',
    data: {
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250],
        ['data2', 50, 20, 10, 40, 15, 25]
      ]
    }
});

  
}
function build_weekly_chart(title_text ,data_map, div_name, arr)
{
  var chart = c3.generate({
    bindto: '#week_div',
    data: {
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250],
        ['data2', 50, 20, 10, 40, 15, 25],
        ['data3', 100, 100, 40, 100, 150]
      ],
      groups: [
            ['data2', 'data3']
        ],
      axes: {
        data2: 'y3', // ADD
        
      },
      types: {
        data3: 'bar' ,// ADD
        data2: 'bar' // ADD
      },
      labels: true //show data label
    },
    axis: {
      y2: {
        show: true // ADD
      },
      rotated: true
    }
});


  var data_value = [];
  data_value.push( ['x' , 0, 10, 20, 30, 40, 50, 60, 70, 80, 90]);
  data_value.push( ['data -1' , 140, 80, 88, 71, 48, 94, 16, 2, 45, 31]);
  data_value.push( ['data -2' , 86, 149, 40, 193, 190, 15, 75, 15, 164, 59]);
  data_value.push( ['data -3 ' , 155, 49, 93, 84, 133, 5, 87, 89, 115, 57]);
  data_value.push( ['data -4' , 137, 134, 190, 169, 149, 10, 10, 10, 37, 121]);
  data_value.push( ['data -5' , 130, 71, 129, 63, 144, 142, 152, 196, 172, 154]);
  data_value.push( ['data -6' , 52, 30, 180, 94, 42, 178, 147, 21, 45, 13]);
 

  var chart3 = c3.generate({
        bindto: '#month_div',
       data: {
          x:'x',
          columns:data_value,
          labels: true
       },
       type:'spline',
      axes: {
         data1: 'y',
         data2: 'y2',
       },
        axis: {
         x: {
           label: 'X Label'
         },
         y: {
           label: {
           text: 'Y Axis Label',
           position: 'outer-middle'
           },
           min:-100,
           max:400
         },
         y2: {
           show: true,
           label: {
           text: 'Y2 Axis Label',
           position: 'outer-middle'
           }
         }
       } ,
       legend: {
          show: true,
          position: 'right'
        }
     });


}

function CreateMap_selector()  {
    //alert("hahaha");
    //get group
    var checkboxes = document.getElementsByName("GroupCK");
    var checkboxesChecked = [];
    // loop over them all
    for (var i=0; i<checkboxes.length; i++) 
    {
    // And stick the checked ones onto an array...
        if (checkboxes[i].checked) {
        checkboxesChecked.push(checkboxes[i].value);
           // alert(checkboxes[i].value);
        }
    }
    //get lat
    var lat = "";
     checkboxes = document.getElementsByName("LatRadio");
    for (var i=0; i<checkboxes.length; i++) 
    {
    // And stick the checked ones onto an array...
        if (checkboxes[i].checked) {
        lat = checkboxes[i].value;
        break;
        }
    }
    //get lng
    var lng = "";
    checkboxes = document.getElementsByName("LngRadio");
    for (var i=0; i<checkboxes.length; i++) 
    {
    // And stick the checked ones onto an array...
        if (checkboxes[i].checked) {
        lng = checkboxes[i].value;
        break;
        }
    }
  if( checkboxesChecked.length == 0 || lat == "" || lng == "")
      {
          alert("Please select group/Date/Rate");
          return;
      }
    
    
   ReadSheet( excel_sheet,checkboxesChecked,lat,lng);
}



function ReadSheet( xmlSheet, group_label, lat_label, data_lable)
{
   // console.log( "label length= " + group_label.length);
    var grouptext;
    var lat, date_value;
    group_label.push(lat_label);
    //console.log(group_label, lat_label);

    for(var k=0; k < xmlSheet.length; k++)
    {
       grouptext = "";
        lat = "";
        date_value = 0;
        var row_value = xmlSheet[k];
      
       
        var jsonObj = JSON.stringify(row_value);
        JSON.parse(jsonObj, (key, value) =>
        {
          
            for (var i=0; i<group_label.length; i++) 
                {
                    //console.log( key.trim() + "--" + group_label[i]);
        
                    if( key.trim() == group_label[i].trim())
                    {
                        if(grouptext != "")
                            grouptext += ",";
                        grouptext += value.trim();
                    }
                }
             if(key.trim() == data_lable.trim())
              {
                date_value = value.trim();
              }

        }); 
       // console.log( grouptext + " , " + lat  + " , " + lng);
    

        if(band_marker.has(grouptext) == false)
        {    
        var m = new Array;
        m.push(date_value);
        band_marker.set(grouptext, m);                	
        }
        else
        {
        var m = band_marker.get(grouptext);
         m.push(date_value);
        band_marker.set(grouptext, m);  
        }
    }
 
   GeneratorData();
}

//------------ read xml file ------------------------------
function ExcelExport(event)  {
    console.log("read excel");
    var name;
    var band;

    var tput;
    var lng;
    var lat;

    var index = 0;
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function()
    {
        console.log("load excel");
        var fileData = reader.result;
        var wb = XLSX.read(fileData, {type : 'binary'});
        var sheetName = wb.SheetNames[0]; 
        //之后，使用键值对的方式再把数据从sheet中取出来放到表格中。
        console.log(sheetName);        
        // --------------- read 1st sheet ----------------------------------------------        
        excel_sheet = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
        formatTable( get_header_row( wb.Sheets[sheetName])) ;
    };

    var res = reader.readAsBinaryString(input.files[0]);

    console.log('---------------\n');
}


function get_header_row(sheet) {
    var headers = [];
    var range = XLSX.utils.decode_range(sheet['!ref']);
    var C, R = range.s.r; /* start in the first row */
    /* walk every column in the range */
    for(C = range.s.c; C <= range.e.c; ++C) {
        var cell = sheet[XLSX.utils.encode_cell({c:C, r:R})] /* find the cell in the first row */

        var hdr = "UNKNOWN " + C; // <-- replace with your desired default 
        if(cell && cell.t) hdr = XLSX.utils.format_cell(cell);

        headers.push(hdr);
    }
    return headers;
}


function ShowDays()
{
  // Get the checkbox
  var checkBox = document.getElementById("myCheck");
  // Get the output text
  var text = document.getElementById("text");

  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
}



function showReport(arr, file_name)
{
  var myWindow = window.open("", "MsgWindow", "width=1000,height=1000,menubar=yes,titlebar=yes");
  myWindow.document.write("<p>This is ");
  myWindow.document.write( file_name + " report!</p>");

  for (var n = 0; n < arr.length; n++)
  {
    var chart = arr[n];
    console.log(chart.getImageURI());
     var img  = new Image();
     img.setAttribute('src', chart.getImageURI());
     myWindow.document.body.appendChild(img);
  }
  //myWindow.print();
}
function showDailyReport()
{
  showReport(daily_arr,'daily');
}
function showWeeklyReport()
{
  showReport(weekly_arr,'weekly');
}

function showMonthlyReport()
{
showReport(monthly_arr,'monthly');
}
function ShowWeeksInStack()
{
  
}
function ShowMonthsInStack()
{
  
}
function ShowYearsInStack()
{
  
}

