var splitter, left_div, right_div;
var last_x, window_width;
var map;

var hsplitter, top_div, bom_div;
var clr=[];

function init() {
    // drawChart();
    initColor();
  
}



function initGoogleMap()
{
  map = new google.maps.Map(document.getElementById('div2'), {
    zoom: 9,
    center: {lat:43.667625, lng:-79.367928}
    });


  var triangleCoords = [
            //{lat:43.673674, lng:-79.425337},//43.673674, -79.425337
            {lat:43.75192, lng:-79.636296},
            {lat:43.58196, lng:-79.54477},           
                      
            {lat:43.79401, lng:-79.118304},
            {lat:43.85472, lng:-79.171026},  
            {lat:43.75192, lng:-79.636296}
           // {lat:43.709606, lng:-79.351491}
        ];

var triangleCoords2 = [
            //{lat:43.673674, lng:-79.425337},//43.673674, -79.425337
            {lat:43.85192, lng:-79.536296},
            {lat:43.68196, lng:-79.44477},           
                      
            {lat:43.89401, lng:-79.018304},
            {lat:43.95472, lng:-79.071026},  
            {lat:43.85192, lng:-79.536296}
           // {lat:43.709606, lng:-79.351491}
        ];
        // Construct the polygon.
        var bermudaTriangle = new google.maps.Polyline({
          path: triangleCoords,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        bermudaTriangle.setMap(map);


        var bermudaTriangle2 = new google.maps.Polyline({
          path: triangleCoords2,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        bermudaTriangle2.setMap(map);
//getCorner(triangleCoords2);


         // Construct the polygon, including both paths.
        


       /* var pos1 = new google.maps.LatLng(43.709606,-79.351491);
        var pos2 = new google.maps.LatLng(43.668917,-79.338747);
        console.log( google.maps.geometry.spherical.computeDistanceBetween(pos1,pos2) );


         var lct_pos = new google.maps.LatLng(43.748015, -79.347933);

        var cityCircle = new google.maps.Circle({
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FF0000',
              fillOpacity: 0.35,
              map: map,
              center: lct_pos,
              radius:  100
            });*/



}


function getCorner( arr)
{
  var lat1, lat2, lng1,lng2;
  lat1 = arr[0]["lat"];
  lat2 = arr[0]["lat"];
  lng1 = arr[0]["lng"];
  lng2 = arr[0]["lng"];
  for(var i=1; i < arr.length; i++)
  {
      if( arr[i]["lat"] < lat1)
        lat1= arr[i]["lat"];

      if( arr[i]["lat"] > lat2)
        lat2= arr[i]["lat"];

      if( arr[i]["lng"] < lng1)
        lng1= arr[i]["lng"];

      if( arr[i]["lng"] > lng2)
        lng2= arr[i]["lng"];
  }
  
  return [lat1,lat2,lng1,lng2];
}

function initColor()
{
 clr.push("#FF0000");
clr.push("#008040");
clr.push("#ECFE1B");
clr.push("#FFEBCD");
clr.push("#0000FF");
clr.push("#8A2BE2");
clr.push("#A52A2A");
clr.push("#DEB887");
clr.push("#5F9EA0");
clr.push("#7FFF00");
clr.push("#D2691E");
clr.push("#FF7F50");
clr.push("#6495ED");
clr.push("#FFF8DC");
clr.push("#DC143C");
clr.push("#00FFFF");
clr.push("#00008B");clr.push("#8B008B");
clr.push("#556B2F");clr.push("#FF8C00");
clr.push("#9932CC");clr.push("#8B0000");
clr.push("#E9967A");clr.push("#8FBC8F");
clr.push("#00CED1");clr.push("#9400D3");
clr.push("#FF1493");clr.push("#00BFFF");
clr.push("#B22222");clr.push("#FFFAF0");
clr.push("#228B22");clr.push("#FF00FF");
clr.push("#FFD700");clr.push("#DAA520");
clr.push("#008000");clr.push("#ADFF2F");
clr.push("#FF69B4");clr.push("#CD5C5C");
clr.push("#4B0082");clr.push("#90EE90");
clr.push("#FFB6C1");clr.push("#FFA07A");
clr.push("#20B2AA");clr.push("#00FF00");
clr.push("#32CD32");clr.push("#FAF0E6");
clr.push("#FF00FF");clr.push("#800000");
clr.push("#66CDAA");clr.push("#0000CD");
clr.push("#BA55D3");clr.push("#9370DB");
clr.push("#3CB371");clr.push("#7B68EE");
clr.push("#00FA9A");clr.push("#48D1CC");
clr.push("#C71585");clr.push("#FFA500");
clr.push("#FF4500");clr.push("#DA70D6");
clr.push("#EEE8AA");clr.push("#98FB98");

clr.push("#AFEEEE");clr.push("#DB7093");
clr.push("#FFEFD5");clr.push("#FFDAB9");
clr.push("#CD853F");clr.push("#FFC0CB");
clr.push("#DDA0DD");clr.push("#B0E0E6");
clr.push("#800080");clr.push("#663399");
clr.push("#FF0000");clr.push("#BC8F8F");
clr.push("#4169E1");clr.push("#8B4513");
clr.push("#FA8072");clr.push("#F4A460");
clr.push("#2E8B57");clr.push("#FFF5EE");
clr.push("#A0522D");clr.push("#C0C0C0");
clr.push("#87CEEB");
clr.push("#6A5ACD");
  

  //for(var k=0; k<50; k++)
    {
    // 0 - 10
    //  clr.push(  '#'+Math.floor(Math.random()*16777215).toString(16) );
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


function toggleHeatmap() {
        heatmap.setMap(heatmap.getMap() ? null : map);
      }

function changeGradient() {
  var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(255, 0, 0, 1)'
  ]
  heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
  var pixelSize = Math.pow(2, -map.getZoom())*500;
  heatmap.set('radius', heatmap.get('radius') ? null : pixelSize);
}

function changeOpacity() {
  heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}
