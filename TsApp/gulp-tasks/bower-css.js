/// <reference path="../typings/tsd.d.ts" />
///<reference path="../gulpfile.js"/>
var gulp = require("gulp");
var mainBowerFiles = require("main-bower-files");
var gFilter = require("gulp-filter");
var gConcat = require("gulp-concat");
var minifyCss = require("gulp-minify-css");
var sourcemaps=require("gulp-sourcemaps");
var expect=require("gulp-expect-file");
var str = require("string");
var gutil = require("gulp-util");

function isCssFile(file) {
   return (str(file).endsWith(".css"));
}

module.exports = function(config) {

   return function() {
      gulp.task("bower-css", function() {

         var files = mainBowerFiles(config.mbfConfig);
         gutil.log("bower-css".yellow);
         gutil.log("bootstrap.less is installed in node_modules as we are customising it for different clients".yellow);
         gutil.log("TODO: add expect".red);
         gutil.log(files.filter(isCssFile));
         gulp.src(mainBowerFiles(config.mbfConfig))
            .pipe(gFilter("*.css"))
            .pipe(gulp.dest(config.devDest))
            .pipe(sourcemaps.init())
            .pipe(gConcat(config.outFileCss))
            .pipe(minifyCss({}))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(config.dest));
            //.pipe(expect(config.expected));       
         var result = "All of the above have been concatenated into bower.css in " + config.dest;
         gutil.log(result.yellow);
      });

   };
};