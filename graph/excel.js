//------------ read xml file ------------------------------
var headers = [];
var excel_sheet;

//-------------------


function ReadSheet( xmlSheet, group_label, data1, data2)
{
   // console.log( "label length= " + group_label.length);
    var lb=[]; 
    lb.push('x');
    var value1=[];
    value1.push('v1');// "v1";
    var value2 =[];
    value2.push('v2');
   
    var lat, date_value;
   
    //console.log(group_label, lat_label);

    for(var k=0; k < xmlSheet.length; k++)
    {
       
        var row_value = xmlSheet[k];
       
        var jsonObj = JSON.stringify(row_value);
        JSON.parse(jsonObj, (key, value) =>
        {
          
            if( key.trim() == group_label)
            {
                lb.push( "\'" + value.trim() +"\'");
            }
             if(key.trim() == data1.trim())
              {
                value1.push( value.trim());
              }
            if(key.trim() == data2.trim())
              {
                value2.push( value.trim());
              }

        }); 
    }
 console.log( lb + " , " + value1  + " , " + value2);
    
    var chart = c3.generate({
    bindto: '#div2',
    //data: {
    //    rows: [
    //        lb,
    //        value1,
    //        value2
    //    ]
   // },
    data: {
        x: 'x',
        columns: [
            lb,
            value1,
            value2
        ]
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
   
    for(var n=0; n< 3; n++)
        {
             var tr1 = document.createElement('tr');
            var g1 = document.createElement('td'); 
            var c1 = document.createElement("INPUT");
            c1.setAttribute("type", "checkbox");
            c1.name = "c1";
            c1.value = 1;

            var x1  = document.createElement('td');  
            var x_c1 = document.createElement("SELECT");
            x_c1.setAttribute("id", "x_c"+n.toString());
            var y1 = document.createElement('td'); 
            var y_c1 = document.createElement("SELECT");
            y_c1.setAttribute("id", "y_c"+n.toString());
            
            console.log("y_c"+n.toString());

            g1.appendChild(c1);
            x1.appendChild(x_c1);
            y1.appendChild(y_c1);
            tr1.appendChild(g1);
            tr1.appendChild(x1);
            tr1.appendChild(y1);
            table.appendChild(tr1);  
            
            
            var  opt = document.createElement('option');
                opt.value = 0;
                opt.innerHTML = "";
                x_c1.appendChild(opt);
                
                var  opt1 = document.createElement('option');
                opt1.value = 0;
                opt1.innerHTML = "";
                y_c1.appendChild(opt1);
                
            headers.forEach(function(h)
            {
                
                var  opt = document.createElement('option');
                opt.value = 0;
                opt.innerHTML = h;
                x_c1.appendChild(opt);
                
                var  opt1 = document.createElement('option');
                opt1.value = 0;
                opt1.innerHTML = h;
                y_c1.appendChild(opt1);


            });
     }
   
}

function build_chart()
{
  var chart = c3.generate({
    bindto: '#div2',
    data: {
        x: 'x',
        columns: [
           ['x', 'aa', 'bb', 'cc', 'dd', 'ee', 'ff'],
  //          ['x', '20130101', '20130102', '20130103', '20130104', '20130105', '20130106'],
            ['data1', "30", "200", "100", "400", "150", "250"],
            ['data2', '130', '340', '200', '500', '250', '350']
        ]
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
function build_line_chat()
{
    
}

function build_pie_chart()
{
    
}

function build_time_chart()
{
    
}

function build_spine_chart()
{
    
}

function build_step_chart()
{
    
}

function build_area_chart()
{
    
}

function build_stackarea_chart()
{
    
}

function build_bar_chart()
{
    
}

function build_stackbar_chart()
{
    
}

function build_scatter_chart()
{
    
}

function build_donut_chart()
{
    
}

function build_gauge_chart()
{
    
}

function build_Combination_chart()
{
    
}






function build_choise()
{
    var x_c1 = document.getElementById("x_c0");
    var y_c1 = document.getElementById("y_c0");
    var v1 =x_c1.options[x_c1.selectedIndex].text;
    console.log(v1);
    var v2 =y_c1.options[y_c1.selectedIndex].text;
    console.log(v2);
    ReadSheet(excel_sheet,"label",v1,v2);
}
