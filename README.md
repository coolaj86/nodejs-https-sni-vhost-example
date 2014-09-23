nodejs-https-sni-vhost-example
==============================

An example of hosting multiple domains securely from a single server

This a completely working example of vhosting https domains with demo keys included.

```bash
git clone git@github.com:coolaj86/nodejs-https-sni-vhost-example.git
pushd nodejs-https-sni-vhost-example/

npm install 
node server
```

The app listens on 1 "fallback" domain and 2 vhost domains. All of these domains point to 127.0.0.1, so you can test them without any modification.

* <https://localhost:4443>
* <https://local.foobar3000.com:4443>
* <https://local.helloworld3000.com:4443>

Any requests to the non-secure domains will be redirected to the secure domain.

* <http://localhost:4080>

In order to stop your browser from issuing the ssl warning you need only to open the `ca/my-root-ca.crt.pem`
in Keychain Access and add it.
