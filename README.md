Daplie is Taking Back the Internet!
--------------

[![](https://daplie.github.com/igg/images/ad-developer-rpi-white-890x275.jpg?v2)](https://daplie.com/preorder/)

Stop serving the empire and join the rebel alliance!

* [Invest in Daplie on Wefunder](https://daplie.com/invest/)
* [Pre-order Cloud](https://daplie.com/preorder/), The World's First Home Server for Everyone

nodejs-https-sni-vhost-example
==============================

An example of hosting multiple domains securely from a single server

This a completely working example of vhosting https domains with demo keys included.

```bash
git clone git@github.com:coolaj86/nodejs-https-sni-vhost-example.git
pushd nodejs-https-sni-vhost-example/

npm install 
node ./vhost-sni-server.js
```

The app listens on 1 "fallback" domain and 2 vhost domains. All of these domains point to 127.0.0.1, so you can test them without any modification.

* <https://localhost:4443>
* <https://local.foobar3000.com:4443>
* <https://local.helloworld3000.com:4443>

Any requests to the non-secure domains will be redirected to the secure domain.

* <http://localhost:4080>

In order to stop your browser from issuing the ssl warning you need only to open the `ca/my-root-ca.crt.pem`
in Keychain Access and add it.

node v0.12 and io.js v1.2 support
======

See here: https://github.com/coolaj86/demo-https-sni-fail-workaround

I have working code, just don't have time to merge it in right now. :-)
