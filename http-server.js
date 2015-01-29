var http = require('http');
var through = require('through');

var server = http.createServer(function callback(req, res) { // generate an http server the usual way
  if (req.method === 'POST') {                   // if we get POST data
    req.pipe(through(function (buf) {            // pipe the through stream to a buffer...
       this.queue(buf.toString().toUpperCase()); // then stringify and uppercaseify the buffer, before...
    })).pipe(res);                               // piping it to the response
  } else {
    res.end('post me, arsewipe');                // kick up a fuss if it's not POST
  }
}).listen(Number(process.argv[2]));              // listening on the port number supplied


