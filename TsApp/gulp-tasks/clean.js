/// <reference path="../typings/tsd.d.ts" />
///<reference path="../gulpfile.js"/>
var gulp = require("gulp");
var gutil = require("gulp-util");
var del = require("del");

module.exports = function (config) {
    return function () {
        gutil.log("clean".yellow);
        gulp.task("clean", function (cb) {
            var initMsg = "Deleted " + config.dist;
            gutil.log(initMsg.yellow);
            // Use del.sync
            return del(config.dist, cb);
        });
    };
};
