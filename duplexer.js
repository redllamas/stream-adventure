var duplexer = require('duplexer');
var spawn    = require('child_process').spawn;

module.exports = function (cmd, args) {
  var ps = spawn(cmd, args);
  return duplexer(ps.stdin, ps.stdout);
};

