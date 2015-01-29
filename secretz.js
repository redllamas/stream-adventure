var crypto   = require('crypto');                         //require crypto module
var zlib     = require('zlib');                           //require zlib module
var tar      = require('tar');                            //require tar module
var through  = require('through');                        //require through module
var ciphName = process.argv[2];                           //get our cipher's name
var ciphPass = process.argv[3];                           //get our passkey
var data     = process.stdin;                             //our input

// deciphering
var decipher = crypto.createDecipher(ciphName, ciphPass);

// gunzipping
var gunzip   = zlib.createGunzip(data);

// tar parsing and hashing
var parser   = tar.Parse();
parser.on('entry', function (entry) {                     //on input of entry data from tar gile
  var md5 = crypto.createHash('md5', {encoding: 'hex'});  //create the hash for each 'entry' event 
  if (entry.type === 'File') {                            //if it's a file/not a directory
    entry.pipe(md5).pipe(through(function (md5) {         //pipe the entry data into hash, then for each,
      console.log(md5 + ' ' + entry.path);                //output the hash, space, filename
    }));
  } else { return; }                                      //anything else, bin it
});

data.pipe(decipher)                                       //decipher it
  .pipe(gunzip)                                           //unzip it
  .pipe(parser);                                          //parse it

