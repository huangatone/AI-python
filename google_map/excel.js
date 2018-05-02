var splitter, cont1, cont2;
var last_x, window_width;
var map;
var excel_sheet;
var group_list = [];

var clr=[];

//band list
var band_list = [];
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

console.log("Open and Close");
    var panel = document.getElementById('menu2');
    console.log(panel);
    panel.style.display = "block"; 
    panel = document.getElementById('menu1');
    panel.style.display = "none"; 
    panel = document.getElementById('menu3');
    panel.style.display ="block"; 
  
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
      //create map selector first row;
    var table =document.getElementById("mapTable");

    //for(var i = table.rows.length -1; i > 0; i--)
//{
  //  table.deleteRow(i);
//}

for (var x=table.rows.length; x>0; x--) {

    table.deleteRow(0);
}
  //table.innerHTML = "";


    var tr = document.createElement('tr');
    
    for (var i=0; i<checkboxesChecked.length; i++) 
        {
            var td = document.createElement('td'); 
            td.appendChild( document.createTextNode( checkboxesChecked[i]) );
            tr.appendChild(td);
        }
   
    var td1 = document.createElement('td');
    td1.appendChild ( document.createTextNode("Color"));    
    tr.appendChild(td1);
    
    td1 = document.createElement('td');
    td1.appendChild ( document.createTextNode("Show"));    
    tr.appendChild(td1);
    
    table.appendChild(tr);
    
   ReadSheet( excel_sheet,checkboxesChecked,lat,lng);
}

function create_map_elements( group){
    //console.log("All items" + group);
    var table =document.getElementById("mapTable");

    var data_t = new google.visualization.DataTable();
    data_t.addColumn('string', 'Group');
    data_t.addColumn('number', 'Account');

    band_list.sort();
    var index = 0;
     band_list.forEach( function(element) {
         
             var tr = document.createElement('tr');
             console.log("group item = " + element);
             var g = element;
             var res = g.split("==="); 
             var thisgroup = band_marker.get(g);

            console.log("no 1--------"+ thisgroup .length + g);  

            var group_name_lable = "";

             for(var j=0; j < res.length; j++)
                 {
                    var td = document.createElement('td'); 
                    td.appendChild( document.createTextNode( res[j]) );
                    tr.appendChild(td);
                    group_name_lable += res[j] + " ";
                 }
             var td = document.createElement('td'); 
             var clr_btn = document.createElement('input');
             clr_btn.type = "color";
             clr_btn.value = clr[index];
             //clr_btn.addEventListener("change", watchColorPicker, false);
             clr_btn.onchange = function()
             {
                   for (var i = 0; i < thisgroup.length; i++)
                  {
                      thisgroup[i].setIcon(getCircle(3.0,clr_btn.value));
                  }
             };

             index +=1;


             td.appendChild( clr_btn );
             tr.appendChild(td);
             
             td = document.createElement('td'); 

             var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = "name";
            checkbox.value = g;
            checkbox.id = "id";
             
			 
             
			
      			 checkbox.onclick = function() {
      				handleClick(this, thisgroup);
      				// access properties using this keyword   
      				console.log("no 0---------"+ thisgroup .length + g);    
      			};
		
		
             td.appendChild(checkbox);
             td.appendChild( document.createTextNode( thisgroup.length ));
             tr.appendChild(td);
             //<input type="color" id="myColor">
             
              table.appendChild(tr);

              data_t.addRow([group_name_lable,thisgroup.length]);
         });
		 

     var data = data_t;

        var options = {
          title: 'Chart - '
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);


        var panel = document.getElementById('menu2');
    console.log(panel);
    panel.style.display = "none"; 

	
}

function ReadSheet( xmlSheet, group_label, lat_label, lng_lable)
{
   // console.log( "label length= " + group_label.length);
    var grouptext;
    var lat, lng;
    group_list = [];
    for(var k=0; k < xmlSheet.length; k++)
        {
           grouptext = "";
            lat = "";
            lng = "";
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
                                grouptext += "===";
                            grouptext += value.trim();
                        }
                    }
                  if( key.trim() == lat_label.trim() )
                  {
                    lat = value.trim();
                  }
                  else if(key.trim() == lng_lable.trim())
                  {
                    lng = value.trim();
                  }

            }); 
           // console.log( grouptext + " , " + lat  + " , " + lng);
           // group_list.push(grouptext);
			
			 if(band_list.indexOf(grouptext) <= -1)
			{
				band_list.push(grouptext);
				var m = [];
				band_marker.set(grouptext, m);                	
			}

			createMarker(band_marker.get(grouptext),name,lng,lat,clr[band_list.indexOf(grouptext)]);
			                        
			grouptext = "";       
				
				
        }
   create_map_elements(band_list);
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


 function drawChart() {

 //google.charts.load('current', {'packages':['corechart']});
   //   google.charts.setOnLoadCallback(drawChart);

        
      }
/*
var index;
var a = ["a", "b", "c"];
for (index = a.length - 1; index >= 0; --index) {
    console.log(a[index]);
}

for (key in a) {
}


moMarker.setIcon({
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#00F",
            fillOpacity: 0.8,
            strokeWeight: 1
        })
*/