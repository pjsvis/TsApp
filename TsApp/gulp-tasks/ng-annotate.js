///<reference path="../typings/tsd.d.ts"/>
var gulp = require("gulp");
var ngAnnotate = require("gulp-ng-annotate");

module.exports = function(gulp, config) {
   return function() {
      gulp.task("ng-annotate", function() {
         return gulp.src("src/app.js")
            .pipe(ngAnnotate())
            .pipe(gulp.dest("dist"));
      });
   };
};