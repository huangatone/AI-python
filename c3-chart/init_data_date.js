


function init() {
     
    initColor();
    //drawChart();
    build_chart(1,2,3,4);
    build_weekly_chart(1,2,3,4);
}


function initColor()
{
  var clr = new Array();
  clr.push("#ff0000");
  clr.push("#0000ff");
  clr.push("#3cb371 ");
  clr.push("#ee82ee");
  clr.push("#ffa500");
  clr.push("#6a5acd"); 

}
//checkbox click event
function handleClick(cb,group)
{
   
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

function week_index( date_text) {
  var dd = date_text.split("/");
    var onejan = new Date(dd[2],0,1);
    var d_c = new Date(dd[2],dd[0],dd[1]);
    var millisecsInDay = 86400000;
    return Math.ceil((((d_c - onejan) /millisecsInDay) + onejan.getDay()+1)/7);
};

function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    var cc = document.getElementById(cityName);
    console.log(cityName);
    cc.style.display = "block";
    evt.currentTarget.className += " active";

}
