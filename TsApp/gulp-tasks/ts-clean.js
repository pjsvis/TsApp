/// <reference path="../typings/tsd.d.ts" />
///<reference path="../gulpfile.js"/>
var gulp = require("gulp");
var del = require("del");
var glob = require("glob");

// Ref: http://stackoverflow.com/questions/29267041/how-to-conditionally-delete-generated-javascript-files/
module.exports = function (config) {
    return function () {
        var filter = function (file) {
            return file.replace(/.ts$/, ".js");
        };

        gulp.task("ts-clean", function () {
            return glob(config.glob, function (err, files) {
                del(files.map(filter));
                del(config.mapFiles);
            });
        });
    }
}


