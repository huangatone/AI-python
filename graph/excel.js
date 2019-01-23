//------------ read xml file ------------------------------
var headers = [];
var excel_sheet;
var column_map = new Map();
var group_label = ""


//-------------------


function ReadSheet( xmlSheet, group_label, data1, data2)
{
   
   //GeneratorData();
}
//------------
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
        get_header_row( wb.Sheets[sheetName]);
        
        console.log(headers);
        
        formatTable( headers) ;
    };

    var res = reader.readAsBinaryString(input.files[0]);

    console.log('---------------\n');
}


function get_header_row(sheet) {
    
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

function formatTable( headers )
{
    var table =document.getElementById("paremeterTable");
    //add group
    var tr = document.createElement('tr');
    var td = document.createElement('td');  
  
    
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
        
    });
    table.appendChild(tr);  
   
}

function build_chart(lb,value1,value2)
{

    var data_ss = []
    data_ss.push(lb);
    for (var [key, value] of column_map) {
      
        data_ss.push(value);
    }
    
  var chart = c3.generate({
    bindto: '#div2',
   
    data: {
        x: 'x',
        columns: data_ss
    },
        
    axis: {
        x: {
            type: 'category',
            tick: {
           //     rotate: 75,
                multiline: false
            },
            height: 130
        }
    }
    
});
}

function build_line_chat(lb)
{
    var cc = document.getElementById('b');
   
    var dv = document.createElement('div');
    dv.setAttribute("id", "line_chart_div");
    dv.setAttribute("class","Chart_Div");
    //dv.setAttribute("style", "height:320;width:400px;background-color:teal;float:left;padding:0;");
    cc.appendChild(dv);
    
    var data_ss = []
    data_ss.push(lb);
    for (var [key, value] of column_map) {      
        data_ss.push(value);
    }
    
  var chart = c3.generate({
    bindto: '#line_chart_div',
   
    data: {
        x: 'x',
        columns: data_ss
    },
        
    axis: {
        x: {
            type: 'category',
            tick: {
           //     rotate: 75,
                multiline: false
            },
            height: 130
        }
    }
    
  });
}

function build_pie_chart(lb)
{
    console.log("build_pie_chart");
    var cc = document.getElementById('b');
   
    var dv = document.createElement('div');
    dv.setAttribute("id", "par_chart_div");
    dv.setAttribute("class","Chart_Div");
    //dv.setAttribute("style", "height:320;width:400px;background-color:teal;float:left;padding:0;");
    cc.appendChild(dv);
    
    var data_ss = []
    data_ss.push(lb);
    for (var [key, value] of column_map) {     
        data_ss.push(value);
    }
    
  var chart = c3.generate({
    bindto: '#par_chart_div',
   
    data: {
       
        columns: data_ss,
        type : 'pie',
    }
    
  });
}

function build_time_chart(lb)
{
    var cc = document.getElementById('b');
   
    var dv = document.createElement('div');
    dv.setAttribute("id", "time_chart_div");
    dv.setAttribute("class","Chart_Div");
    //dv.setAttribute("style", "height:320;width:400px;background-color:teal;float:left;padding:0;");
    cc.appendChild(dv);
}

function build_spine_chart(lb)
{
    console.log("build_spine_chart");
    var cc = document.getElementById('b');
   
    var dv = document.createElement('div');
    dv.setAttribute("id", "spine_chart_div");
    dv.setAttribute("class","Chart_Div");
    //dv.setAttribute("style", "height:320;width:400px;background-color:teal;float:left;padding:0;");
    cc.appendChild(dv);
    
    var data_ss = []
    data_ss.push(lb);
    for (var [key, value] of column_map) {
      
        data_ss.push(value);
    }
    
  var chart = c3.generate({
    bindto: '#spine_chart_div',
   
    data: {
        x: 'x',
        columns: data_ss,
        type: 'spline'
    },
        
    axis: {
        x: {
            type: 'category',
            tick: {
           //     rotate: 75,
                multiline: false
            },
            height: 130
        }
    }
    
});
}

function build_step_chart(lb)
{
    var cc = document.getElementById('b');
   
    var dv = document.createElement('div');
    dv.setAttribute("id", "step_chart_div");
    dv.setAttribute("class","Chart_Div");
    //dv.setAttribute("style", "height:320;width:400px;background-color:teal;float:left;padding:0;");
    cc.appendChild(dv);
    
    
    var data_ss = []
    data_ss.push(lb);
    for (var [key, value] of column_map) {
     
        data_ss.push(value);
    }
    
  var chart = c3.generate({
    bindto: '#step_chart_div',
   
    data: {
      
        columns: data_ss,
        type: 'step'
    }
    
});
    
}

