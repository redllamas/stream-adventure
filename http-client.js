var request = require('request');

var r = request.post('http://localhost:8000'); // create the POST request
process.stdin.pipe(r).pipe(process.stdout); // pipe stdin into POST request, then pipe the output to stdout