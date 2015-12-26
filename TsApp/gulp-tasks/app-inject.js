/// <reference path="../typings/tsd.d.ts" />

var gulp = require("gulp");
var inject = require("gulp-inject");
var gutil = require("gulp-util");
var path = require("path");
var fs = require("fs-extra");

module.exports = function(config) {
   // TODO: Copy _index.html to index.html
   //fs.copySync("_index.html", "index.html");
   return function() {
      var target = gulp.src("./index.html");
      // It's not necessary to read the files (will speed up things), we're only after their paths: 
      var sources = gulp.src(["./app/**/*.js", "./app/**/*.css"], { read: false });

      return target.pipe(inject(sources, {addRootSlash: false}))
        .pipe(gulp.dest("./"));
   };
};