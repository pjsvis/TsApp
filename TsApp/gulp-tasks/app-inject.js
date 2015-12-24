// inject app *.js and *.css into index.html
var gulp = require("gulp");
var inject = require("gulp-inject");
var gutil = require("gulp-util");

module.exports = function(config) {
   return function() {
      gulp.task("app-inject", function () {
         gutil.log("app-inject".yellow);
         var target = gulp.src(config.src);
         // It's not necessary to read the files (will speed up things), we're only after their paths: 
         var sources = gulp.src(config.sources, { read: false });

         return target.pipe(inject(sources))
            .pipe(gulp.dest(config.dest));
      });

   };
}