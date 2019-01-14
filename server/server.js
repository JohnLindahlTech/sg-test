'use strict';
const path = require('path');
const SG = require('strong-globalize');
SG.SetRootDir(path.join(__dirname, '..'), {autonomousMsgLoading: 'none'});
// SG.SetDefaultLanguage('en');
SG.SetDefaultLanguage('sv'); // <-- Needed to get sv to work.
SG.SetDefaultLanguage('es'); // <-- Needed to get es to work.
const loopback = require('loopback');
const boot = require('loopback-boot');

const gEN = new SG({language: 'en'}); // <-- Does not load gloablize.
const gSV = new SG({language: 'sv'}); // <-- Does not load gloablize.
const gES = new SG({language: 'es'}); // <-- Does not load gloablize.

const app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log(gEN.f('Web server listening at: %s', baseUrl));
    console.log(gSV.f('Web server listening at: %s', baseUrl));
    console.log(gES.f('Web server listening at: %s', baseUrl));
    console.log('');
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log(gEN.f('Browse your REST API at %s%s', baseUrl, explorerPath));
      console.log(gSV.f('Browse your REST API at %s%s', baseUrl, explorerPath));
      console.log(gES.f('Browse your REST API at %s%s', baseUrl, explorerPath));
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
