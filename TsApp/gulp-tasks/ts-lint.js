///<reference path="../typings/tsd.d.ts"/>
var gulp = require("gulp");
var tslint = require("gulp-tslint");

module.exports = function(gulp, config) {
   return function() {
      gulp.src("app/**/*.module.ts")
       .pipe(tslint())
       .pipe(tslint.report("prose"));
   }
}
