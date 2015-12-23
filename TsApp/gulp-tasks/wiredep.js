/// <reference path="../typings/tsd.d.ts" />
var gulp = require("gulp");
var wiredep = require("gulp-wiredep").stream;

// Add *.js and * .css bower dependencies
var wiredepOptions = {
   cwd: "./"
};

module.exports = function(config) {
   return function () {
      // TODO: Use wiredep options
      //console.log("Starting wiredep:\n", config);
      gulp.task("wiredep", function () {
         gulp.src("index.html")
            .pipe(wiredep({

            }))
            .pipe(gulp.dest("./"));
      });
   };
};