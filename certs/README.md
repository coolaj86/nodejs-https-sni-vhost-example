These are dummy certs that `https` needs in order to create a server, but the browser
will switch over to the certs for the correct domain during the SNI callback.

You can see how they are generated at https://github.com/coolaj86/nodejs-ssl-example
