 'use strict';

var https = require('https')
  , http = require('http')
  , fs = require('fs')
  , crypto = require('crypto')
  , connect = require('connect')
  , vhost = require('vhost')
  , finalhandler = require('finalhandler')

  // connect / express app
  , app = connect()

  // SSL Server
  , secureContexts = {}
  , secureOpts
  , secureServer
  , securePort = 4443

  // force SSL upgrade server
  , server
  , port = 4080

  // the ssl domains I have // fs.readdirSync(path.join(__dirname, 'vhosts'))
  , domains = ['local.foobar3000.com', 'local.helloworld3000.com']
  ;

require('ssl-root-cas/latest')
  .inject()
  .addFile(__dirname + '/ca/my-root-ca.crt.pem')
  ;

function getAppContext(domain) {
  // Really you'd want to do this:
  // return require(__dirname + '/' + domain + '/app.js');

  // But for this demo we'll do this:
  return connect()
    .use('/', function (req, res) {
      console.log('req.vhost', JSON.stringify(req.vhost));
      res.end('<html><body><h1>Welcome to ' + domain + '!</h1></body></html>');
    })
    .use('/', function (req, res) {
      // if the domain didn't handle itself, don't fall through to the next.
      finalhandler(req, res)();
    })
    ;
}

domains.forEach(function (domain) {
  secureContexts[domain] = crypto.createCredentials({
    key:  fs.readFileSync(__dirname + '/vhosts/' + domain + '/ssl/server.key.pem')
  , cert: fs.readFileSync(__dirname + '/vhosts/' + domain + '/ssl/server.crt.pem')
  }).context;

  app.use(vhost('*.' + domain, getAppContext(domain)));
  app.use(vhost(domain, getAppContext(domain)));
});

// fallback / default domain
app.use('/', function (req, res) {
  res.end('<html><body><h1>Hello World</h1></body></html>');
});

//provide a SNICallback when you create the options for the https server
secureOpts = {
  //SNICallback is passed the domain name, see NodeJS docs on TLS
  SNICallback: function (domain) {
    console.log('SNI:', domain);
    return secureContexts[domain];
  }
  // fallback / default domain
  , key:  fs.readFileSync(__dirname + '/localhost/ssl/server.key.pem')
  , cert: fs.readFileSync(__dirname + '/localhost/ssl/server.crt.pem')
};

secureServer = https.createServer(secureOpts, app).listen(securePort, function(){
  console.log("Listening on https://localhost:" + secureServer.address().port);
  console.log("Listening on https://local.foobar3000.com:" + secureServer.address().port);
  console.log("Listening on https://local.helloworld3000.com:" + secureServer.address().port);
});

// This simply redirects from the current location to the encrypted location
server = http.createServer();
server.on('request', function (req, res) {
  // TODO also redirect websocket upgrades
  res.setHeader(
    'Location'
  , 'https://' + req.headers.host.replace(/:\d+/, ':' + securePort) + req.url
  );
  res.statusCode = 302;
  res.end();
});
server.listen(port, function(){
  console.log("Listening on http://localhost:" + server.address().port);
});
