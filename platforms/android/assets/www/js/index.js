var app = app || {};
 
app.watchID = null;
 
 
app.initialize = function () {
    document.addEventListener('deviceready', app.onDeviceReady, false);
};
 
 
app.onDeviceReady = function () {
    app.receivedEvent('deviceready');
    app.watchID = navigator.compass.watchHeading(
        app.compassUpdate, 
        app.compassError, { frequency : 3000 });
};
 
 
app.compassUpdate = function (hdg) {
  var mh = hdg.magneticHeading;
  app.showHeading(true, 'Heading: ' + mh);
};
 
 
app.compassError = function (err) {
  var errcode = err.code;
  app.showHeading(false, 'Compass error: ' + errcode);
};
 
 
app.showHeading = function (f_ok, s) {
  var parentElem = document.getElementById('heading');
  var nodataElem = parentElem.querySelector('.listening');
  var dataElem   = parentElem.querySelector('.received');
  if (f_ok) { 
    nodataElem.setAttribute('style', 'display:none;'); 
    dataElem.setAttribute('style', 'display:block;'); 
    dataElem.innerHTML = s;
  }
  else {
    nodataElem.setAttribute('style', 'display:block;'); 
    dataElem.setAttribute('style', 'display:none;'); 
    nodataElem.innerHTML = s;
  }
};
 
 
app.receivedEvent = function(id) {
    var parentElement = document.getElementById('deviceready');
    parentElement.setAttribute('style', 'display:none;');
    var headingElement = document.getElementById('heading');
    headingElement.setAttribute('style', 'display:block');
};