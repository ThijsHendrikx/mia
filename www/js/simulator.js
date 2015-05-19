var simulator = simulator || {}


simulator.translationLeft = null;
simulator.translationRight = null;

simulator.rotationLeft = null;
simulator.rotationRight = null;

simulator.currentRotation = 0;
simulator.currentTranslation = 0;

simulator.translationWidth = 0;


simulator.start = function (el) {


  simulator.rotationLeft  = el.querySelector(".imgleft .rotationWrapper");
  simulator.rotationRight = el.querySelector(".imgright .rotationWrapper");

  simulator.translationLeft  = simulator.rotationLeft.querySelector(".translationWrapper");
  simulator.translationRight = simulator.rotationRight.querySelector(".translationWrapper");

  simulator.translationWidth = simulator.translationLeft.offsetWidth;

  if (window.DeviceOrientationEvent) {
    
    window.addEventListener('deviceorientation', function(eventData) {

        var tiltLR = eventData.gamma;
        var tiltFB = eventData.beta;
        var dir = eventData.alpha;

        var normalizedRotation = tiltFB;
        var normalizedTranslation = dir;

        if( Math.abs(dir - simulator.currentTranslation) > 320){
          normalizedTranslation = dir;
        }

        simulator.rotationLeft.style.webkitTransform = "rotate(" + - normalizedRotation + "deg)";
        simulator.rotationRight.style.webkitTransform = "rotate("+ - normalizedRotation + "deg)";


        simulator.translationLeft.style.left =  Math.round( ((360 - normalizedTranslation) / 360) * - (simulator.translationWidth / 2) ) + "px";
        simulator.translationRight.style.left = Math.round( ((360 - normalizedTranslation) / 360) * - (simulator.translationWidth / 2) ) + "px";

        simulator.showDebugInfo(el,tiltLR,tiltFB,dir);

    }, false);
  
  } else {
    document.getElementById("doEvent").innerHTML = "Not supported."
  }
     
}

simulator.showDebugInfo = function(el,tiltLR,tiltFB,dir){

  el.querySelector("#debug").style.display = "block";

  el.querySelector("#doTiltLR").innerHTML = Math.round(tiltLR);
  el.querySelector("#doTiltFB").innerHTML = Math.round(tiltFB);
  el.querySelector("#doDirection").innerHTML = Math.round(dir);

}


 
