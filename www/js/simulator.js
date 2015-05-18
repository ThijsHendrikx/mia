var simulator = simulator || {}


simulator.translationLeft = null;
simulator.translationRight = null;

simulator.rotationLeft = null;
simulator.rotationRight = null;

simulator.currentRotation = 0;
simulator.currentTranslation = 0;

simulator.translationWidth = 0;


simulator.start = function () {

  simulator.rotationLeft  = document.getElementById("imgleft").querySelector(".rotationWrsimulatorer");
  simulator.rotationRight = document.getElementById("imgright").querySelector(".rotationWrsimulatorer");

  simulator.translationLeft  = simulator.rotationLeft.querySelector(".translationWrsimulatorer");
  simulator.translationRight = simulator.rotationRight.querySelector(".translationWrsimulatorer");

  simulator.translationWidth = simulator.translationLeft.offsetWidth;

  if (window.DeviceOrientationEvent) {
    
    window.addEventListener('deviceorientation', function(eventData) {

        var tiltLR = eventData.gamma;
        var tiltFB = eventData.beta;
        var dir = eventData.alpha;

        var normalizedRotation = simulator.currentRotation = simulator.currentRotation + ( (tiltFB - simulator.currentRotation) * .1);
        var normalizedTranslation = simulator.currentTranslation = simulator.currentTranslation + ( (dir - simulator.currentTranslation) * .1);

        if( Math.abs(dir - simulator.currentTranslation) > 320){
          normalizedTranslation = dir;
        }

        simulator.rotationLeft.style.webkitTransform = "rotate(" + - normalizedRotation + "deg)";
        simulator.rotationRight.style.webkitTransform = "rotate("+ - normalizedRotation + "deg)";


        simulator.translationLeft.style.left =  Math.round( ((360 - normalizedTranslation) / 360) * - (simulator.translationWidth / 2) ) + "px";
        simulator.translationRight.style.left = Math.round( ((360 - normalizedTranslation) / 360) * - (simulator.translationWidth / 2) ) + "px";

        simulator.showDebugInfo(tiltLR,tiltFB,dir);

    }, false);
  
  } else {
    document.getElementById("doEvent").innerHTML = "Not supported."
  }
     
}

simulator.showDebugInfo = function(tiltLR,tiltFB,dir){

  document.getElementById("debug").style.display = "block";

  document.getElementById("doTiltLR").innerHTML = Math.round(tiltLR);
  document.getElementById("doTiltFB").innerHTML = Math.round(tiltFB);
  document.getElementById("doDirection").innerHTML = Math.round(dir);

}


 
