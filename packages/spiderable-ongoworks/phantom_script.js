// 'url' is assigned to in a statement before this.
var page = require('webpage').create();

var isReady = function () {
  console.log('isready');
  return page.evaluate(function () {
    if (typeof Meteor === 'undefined'
        || Meteor.status === undefined
        || !Meteor.status().connected) {
      console.log('Could not detect Meteor status');
      return false;
    }
    if (typeof Package === 'undefined'
        || Package['spiderable-ongoworks'] === undefined
        || Package['spiderable-ongoworks'].Spiderable === undefined
        || !Package['spiderable-ongoworks'].Spiderable._initialSubscriptionsStarted) {
      console.log('Could not detect Spiderable package');
      return false;
    }
    Tracker.flush();
    console.log('Is page ready? ' + DDP._allSubscriptionsReady());
    return DDP._allSubscriptionsReady();
  });
};

var dumpPageContent = function () {
  var out = page.content;
  out = out.replace(/<script[^>]+>(.|\n|\r)*?<\/script\s*>/ig, '');
  out = out.replace('<meta name="fragment" content="!">', '');
  console.log(out);
};

page.open(url, function(status) {
  console.log('opening page at url: ' + url + '; with status: ' + status);
  if (status === 'fail')
    phantom.exit();
});

setInterval(function() {
  if (isReady()) {
    dumpPageContent();
    phantom.exit();
  }
}, 100);

