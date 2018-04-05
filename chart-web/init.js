var splitter, left_div, right_div;
var last_x, window_width;
var map;

var hsplitter, top_div, bom_div;

function init() {
     drawChart();
    initColor();
  
}

function initMap()
{
    //<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCQMC-XDcbgfPtySwq9J4AL2uG8tZXuTUo&callback=initMap"></script>
   map = new google.maps.Map(document.getElementById('div2'), {
    zoom: 6,
    center: {lat:43.643794, lng:-79.613486}
    });
}

function initColor()
{
  clr.push("#ff0000");
  clr.push("#0000ff");
  clr.push("#3cb371 ");
  clr.push("#ee82ee");
  clr.push("#ffa500");
  clr.push("#6a5acd"); 

  for(var k=0; k<50; k++)
    {
    // 0 - 10
      clr.push(  '#'+Math.floor(Math.random()*16777215).toString(16) );
    }

}

function getCircle(magnitude,c)
{
    return {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: c,
      fillOpacity: .6,
      scale: Math.pow(2, magnitude) / 2,
      strokeColor: 'white',
      strokeWeight: .5
    };
}

//create a marker
function createMarker(group,name,lng,lat,c)
{
    var latLng = new google.maps.LatLng(  lat,lng);
    var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    var marker = new google.maps.Marker({
            position: latLng,
            map: null,
            label: null,
            icon: getCircle(3.0,c)
          });

    var infowindow = new google.maps.InfoWindow({
      content: "test information"
    });

    marker.addListener('click', function() {
      map.setZoom(8);
      map.setCenter(marker.getPosition());
      infowindow.open(marker.get('map'), marker);
    });

    group.push(marker);
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
 
    showMarkers(group,p);
}
// Removes/shows the markers from the map, but keeps them in the array.
function showMarkers(group,m)
{
  console.log("click len = " + group.length);
    for (var i = 0; i < group.length; i++)
    {
        group[i].setMap(m);
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

  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        console.log("Clicked");
          this.classList.toggle("active");
          var nx = this.attributes[1].value; 
          console.log(nx);
          var panel = document.getElementById(nx);
          if (panel.style.display === "block") {
              panel.style.display = "none";
          } else {
              panel.style.display = "block";
          }
          console.log(panel.style.display);
      });
  }
}
function watchColorPicker(event) {
    //alert("color");
   //   document.querySelectorAll("p").forEach(function(p) {
   //     p.style.color = event.target.value;
   //   });
}