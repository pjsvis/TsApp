var gulp = require('gulp');
var tslint = require('gulp-tslint');

module.exports = function(gulp, plugins) {
   return function() {
      gulp.src('app/**/*.module.ts')
       .pipe(tslint())
       .pipe(tslint.report('prose'));
   }
}
