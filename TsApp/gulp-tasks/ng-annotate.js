var gulp = require("gulp");
var ngAnnotate = require("gulp-ng-annotate");

module.exports = function(gulp, plugins) {
   return function() {
      gulp.task("ng-annotate", function() {
         return gulp.src("src/app.js")
            .pipe(ngAnnotate())
            .pipe(gulp.dest("dist"));
      });
   };
};