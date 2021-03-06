'use strict';

var fs      = require('fs-extra');
var Promise = require('../../lib/ext/promise');
var remove  = Promise.denodeify(fs.remove);
var root    = process.cwd();

module.exports.setup = function(path) {
  process.chdir(root);

  return remove(path)
    .then(function() {
      fs.mkdirsSync(path);
    });
};

module.exports.teardown = function(path) {
  process.chdir(root);

  if (fs.existsSync(path)) {
    return remove(path);
  } else {
    return Promise.resolve();
  }
};
