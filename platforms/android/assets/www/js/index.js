var app = app || {};
 
app.watchID = null;
app.dataElem = null;
 
 
app.initialize = function () {
    document.addEventListener('deviceready', app.onDeviceReady, false);
};
 
 
app.onDeviceReady = function () {

  if (window.DeviceOrientationEvent) {
    alert("DeviceOrientation is supported");
  }

    app.watchID = navigator.compass.watchHeading(
        app.compassUpdate, 
        app.compassError, { frequency : 10 });

    app.dataElem   = document.getElementById("outputLabel");

    app.dataElem.innerHTML = "Waiting for compass";
};
 
 
app.compassUpdate = function (hdg) {
  app.dataElem.innerHTML = parseInt(hdg.magneticHeading);
};
 
 
app.compassError = function (err) {
  app.dataElem.innerHTML = err.code;
};
