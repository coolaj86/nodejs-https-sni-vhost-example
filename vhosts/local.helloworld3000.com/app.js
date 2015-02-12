'use strict';

var connect = require('connect');

module.exports.create = function () {
  var app = connect();

  app.use(function (req, res) {
    res.end("hello world, not 1, not 2, but 3000!");
  });

  return app;
};
