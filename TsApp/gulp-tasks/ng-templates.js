/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../gulpfile.js" />

var gulp = require("gulp");
var templateCache = require("gulp-angular-templatecache");
var colors = require("colors");



module.exports = function (config) {
    return function () {
        console.log("Compiling angular templates:\n".yellow, config);
        gulp.task("ng-templates", function () {
            var options = {
                output: config.output,
                //strip: "app/templates",
                //prepend: "partials",
                // angular module name 
                moduleName: config.moduleName,
                minify: {}
            };
            gulp.src(config.src)
                .pipe(templateCache(options))
                .pipe(gulp.dest("./"));
            var result = ["angular templates from ", config.src, " added to templateCache at ", config.output, " as module ", config.moduleName].join('');
            console.log(result.yellow);
        });
    };
};