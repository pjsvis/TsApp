/// <reference path="../typings/tsd.d.ts" />
///<reference path="../gulpfile.js"/>
var gulp = require("gulp");
var mainBowerFiles = require("main-bower-files");
var gFilter = require("gulp-filter");
var gConcat = require("gulp-concat");
var uglify = require("gulp-uglify");
var str = require("string");
var gutil = require("gulp-util");

function isJsFile(file) {
   return (str(file).endsWith(".js"));
}

module.exports = function(config) {

   return function() {
      gulp.task("bower-js", function() {

         var files = mainBowerFiles(config.mbfConfig);
         gutil.log("bower-js".yellow);
         gutil.log("Ensure the correct order of dependencies in the listing below.".yellow);
         gutil.log("EG jquery should be listed before angular".yellow);
         gutil.log("EG angular should be loaded before its dependencies".yellow);
         gutil.log(files.filter(isJsFile));
         gulp.src(mainBowerFiles(config))
            .pipe(gFilter("*.js"))
            .pipe(gulp.dest(config.devDest))
            .pipe(gConcat(config.outFileJs))
            .pipe(gulp.dest(config.dest));
         var result = "Copied bower files to " + config.devDest + " and concatenated to " + config.dest + "/" + config.outFileJs;
         gutil.log(result.yellow);
      });

   };
};