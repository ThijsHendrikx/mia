var app = app || {}


app.translationLeft = null;
app.translationRight = null;

app.rotationLeft = null;
app.rotationRight = null;

app.prevRotations = [0,0,0];
app.prevTranslations = [0,0,0];

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

        app.prevRotations.shift();
        app.prevRotations.push(tiltFB);

        app.prevTranslations.shift();
        app.prevTranslations.push(dir);

        var normalizedRotation = tiltFB;
        var normalizedTranslation = dir;

        app.rotationLeft.style.webkitTransform = "rotate("+ -normalizedRotation +"deg)";
        app.rotationRight.style.webkitTransform = "rotate("+ -normalizedRotation +"deg)";

        app.translationLeft.style.left =  ((360 - Math.round(normalizedTranslation)) / 360) * -(app.translationWidth / 2) + "px";
        app.translationRight.style.left = ((360 - Math.round(normalizedTranslation)) / 360) * -(app.translationWidth / 2) + "px";

      //  app.showDebugInfo(tiltLR,tiltFB,((360 - Math.round(normalizedTranslation)) / 360));

    }, false);
  
  } else {
    document.getElementById("doEvent").innerHTML = "Not supported."
  }
     
}



app.showDebugInfo = function(tiltLR,tiltFB,dir){

  document.getElementById("debug").style.display = "block";

  document.getElementById("doTiltLR").innerHTML = Math.round(tiltLR);
  document.getElementById("doTiltFB").innerHTML = Math.round(tiltFB);
  document.getElementById("doDirection").innerHTML = dir;

}


 
