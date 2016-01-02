var gulp=require("gulp")
var wiredep = require('wiredep');
var plugins = require('gulp-load-plugins')();
//var del =  require("del");

//copy bower js files to ./build/vendor
gulp.task('vendor-scripts', [], function () {
   return gulp.src(wiredep().js)
     .pipe(gulp.dest('build/vendor')); 
});

//copy bower css files to ./build/vendor
gulp.task('vendor-css', [], function () {
   return gulp.src(wiredep().css)
     .pipe(gulp.dest('build/vendor'));  
});

gulp.task('index', ['vendor-scripts', 'vendor-css'], function () {

   //del.sync("./build/vendor");

   return gulp.src('index.html')
     .pipe(wiredep.stream({
        fileTypes: {
           html: {
              replace: {
                 js: function (filePath) {
                    return '<script src="' + './build/vendor/' + filePath.split('/').pop() + '"></script>';
                 },
                 css: function (filePath) {
                    return '<link rel="stylesheet" href="' + './build/vendor/' + filePath.split('/').pop() + '"/>';
                 }
              }
           }
        }
     }))

     .pipe(plugins.inject(
       gulp.src(['app/**/*.js'], { read: false }), {
          addRootSlash: false,
          transform: function (filePath, file, i, length) {
             return '<script src="' + filePath.replace('build/', '') + '"></script>';
          }
       }))

     .pipe(plugins.inject(
       gulp.src(['css/**/*.css'], { read: false }), {
          addRootSlash: false,
          transform: function (filePath, file, i, length) {
             return '<link rel="stylesheet" href="' + filePath.replace('build/', '') + '"/>';
          }
       }))

     .pipe(gulp.dest('./'));
});