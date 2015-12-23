/// <reference path="../gulpfile.js" />
var gulp = require("gulp");
var mainBowerFiles = require("main-bower-files");
var gFilter = require("gulp-filter");
var gConcat = require("gulp-concat");
var uglify = require("gulp-uglify");
var str = require("string");
var colors = require("colors");


function isCssFile(file) {
   return (str(file).endsWith(".css"));
}

module.exports = function(config) {

   return function() {
      gulp.task("bower-css", function() {

         var files = mainBowerFiles(config.mbfConfig);
         console.log("bower-css".yellow);
         console.log("bootstrap.less is in node_modules as we are customising it for different clients".yellow);
         console.log("TODO: Get uglify working with mangle:false".red);
         console.log(files.filter(isCssFile));
         gulp.src(mainBowerFiles(config.mbfConfig))
            .pipe(gFilter("*.css"))
            .pipe(gConcat("bower.css"))
            .pipe(gulp.dest(config.dest));
         //.pipe(uglify({ mangle: false }));         
         var result = "All of the above have been concatenated into bower.css in " + config.dest;
         console.log(result.yellow);
      });

   };
};