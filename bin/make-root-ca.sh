#!/bin/bash
set -e -u

# make directories to work from
mkdir -p ca/

# Create your very own Root Certificate Authority
openssl genrsa \
  -out ca/my-root-ca.key.pem \
  2048

# Self-sign your Root Certificate Authority
# Since this is private, the details can be as bogus as you like
openssl req \
  -x509 \
  -new \
  -nodes \
  -key ca/my-root-ca.key.pem \
  -days 3652 \
  -out ca/my-root-ca.crt.pem \
  -subj "/C=US/ST=Utah/L=Provo/O=ACME Signing Authority Inc/CN=example.com"

# Needed for Safari, Chrome, and other Apps in OS X Keychain Access
echo ""
echo ""
echo "You must create a p12 passphrase. Consider using 'secret' for testing and demo purposes."
openssl pkcs12 -export \
  -in ca/my-root-ca.crt.pem \
  -inkey ca/my-root-ca.key.pem \
  -out ca/my-root-ca.p12
echo ""
echo ""
