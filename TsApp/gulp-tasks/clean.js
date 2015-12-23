var gulp = require("gulp");
var gutil = require("gulp-util");
var del = require("del");
var mkdirp = require("mkdirp");
var colors = require("colors");

module.exports = function (config) {
   return function () {
      console.log("clean".yellow);
      gulp.task("clean", function (cb) {
         gutil.log("Delete the build folder");
         return del([config.buildDir], cb);
      });
      mkdirp(config.buildDir, function (err) {
         var result = "Created an empty " + config.buildDir;
         console.log(result.yellow);
      });

   };
};