document.getElementById("myForm")
    window.loginUser = function() {
      console.log("try 1")
      var x = document.getElementById('user').value;
      var y = document.getElementById('pass').value;
      if (x=="admin") {
          if (y =="admin") {
            console.log("am here")
            document.location="admin.html"
          }
  }
  else
    document.location="user.html"
}

function openTab(evt, cityName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
     tablinks[i].className = tablinks[i].className.replace(" ADC-C1-border-red", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.firstElementChild.className += " ADC-C1-border-red";
}

var mybtn = document.getElementById("testbtn");
mybtn.click();