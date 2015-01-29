var trumpet = require('trumpet');
var through = require('through');
var tr      = trumpet();
var trans   = through(write, end);

var stream = tr.select('.loud').createStream();
stream.pipe(trans).pipe(stream);

function write(buf) {
  this.queue(buf.toString().toUpperCase());
}

function end() {
  this.queue(null);
}

process.stdin.pipe(tr).pipe(process.stdout);