function build_area_chart(lb)
{
    var cc = document.getElementById('b');
   
    var dv = document.createElement('div');
    dv.setAttribute("id", "area_chart_div");
    dv.setAttribute("class","Chart_Div");
    //dv.setAttribute("style", "height:320;width:400px;background-color:teal;float:left;padding:0;");
    cc.appendChild(dv);
    
     var data_ss = []
    data_ss.push(lb);
    for (var [key, value] of column_map) {
    
        data_ss.push(value);
    }
    
  var chart = c3.generate({
    bindto: '#area_chart_div',
   
    data: {
      
        columns: data_ss,
        type: 'area'
    }
    
});
}

function build_stackarea_chart(lb)
{
    var cc = document.getElementById('b');
   
    var dv = document.createElement('div');
    dv.setAttribute("id", "stackarea_chart_div");
    dv.setAttribute("class","Chart_Div");
    //dv.setAttribute("style", "height:320;width:400px;background-color:teal;float:left;padding:0;");
    cc.appendChild(dv);
    
     var data_ss = []
    data_ss.push(lb);
    for (var [key, value] of column_map) {
     
        data_ss.push(value);
    }
    
  var chart = c3.generate({
    bindto: '#stackarea_chart_div',
   
    data: {
      
        columns: data_ss,
        type: 'area-spline'
    }
    
});
}

function build_bar_chart(lb)
{
    var cc = document.getElementById('b');
   
    var dv = document.createElement('div');
    dv.setAttribute("id", "bar_chart_div");
    dv.setAttribute("class","Chart_Div");
    //dv.setAttribute("style", "height:320;width:400px;background-color:teal;float:left;padding:0;");
    cc.appendChild(dv);
    var data_ss = []
    data_ss.push(lb);
    for (var [key, value] of column_map) {
    
        data_ss.push(value);
    }
    
  var chart = c3.generate({
    bindto: '#bar_chart_div',
   
    data: {
      
        columns: data_ss,
        type: 'bar'
    }
    
});
}

function build_stackbar_chart(lb)
{
    var cc = document.getElementById('b');
   
    var dv = document.createElement('div');
    dv.setAttribute("id", "stackbar_chart_div");
    dv.setAttribute("class","Chart_Div");
    //dv.setAttribute("style", "height:320;width:400px;background-color:teal;float:left;padding:0;");
    cc.appendChild(dv);
    
    var data_ss = []
    data_ss.push(lb);
    for (var [key, value] of column_map) {
    
        data_ss.push(value);
    }
    
  var chart = c3.generate({
    bindto: '#stackbar_chart_div',
   
    data: {
      
        columns: data_ss,
        type: 'area-spline'
    }
    
});
    
}

function build_scatter_chart(lb)
{
    var cc = document.getElementById('b');
   
    var dv = document.createElement('div');
    dv.setAttribute("id", "scatter_chart_div");
    dv.setAttribute("class","Chart_Div");
    //dv.setAttribute("style", "height:320;width:400px;background-color:teal;float:left;padding:0;");
    cc.appendChild(dv);
    
    var data_ss = []
    data_ss.push(lb);
    for (var [key, value] of column_map) {
    
        data_ss.push(value);
    }
    
  var chart = c3.generate({
    bindto: '#scatter_chart_div',
   
    data: {
      
        columns: data_ss,
        type: 'scatter'
    }
    
});
}

function build_donut_chart(lb)
{
    var cc = document.getElementById('b');
   
    var dv = document.createElement('div');
    dv.setAttribute("id", "donut_chart_div");
    dv.setAttribute("class","Chart_Div");
    //dv.setAttribute("style", "height:320;width:400px;background-color:teal;float:left;padding:0;");
    cc.appendChild(dv);
    
    var data_ss = []
    data_ss.push(lb);
    for (var [key, value] of column_map) {
      
        data_ss.push(value);
    }
    
  var chart = c3.generate({
    bindto: '#donut_chart_div',
   
    data: {
      
        columns: data_ss,
        type: 'donut'
    }
    
});
}

