var splitter, cont1, cont2;
var last_x, window_width;

var heatmap;
var excel_sheet;
var group_list = [];



//band list
var band_list = [];
var band_marker = new Map();




function  DrawCircleInOut( list, in_sub_poly, out_sub_poly,rat, lat1, lat2, lng1,lng2,clr)
{

      var p1 = new google.maps.LatLng(lat1,lng1);
      var p2 = new google.maps.LatLng(lat2,lng1);
      var p3 = new google.maps.LatLng(lat1,lng2);

      var w = google.maps.geometry.spherical.computeDistanceBetween(p1,p2);
      var h = google.maps.geometry.spherical.computeDistanceBetween(p1,p3);

      var nx =  Math.round( w/rat);
      var ny =  Math.round( h/rat);
      var offx = (lat2 - lat1)/ nx;
      var offy = (lng2 - lng1)/ ny;

      console.log(nx,ny,offx,offy);
      

      for(var x=0; x< nx; x++)
      {
        for (var y = 0; y<ny; y++) 
        {
          //Things[i]
          var lat_pos = lat1 + x * offx;
          var lng_pos = lng1 + y * offy;
          var latlng_pos = new google.maps.LatLng(lat_pos,lng_pos);

          if( google.maps.geometry.poly.containsLocation(latlng_pos, in_sub_poly)==false)
          {
              continue;
          }
          if(  google.maps.geometry.poly.containsLocation(latlng_pos, out_sub_poly) == true)
          {
              continue;
          }
          var isCover = false;
          for(var z =0; z< list.length; z++)
          {
              var ll_pos = list[z];
              var h1 = google.maps.geometry.spherical.computeDistanceBetween(latlng_pos,ll_pos);
              if(h1< rat/2)
              {
                isCover = true;
                break;
              }

          }

          if(isCover==false)
          {
        
            var cityCircle = new google.maps.Circle({
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: clr,
              fillOpacity: 0.35,
              map: map,
              center: latlng_pos,
              radius:  rat/2
            });
            
          }
        }

      }
}


function  DrawCircle( list, in_sub_poly,rat, lat1, lat2, lng1,lng2,clr)
{

      var p1 = new google.maps.LatLng(lat1,lng1);
      var p2 = new google.maps.LatLng(lat2,lng1);
      var p3 = new google.maps.LatLng(lat1,lng2);

      var w = google.maps.geometry.spherical.computeDistanceBetween(p1,p2);
      var h = google.maps.geometry.spherical.computeDistanceBetween(p1,p3);

      var nx =  Math.round( w/rat);
      var ny =  Math.round( h/rat);
      var offx = (lat2 - lat1)/ nx;
      var offy = (lng2 - lng1)/ ny;

      

      for(var x=0; x< nx; x++)
      {
        for (var y = 0; y<ny; y++) 
        {
          //Things[i]
          var lat_pos = lat1 + x * offx;
          var lng_pos = lng1 + y * offy;
          var latlng_pos = new google.maps.LatLng(lat_pos,lng_pos);

          if( google.maps.geometry.poly.containsLocation(latlng_pos, in_sub_poly)==false)
          {
              continue;
          }
         
          var isCover = false;
          for(var z =0; z< list.length; z++)
          {
              var ll_pos = list[z];
              var h1 = google.maps.geometry.spherical.computeDistanceBetween(latlng_pos,ll_pos);
              if(h1< rat/2)
              {
                isCover = true;
                break;
              }

          }

          if(isCover==false)
          {
            /*console.log("dd", lat_pos,lng_pos);*/
            var cityCircle = new google.maps.Circle({
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: clr,
              fillOpacity: 0.35,
              map: map,
              center: latlng_pos,
              radius:  rat/2
            });
            
          }
        }

      }
}



