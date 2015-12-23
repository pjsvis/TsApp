///<reference path="../typings/tsd.d.ts"/>
var gulp = require("gulp");
var plugins = require("gulp-load-plugins")();
var expect = require("gulp-expect-file");
var sourcemaps = require("gulp-sourcemaps");
var less = require("gulp-less");

module.exports = function(config) {
   return function () {
      console.log("Compiling bootstrap:\n", config);
      gulp.src(config.src)
         .pipe(expect(config.src))
         .pipe(sourcemaps.init())
         .pipe(less())
         .pipe(sourcemaps.write("/"))
         .pipe(gulp.dest(config.dest))
         .pipe(expect(config.expected));
   };
};