/// <reference path="../typings/tsd.d.ts" />
var gulp = require("gulp");
var wiredep = require("gulp-wiredep");
var gutil = require("gulp-util");
var expect = require("gulp-expect-file");

// Add *.js and * .css bower dependencies
var wiredepOptions = {
   cwd: "./"
};

module.exports = function(config) {
   return function () {
      // TODO: Use wiredep options

      gulp.task("wiredep", function () {
         gulp.src(config.src)
            .pipe(wiredep({

            }))
            .pipe(gulp.dest(config.dest));
      });
   };
};