function  DrawExistCircle( list, in_sub_poly,rat, lat1, lat2, lng1,lng2,clr)
{

      var p1 = new google.maps.LatLng(lat1,lng1);
      var p2 = new google.maps.LatLng(lat2,lng1);
      var p3 = new google.maps.LatLng(lat1,lng2);

      var w = google.maps.geometry.spherical.computeDistanceBetween(p1,p2);
      var h = google.maps.geometry.spherical.computeDistanceBetween(p1,p3);

      var nx =  Math.round( w/rat);
      var ny =  Math.round( h/rat);
      var offx = (lat2 - lat1)/ nx;
      var offy = (lng2 - lng1)/ ny;

      for(var z =0; z< list.length; z++)
      {
          var ll_pos = list[z];             

          var cityCircle = new google.maps.Circle({            
          center: ll_pos,
          radius:  rat/2
          });

      }
      

     
}


function DrawCircleExcel(sheet) 
{
  console.log("start" ,excel_sheet.length);


  var triangleCoords = [
            //{lat:43.673674, lng:-79.425337},//43.673674, -79.425337
            
            {lat:43.58196, lng:-79.54477},   
            {lat:43.75192, lng:-79.636296}, 
            {lat:43.85472, lng:-79.171026},   
            {lat:43.79401, lng:-79.118304},      
                      
            {lat:43.58196, lng:-79.54477}
        ];

  // Construct the polygon.
  var bermudaTriangle = new google.maps.Polygon({
    paths: triangleCoords
  });

  var triangleCoords2 = [
      //{lat:43.673674, lng:-79.425337},//43.673674, -79.425337
      {lat:43.68196, lng:-79.44477},   
      {lat:43.85192, lng:-79.536296}, 
      {lat:43.95472, lng:-79.071026},   
      {lat:43.89401, lng:-79.018304}, 
      {lat:43.68196, lng:-79.44477}
     // {lat:43.709606, lng:-79.351491}
  ];

  var bermudaTriangle2 = new google.maps.Polygon({
    paths: triangleCoords2
  });


  var heat_points = [];
  var heat_points2 = [];
  var ll = 300;

   for(var k=0; k < excel_sheet.length; k++)
    {
       grouptext = "";
        lat = "";
        lng = "";
        var row_value = excel_sheet[k];
      
       
        var jsonObj = JSON.stringify(row_value);
         JSON.parse(jsonObj, (key, value) =>
            {
              
               
                  if( key.trim() == "CoordX" )
                  {
                    lat = value.trim();
                  }
                  else if(key.trim() == "CoordY")
                  {
                    lng = value.trim();
                  }

            }); 
          var pos = new google.maps.LatLng(lng,lat);
         if( google.maps.geometry.poly.containsLocation(pos, bermudaTriangle))
         { 
            heat_points.push(pos);
         }
         if( google.maps.geometry.poly.containsLocation(pos, bermudaTriangle2))
         { 
            heat_points2.push(pos);
         }

        
         
        
      }
      console.log("end" ,excel_sheet.length);

      //lat:43.650315,  lng:-79.338747
      //lat:43.709606.  lng:-79.440355

     
      var res = getCorner(triangleCoords);     
      DrawCircleInOut(heat_points,bermudaTriangle,bermudaTriangle2, ll, res[0],res[1],res[2],res[3], "blue");
 
      ll = 200;
      res = getCorner(triangleCoords2);     
      DrawCircle(heat_points2,bermudaTriangle2,ll, res[0],res[1],res[2],res[3],"yellow");
      console.log("finished job"); 
}


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
    var ll = new Array();
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

      ll.push( new google.maps.LatLng(lat, lng))
			                        
			grouptext = "";       
				
				
    }

    heatmap = new google.maps.visualization.HeatmapLayer({
          data: ll,
          map: map
        });
    heatmap.set('radius',  20);
    heatmap.set('opacity', 0.2);
    heatmap.setMap( map);

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
        //formatTable( get_header_row( wb.Sheets[sheetName])) ;
        console.log("DrawCircleExcel");
        DrawCircleExcel(wb.Sheets[sheetName]);
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