/// <reference path="../gulpfile.js" />
var gulp = require("gulp");
var mainBowerFiles = require("main-bower-files");
var gFilter = require("gulp-filter");
var gConcat = require("gulp-concat");
var uglify = require("gulp-uglify");
var str = require("string");
var colors = require("colors");

function isJsFile(file) {
    return (str(file).endsWith(".js"));
}

module.exports = function (config) {

    return function () {
        gulp.task("bower-js", function () {

           var files = mainBowerFiles(config.mbfConfig);
           console.log("bower-js".yellow);
            console.log("Ensure the correct order of dependencies in the listing below.".yellow);
            console.log("EG jquery should be listed before angular".yellow);
            console.log("EG angular should be loaded before its dependencies".yellow);
            console.log("TODO: Get uglify working with mangle:false".red);
            console.log(files.filter(isJsFile)) ;
            gulp.src(mainBowerFiles(config))
                .pipe(gFilter("*.js"))
                .pipe(gConcat(config.outFileJs))
                //.pipe(uglify({mangle:false}))
                .pipe(gulp.dest(config.dest));            
            var result = "All of the above have been concatenated into bower.js in " + config.dest;
           console.log(result.yellow);
        });

    }
}