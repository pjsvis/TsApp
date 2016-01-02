/// <reference path="../typings/tsd.d.ts" />
var gulp = require("gulp");
var inject = require("gulp-inject");
var gutil = require("gulp-util");
var path = require("path");
var fs = require("fs-extra");

module.exports = function(config) {
   return function() {
      var target = gulp.src("./index.html");     
      var sources = gulp.src(["./app/**/*.js", "./css/*.css"], { read: false });
      return target.pipe(inject(sources, {addRootSlash: false}))
        .pipe(gulp.dest("./"));
   };
};