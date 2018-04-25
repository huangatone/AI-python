
var excel_sheet;

var clr=[];

var band_marker = new Map();


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
   var n1,n2,n3;

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

       n1 = 0;
       n2 = 0; 
       n3 = 0;


        //console.log(key, lt_value.length);
        for (let i=0; i<value.length; i++) 
        {
          var result = parseFloat(value[i]) / 100.0;
          //console.log(lt_value[i], result);
          if( result < 0.75)
            n1 +=1;
          else if( result < 0.80)
            n2 +=1;
          else
            n3 +=1;
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
        //console.log("date = " + g[g.length-1]);
        var wk_key = group_key + "," + wk.toString();

        if(weekly_map.has(group_key) == false)
        {    
            var new_map = new Map(); 
            new_map.set(wk_key,value);   
            weekly_map.set(group_key, new_map); 
        }
        else
        {

            var new_map = weekly_map.get(group_key); 

            if( new_map.has(wk_key))
            {
              var o_v = new_map.get(wk_key);
              o_v.push(value);
              new_map.set(wk_key,o_v); 
              weekly_map.set(group_key, new_map); 
            }
            else
            {
              new_map.set(wk_key,value); 
              weekly_map.set(group_key, new_map); 
            }
            
        }




        var month =  g[g.length-1].split("/")[0];
        //console.log("date = " + g[g.length-1]);
        var month_key = group_key + "," + month.toString();

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
              o_v.push(value);
              new_map.set(month_key,o_v); 
              monthly_map.set(group_key, new_map); 
            }
            else
            {
              new_map.set(month_key,value); 
              monthly_map.set(group_key, new_map); 
            }
            
        }


   }

     for (var [key, value] of daily_map.entries()) 
     {
       build_chart(key, value,"day_div");       
     }

   //get weekly report;
   for (var [key, value] of weekly_map.entries()) 
     {
       build_week_chart(key, value,"week_div");       
     }

   //get monthly report;
   for (var [key, value] of monthly_map.entries()) 
     {
       build_week_chart(key, value,"month_div");       
     }


   

}



function build_week_chart(title_text ,data_map, div_name)
{

  var data_day = new google.visualization.DataTable();
   data_day.addColumn('string', 'Date');
   data_day.addColumn('number', 'Good');
   data_day.addColumn('number', 'Bad');
   data_day.addColumn('number', 'worst'); 

    console.log(title_text ,data_map);

  for (var [key, value] of data_map.entries()) 
   {
        //console.log(key + ' = ' + value);
        var g = key.split(",");        
        //print(g);
        //console.log(g);

        var lt_value = value;

        var n1,n2,n3;
        n1 = 0;
        n2 = 0; 
        n3 = 0;

        //console.log(key, lt_value.length);
        for (let i=0; i<lt_value.length; i++) 
        {
          var result = parseFloat(lt_value[i]) / 100.0;
          //console.log(lt_value[i], result);
          if( result < 0.75)
            n1 +=1;
          else if( result < 0.80)
            n2 +=1;
          else
            n3 +=1;
        }

        data_day.addRow([ g[g.length-1],n1,n2,n3]);
       
    }

    var options = {
       isStacked: true,
        width: 400,
        height: 320,
        seriesType: 'bars',
        legend: { position: 'top', maxLines: 4 },
        bar: { groupWidth: '25%' },
              
        title: title_text,
        
        vAxis: {
            viewWindow: {
                min: 0,
                max: 100
            }
        }, 
        hAxis: { 
        direction: -1, 
        slantedText: true, 
        slantedTextAngle: 90 // here you can even use 180 
    }   
         
       
      };



    var cc = document.getElementById(div_name);
    
    var dv = document.createElement('div');
    dv.setAttribute("id", "day_div_1");
    dv.setAttribute("class","split content");
    dv.setAttribute("style", "height:320;width:400px;background-color:teal;float:left;padding:0;");
    cc.appendChild(dv);
      
      var chart = new google.visualization.ComboChart(dv);

      chart.draw(data_day, options);
}


function build_chart(title_text ,data_map, div_name)
{

  var data_day = new google.visualization.DataTable();
   data_day.addColumn('string', 'Date');
   data_day.addColumn('number', 'Good');
   data_day.addColumn('number', 'Bad');
   data_day.addColumn('number', 'worst'); 

 //   console.log(title_text ,data_map);

  for (var [key, value] of data_map.entries()) 
   {
        //console.log(key + ' = ' + value);
        var g = key.split(",");        
        //print(g);
        //console.log(g);

        var lt_value = value;

        var n1,n2,n3;
        n1 = 0;
        n2 = 0; 
        n3 = 0;

        //console.log(key, lt_value.length);
        for (let i=0; i<lt_value.length; i++) 
        {
          var result = parseFloat(lt_value[i]) / 100.0;
          //console.log(lt_value[i], result);
          if( result < 0.75)
            n1 +=1;
          else if( result < 0.80)
            n2 +=1;
          else
            n3 +=1;
        }

        data_day.addRow([ g[g.length-1],n1,n2,n3]);
       
    }

    var options = {
       isStacked: true,
        width: 400,
        height: 320,
        seriesType: 'bars',
        legend: { position: 'top', maxLines: 4 },
        bar: { groupWidth: '25%' },
              
        title: title_text,
        
        vAxis: {
            viewWindow: {
                min: 0,
                max: 100
            }
        }, 
        hAxis: { 
        direction: -1, 
        slantedText: true, 
        slantedTextAngle: 90 // here you can even use 180 
    }   
         
       
      };



    var cc = document.getElementById(div_name);
    
    var dv = document.createElement('div');
    dv.setAttribute("id", "day_div_1");
    dv.setAttribute("class","split content");
    dv.setAttribute("style", "height:320;width:400px;background-color:teal;float:left;padding:0;");
    cc.appendChild(dv);
      
      var chart = new google.visualization.ComboChart(dv);

      chart.draw(data_day, options);
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
          alert("Please select group/lat/lng");
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



function ShowWeeks()
{
  
}
function ShowMonths()
{
  
}
function ShowYears()
{
  
}

function ShowDaysInStack()
{

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

