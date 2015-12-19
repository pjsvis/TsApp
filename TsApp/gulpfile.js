///<reference path="typings/tsd.d.ts"/>
// Ref: http://macr.ae/article/splitting-gulpfile-multiple-files.html
var gulp = require("gulp");
var plugins = require("gulp-load-plugins")();

gulp.task("echo", function () { console.log("Hello Gulp!") });

// gulp-tasks
function getTask(task, config) {
   return require('./gulp-tasks/' + task)(gulp, plugins, config);
}

var bsConfig = {
   src: "app/less/bootstrap.less",
   dest: "./css"
};
gulp.task('bootstrap', getTask('bootstrap', bsConfig));

var tsConfig = {
   root: "app/app.module.ts",
   src: ["./app/app.module.ts", "./app/**/*.ts", ".app/**/*.ts"],
   clean: "./dist/build.*",
   concatjs: "build.js",
   dest: "dist"
};
gulp.task('compile-ts', getTask('compile-ts', tsConfig));

// TODO: Figure out how to get ng-annotate to run after we have ts-compile
gulp.task('ng-annotate', getTask('ng-annotate', {}));
gulp.task('ts-lint', getTask('ts-lint', {}));

// TODO: Add ng-annotate and uglify to the build task
gulp.task("default", ["bootstrap"]);
// TODO: Add a watch to the test task
gulp.task("test", ["echo", "ts-lint", "compile-ts", "bootstrap"]);
