/// <reference path="../typings/tsd.d.ts" />
var gulp = require("gulp");
var expect = require("gulp-expect-file");
var tsc = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var del = require("del");

module.exports = function (config) {
   return function () {
      //TODO: Use config
      console.log("Compiling typescript:\n".yellow, config);

      gulp.task("ts-compile", function () {
         gulp.src(config.glob)
            .pipe(sourcemaps.init())
            .pipe(tsc())
            .pipe(sourcemaps.write("/"))
            .pipe(gulp.dest("app"));
      });


   };
  // NOTE: Ref: https://github.com/Microsoft/vscode/issues/936   
};