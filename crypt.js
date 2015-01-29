var crypto   = require('crypto');                         //require crypto module
var key      = process.argv[2];                           //get our passkey
var decipher = crypto.createDecipher('aes-256-cbc', key); //create a decipher from the input stream
var data     = process.stdin;                             //our input

data.pipe(decipher)                                       //first pipe in the input to the decipher
  .pipe(process.stdout);                                  //then output it to stdout


// nb: real world situations probably require a bit more savvy, might not
// always be streams, in which case we probably need to to encrypt and 
// decrypt our data. Also need decipher.update(data, 'binary', 'utf8');
// and finally decipher.final('utf8'); to output the buffers.
