#!/bin/bash
set -e

SERVER=$1

if [ ! -n "$SERVER" ]
then
  echo ""
  echo "Usage ${0} 'some.server.com'"
  echo ""
  exit
fi

echo "Creating certificate for"
echo "${SERVER}"
echo ""

mkdir -p vhosts/${SERVER}/ssl/

# Create a Device Certificate for each domain,
# such as example.com, *.example.com, awesome.example.com
# NOTE: You MUST match CN to the domain name or ip address you want to use
openssl genrsa \
  -out vhosts/${SERVER}/ssl/server.key.pem \
  2048

# Create a request from your Device, which your Root CA will sign
openssl req -new \
  -key vhosts/${SERVER}/ssl/server.key.pem \
  -out /tmp/my-server.csr.pem \
  -subj "/C=US/ST=Utah/L=Provo/O=ACME Service/CN=${SERVER}"

# Sign the request from Device with your Root CA
# -CAserial certs/ca/my-root-ca.srl
openssl x509 \
  -req -in /tmp/my-server.csr.pem \
  -CA ca/my-root-ca.crt.pem \
  -CAkey ca/my-root-ca.key.pem \
  -CAcreateserial \
  -out vhosts/${SERVER}/ssl/server.crt.pem \
  -days 1095

# Create a public key, for funzies
# See https://gist.github.com/coolaj86/f6f36efce2821dfb046d
#openssl rsa \
#  -in certs/server/my-server.key.pem \
#  -pubout -out certs/client/my-server.pub

# Needed for Safari, Chrome, and other Apps in OS X Keychain Access
echo ""
echo ""
echo "You must create a p12 passphrase. Consider using 'secret' for testing and demo purposes."
openssl pkcs12 -export \
  -in vhosts/${SERVER}/ssl/server.crt.pem \
  -inkey vhosts/${SERVER}/ssl/server.key.pem \
  -out vhosts/${SERVER}/ssl/${SERVER}.p12
echo ""
echo ""
tree vhosts/${SERVER}/ssl
