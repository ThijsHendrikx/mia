var app = app || {}


app.translationLeft = null;
app.translationRight = null;

app.rotationLeft = null;
app.rotationRight = null;

app.currentRotation = 0;
app.currentTranslation = 0;

app.translationWidth = 0;




app.initialize = function () {
    document.addEventListener('deviceready', app.onDeviceReady, false);
}
 
 

app.onDeviceReady = function () {

  app.rotationLeft  = document.getElementById("imgleft").querySelector(".rotationWrapper");
  app.rotationRight = document.getElementById("imgright").querySelector(".rotationWrapper");

  app.translationLeft  = app.rotationLeft.querySelector(".translationWrapper");
  app.translationRight = app.rotationRight.querySelector(".translationWrapper");

  app.translationWidth = app.translationLeft.offsetWidth;

  if (window.DeviceOrientationEvent) {
    
    window.addEventListener('deviceorientation', function(eventData) {

        var tiltLR = eventData.gamma;
        var tiltFB = eventData.beta;
        var dir = eventData.alpha;

        var normalizedRotation = app.currentRotation = app.currentRotation + ( (tiltFB - app.currentRotation) * .1);
        var normalizedTranslation = app.currentTranslation = app.currentTranslation + ( (dir - app.currentTranslation) * .1);

        if( Math.abs(dir - app.currentTranslation) > 320){
          normalizedTranslation = dir;
        }

        app.rotationLeft.style.webkitTransform = "rotate(" + - normalizedRotation + "deg)";
        app.rotationRight.style.webkitTransform = "rotate("+ - normalizedRotation + "deg)";


        app.translationLeft.style.left =  Math.round( ((360 - normalizedTranslation) / 360) * - (app.translationWidth / 2) ) + "px";
        app.translationRight.style.left = Math.round( ((360 - normalizedTranslation) / 360) * - (app.translationWidth / 2) ) + "px";

        app.showDebugInfo(tiltLR,tiltFB,dir);

    }, false);
  
  } else {
    document.getElementById("doEvent").innerHTML = "Not supported."
  }
     
}



app.showDebugInfo = function(tiltLR,tiltFB,dir){

  document.getElementById("debug").style.display = "block";

  document.getElementById("doTiltLR").innerHTML = Math.round(tiltLR);
  document.getElementById("doTiltFB").innerHTML = Math.round(tiltFB);
  document.getElementById("doDirection").innerHTML = Math.round(dir);

}


 
