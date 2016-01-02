/// <reference path="../typings/tsd.d.ts" />
///<reference path="../gulpfile.js"/>
var gulp = require("gulp");
var wiredep = require("gulp-wiredep");
var gutil = require("gulp-util");
var expect = require("gulp-expect-file");
var plugins = require("gulp-load-plugins");
var mainBowerFiles = require("main-bower-files");


// Copy bower js dependencies to src
gulp.task("vendor-scripts", [], function () {

   return gulp.src(wiredep().js);
   // .pipe(gulp.dest("./build"));
});

// Copy bower css dependencies to src
gulp.task("vendor-css", [], function () {
   return gulp.src(wiredep().css);
   //  .pipe(gulp.dest("./build"));
});

module.exports = function (config) {
   return function () {

       // Wire the js and css dependencies into index.html
      gulp.task("bower-wiredep", ["vendor-scripts", "vendor-css"], function () {
        // gulp.task("bower-wiredep", [], function () {

          return gulp.src("index.html")
            .pipe(wiredep.stream({
               fileTypes: {
                  html: {
                     replace: {
                        js: function (filePath) {
                           return '<script src="' + "build/" + filePath.split("/").pop() + '"></script>';
                        },
                        css: function (filePath) {
                           return '<link rel="stylesheet" href="' + "build/" + filePath.split("/").pop() + '"/>';
                        }
                     }
                  }
               }
            }))

            .pipe(gulp.dest("./"));
       });

    };
};