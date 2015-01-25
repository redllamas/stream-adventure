var through = require('through');
var tr      = through(write, end); 

process.stdin.pipe(tr).pipe(process.stdout);

function write(buf) {
  this.queue(buf.toString().toUpperCase());
}

function end() {
  this.queue(null);
}