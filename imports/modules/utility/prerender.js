const prerenderio = Npm.require('prerender-node');
const settings = Meteor.settings.PrerenderIO;

// token
const token = process.env.PRERENDERIO_TOKEN || (settings && settings.token);

// service url (support `prerenderServiceUrl` (for historical reasons) and `serviceUrl`)
let serviceUrl = settings && (settings.prerenderServiceUrl || settings.serviceUrl);
serviceUrl = process.env.PRERENDERIO_SERVICE_URL || serviceUrl;

if (token) {
  if (serviceUrl) prerenderio.set('prerenderServiceUrl', serviceUrl);
  prerenderio.set('prerenderToken', token);

  prerenderio.set('afterRender', function afterRender(error) {
    if (error) {
      console.log('prerenderio error', error); // eslint-disable-line no-console
      return;
    }
  });

  prerenderio.set('protocol', 'https');

  WebApp.rawConnectHandlers.use(prerenderio);
}