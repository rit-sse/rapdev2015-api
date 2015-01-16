var keypair = require('keypair');
var fs = require('fs');

var pair = keypair();
fs.writeFile('./secret.pub', pair.public, function() {
	console.log('Wrote public key to ./secret.pub');
});
fs.writeFile('./secret.key', pair.private, function() {
	console.log('Wrote private key to ./secret.key');
});
