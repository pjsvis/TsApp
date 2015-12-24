/// <reference path="../typings/tsd.d.ts" />
var gulp = require("gulp");
var del = require("del");
var less = require("gulp-less");
var expect = require("gulp-expect-file");
var gutil = require("gulp-util");

var clean = function (arrFiles) {
   return del.sync(arrFiles);
};

module.exports = function (config) {
   var initMsg = "Deleted: " + config.expected;
   var sucessMsg = "Created: " + config.expected;
   return function () {
      gutil.log("less-bootstrap".yellow);
      gutil.log("todo: compile all files in ./branding".red);
      clean(config.expected) ? gutil.log(initMsg.yellow) : gutil.noop();
      gulp.src(config.src)
         .pipe(expect(config.src))
         .pipe(less())
         .pipe(gulp.dest(config.dest)) // uncompressed
         .pipe(expect(config.expected)) ? gutil.log(sucessMsg.yellow) : gutil.beep();
   };
};