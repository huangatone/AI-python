var splitter, left_div, right_div;
var last_x, window_width;
var map;

var hsplitter, top_div, bom_div;
var clr=[];

function init() {
   
  //build_chart();
}

 //checkbox click event
function handleClick(cb,group)
{
    var p = null;
    console.log("clicked");
    if(cb.checked)
    {
        p = map;
    }
 
 
}


function resetPosition(nowX)
{
    var dx=nowX-last_x;
    dx+=left_div.clientWidth;
    left_div.style.width=dx+"px";
    splitter.style.marginLeft=dx+"px";
    dx+=splitter.clientWidth;
    right_div.style.marginLeft=dx+"px";
    dx=window_width-dx;
    right_div.style.width=dx+"px";
    last_x=nowX;
    google.maps.event.trigger(map, "resize");
}
  


function spMouseDown(e)
    {
    splitter.removeEventListener("mousedown",spMouseDown);
    window.addEventListener("mousemove",spMouseMove);
    window.addEventListener("mouseup",spMouseUp);
    last_x=e.clientX;
}

function spMouseUp(e)
    {
    window.removeEventListener("mousemove",spMouseMove);
    window.removeEventListener("mouseup",spMouseUp);
    splitter.addEventListener("mousedown",spMouseDown);
    resetPosition(last_x);
}

function spMouseMove(e)
    {
    resetPosition(e.clientX);
}

function resetPosition(nowX)
    {
    var dx=nowX-last_x;
    dx+=left_div.clientWidth;
    left_div.style.width=dx+"px";
    splitter.style.marginLeft=dx+"px";
    dx+=splitter.clientWidth;
    right_div.style.marginLeft=dx+"px";
    dx=window_width-dx;
    right_div.style.width=dx+"px";
    last_x=nowX;   
} 
function initMenu()
{

  
}


