var through = require('through');
var split   = require('split');
var tr      = through(write, end);
var lineNum = 0;

// streaming logic
process.stdin // 1. input
  .pipe(split()) // 2. split by newlines
  .pipe(tr) // 3. pip to through functions
  .pipe(process.stdout); // 4. output to console


function write(buf) { // take a buffer from tr object 
  var line = buf.toString(); // stringify that buffer
  this.queue(lineNum % 2 === 0 ? // if the line number is even
    line.toLowerCase() + '\n' // return a lowercaseified string
    : line.toUpperCase() + '\n' // otherwise an uppercaseified string
    );
  lineNum++; // increment the line number to make sure the next one is alternate
}

function end() {
  this.queue(null); //nothing to return
}