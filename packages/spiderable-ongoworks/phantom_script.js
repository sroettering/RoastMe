// 'url' is assigned to in a statement before this.
var page = require('webpage').create();

var isReady = function () {
  return page.evaluate(function () {
    if (typeof Meteor === 'undefined'
        || Meteor.status === undefined
        || !Meteor.status().connected) {
      return false;
    }
    if (typeof Package === 'undefined'
        || Package['spiderable-ongoworks'] === undefined
        || Package['spiderable-ongoworks'].Spiderable === undefined
        || !Package['spiderable-ongoworks'].Spiderable._initialSubscriptionsStarted) {
      return false;
    }
    Tracker.flush();
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
  if (status === 'fail')
    phantom.exit();
});

setInterval(function() {
  if (isReady()) {
    dumpPageContent();
    phantom.exit();
  }
}, 100);

