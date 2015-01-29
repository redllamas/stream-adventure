var combine = require('stream-combiner');
var split   = require('split');
var zlib    = require('zlib');
var through = require('through');

module.exports = function () {
  var groupFn = through(write, end);                  // our grouping function, the main workhorse
  var current;                                        // define the variable we'll use as the current line
  function write(line) {
    if (line.length === 0) return;                    // if the file is empty, don't even bother
    var row = JSON.parse(line);                       // parse the JSON data, line by line

    if (row.type === 'genre') {                       // if the key 'type' matches the value 'genre',
      if (current) {                                  // and if it's the current row,
        this.queue(JSON.stringify(current) + '\n');   // queue the current data with a newline
      }
      current = {name: row.name, books: []};          // give the format for the current line
    }
    else if (row.type === 'book') {                   // otherwise, if the key 'type' matches the value 'book'
      current.books.push(row.name);                   //　populate the value of key 'books' in the current line
    }
  }
  function end() {
    if (current) {
      this.queue(JSON.stringify(current) + '\n');     // on the last line of data
    }
    this.queue(null);
  }

  return combine(split(), groupFn, zlib.createGzip());// finally, combine all the streams, starting with the split data, then our grouper, then gzip them   
};

