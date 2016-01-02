///<reference path="../typings/tsd.d.ts"/>
///<reference path="../gulpfile.js"/>
var gulp = require("gulp");
var tslint = require("gulp-tslint");

module.exports = function (config) {
    return function () {
        gulp.src("app/**/*.module.ts")
            .pipe(tslint())
            .pipe(tslint.report("prose"));
    }
}
