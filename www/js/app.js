'use strict';

var onDeviceReady = function () {
  Phonon.Navigator().start('vrviewer');
}

var isCordova = typeof window.cordova !== 'undefined' ? true : false;

if(isCordova) {
  document.addEventListener('deviceready', onDeviceReady, false);

} else {
  window.addEventListener('load', onDeviceReady, false);
}

Phonon.Navigator({
  defaultPage: 'vrviewer',
  templatePath: 'tpl',
  pageAnimations: true
});


Phonon.Navigator().on({page: 'vrviewer', template: 'vrviewer', asynchronous: false}, function(activity) {

  activity.onCreate(function(self, el, req) {
  
  });

  activity.onReady(function(self, el, req) {
      simulator.start(el);
  });

  activity.onTransitionEnd(function() {
    console.log('vrviewer: onTransitionEnd');
  });

  activity.onQuit(function(self) {
    console.log('vrviewer: onQuit');
  });

  activity.onHidden(function(el) {
    console.log('vrviewer: onHidden');
  });
});