function build_gauge_chart(lb)
{
    var cc = document.getElementById('b');
   
    var dv = document.createElement('div');
    dv.setAttribute("id", "gauge_chart_div");
    dv.setAttribute("class","Chart_Div");
    //dv.setAttribute("style", "height:320;width:400px;background-color:teal;float:left;padding:0;");
    cc.appendChild(dv);
    var data_ss = []
    data_ss.push(lb);
    for (var [key, value] of column_map) {
      
        data_ss.push(value);
    }
    
  var chart = c3.generate({
    bindto: '#gauge_chart_div',
   
    data: {
      
        columns: data_ss,
        type: 'gauge'
    }
    
});
}

function build_Combination_chart(lb)
{
    var cc = document.getElementById('b');
   
    var dv = document.createElement('div');
    dv.setAttribute("id", "Combination_chart_div");
    dv.setAttribute("class","Chart_Div");
    //dv.setAttribute("style", "height:320;width:400px;background-color:teal;float:left;padding:0;");
    cc.appendChild(dv);
}
function build_map_chart(lb)
{
    var cc = document.getElementById('b');
   
    var dv = document.createElement('div');
    dv.setAttribute("id", "spine_chart_div");
    dv.setAttribute("class","Chart_Div");
    //dv.setAttribute("style", "height:320;width:400px;background-color:teal;float:left;padding:0;");
    cc.appendChild(dv);
}





function build_choise()
{
    var checkboxes = document.getElementsByName("GroupCK");
    var col_selected = [];
    // loop over them all
    for (var i=0; i<checkboxes.length; i++) 
    {
    // And stick the checked ones onto an array...
        if (checkboxes[i].checked) {
        col_selected.push(checkboxes[i].value);
           // alert(checkboxes[i].value);
        }
    }
    group_label = checkboxes[0].value;
    
   
    var lb=[]; 
    lb.push('x');
    var value1=[];
    //value1.push('v1');// "v1";
    var value2 =[];
    //value2.push('v2');
   
    var lat, date_value;
   
    //console.log(group_label, lat_label);

    for(var k=0; k < excel_sheet.length; k++)
    {
       
        var row_value = excel_sheet[k];
       
        var jsonObj = JSON.stringify(row_value);
        JSON.parse(jsonObj, (key, value) =>
        {
          var key_str = key.trim();
          var date_value = value;
          if( key_str == group_label)
            {
                lb.push(  value.trim());
            }
            else
            {
                for (var i=0; i<col_selected.length; i++) 
                {
                    if( key_str == col_selected[i].trim())
                    {
                       if(column_map.has(key_str) == false)
                        {    
                            var m = [];
                             m.push(key_str);
                            m.push(date_value);
                            column_map.set(key_str, m);                	
                        }
                        else
                        {
                            var m = column_map.get(key_str);
                             m.push(date_value);
                            column_map.set(key_str, m);  
                        }
                    }
                }
            }
            
          
        }); 
    }
    
   
    
    var ck = document.getElementById("line_chat_ck");
    if (ck.checked)
    {
        build_line_chat(lb);
    }
    ck = document.getElementById("pie_chart_ck");
    if (ck.checked)
    {
        build_pie_chart(lb);
    }
    ck = document.getElementById("time_chart_ck");
    if (ck.checked)
    {
       // build_time_chart(lb);
    }
    ck = document.getElementById("spine_chart_ck");
    if (ck.checked)
    {
        build_spine_chart(lb);
    }
    ck = document.getElementById("step_chart_ck");
    if (ck.checked)
    {
        build_step_chart(lb);
    }
    ck = document.getElementById("area_chart_ck");
    if (ck.checked)
    {
        build_area_chart(lb);
    }
    ck = document.getElementById("stackarea_chart_ck");
    if (ck.checked)
    {
        build_stackarea_chartt(lb);
    }
    ck = document.getElementById("bar_chart_ck");
    if (ck.checked)
    {
        build_bar_chart(lb);
    }
    ck = document.getElementById("scatter_chart_ck");
    if (ck.checked)
    {
        //build_scatter_chart(lb);
    }
    ck = document.getElementById("donut_chart_ck");
    if (ck.checked)
    {
        build_donut_chart(lb);
    }
    ck = document.getElementById("gauge_chart_ck");
    if (ck.checked)
    {
        build_gauge_chart(lb);
    }
    ck = document.getElementById("Combination_chart_ck");
    if (ck.checked)
    {
        //build_Combination_chart(lb);
    }
    ck = document.getElementById("map_chart_ck");
    if (ck.checked)
    {
        //build_map_chart(lb);
    }
}
