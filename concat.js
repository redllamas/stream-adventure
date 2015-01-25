var concat = require('concat-stream');

// streaming logic
process.stdin // 1. input
  .pipe(concat(bufferIt)); //2. pipe to out buffering function, which outputs to the console.

function bufferIt(buf) { // take a buffer
  var revStr = buf.toString().split('').reverse().join(''); // declare a variable 'revStr' which stringifies a buffer, splits, reverses and joins chunks
  console.log(revStr); // finally, output it to the console.
}