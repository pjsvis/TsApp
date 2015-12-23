/// <reference path="typings/tsd.d.ts" />
// Ref: http://macr.ae/article/splitting-gulpfile-multiple-files.html
var gulp = require("gulp");
var beep = require("beepbeep")();
var gutil = require("gulp-util");
var del = require("del");

// TODO: See the ref on how to use plumber to do this
var onError = function(err) {
   beep([0, 0, 0]);
   gutil.log(gutil.colors.green(err));
};

gulp.task("echo", function() { console.log("Hello Gulp!") });

// gulp-tasks
function getTask(task, config) {
   return require("./gulp-tasks/" + task)(config);
}

// clean build dir
var cleanConfig = {
   buildDir: "./build"
};
gulp.task("clean", getTask("clean", cleanConfig));

// compile bootstrap to css/bootstrap.css
var bsConfig = {
   src: "app/less/bootstrap.less",
   dest: "./css",
   expected: ["css/bootstrap.css", "css/bootstrap.css.map"]
};
gulp.task("bootstrap", getTask("bootstrap", bsConfig));

// compile app.ts to dist/app.js
var outDir = "dist";
var outFile = "app.js";
var expectedFile = outDir + "/" + outFile;
var expected = [expectedFile, expectedFile + ".map"]; // No sourceMaps yet!
var tsConfig = {
   root: "app/app.module.ts",
   src: ["./app/app.module.ts", "./app/**/*.ts"],
   outFile: outFile,
   outDir: outDir,
   expected: expected
};
gulp.task("ts-compile", getTask("ts-compile", tsConfig));
gulp.task("ts-lint", getTask("ts-lint", {}));

// TODO: drop this and just leave our app unminified
gulp.task("ng-annotate", getTask("ng-annotate", {}));

// add angular templates to template cache app/templates.js
var ngConfig = {
   src: "app/templates/**/*.html",
   output: "app/templates.js", // NOTE: We can't use *.ts 
   moduleName: "templates",
   dest: "public"
};
gulp.task("ng-templates", getTask("ng-templates", ngConfig));

// put bower dependencies in ./dist/build.*
var mbfConfig = {
   paths: {
      bowerDirectory: "bower_components",
      bowerrc: ".bowerrc",
      bowerJson: "bower.json"
   }
};
var bConfig = {
   mbfConfig: mbfConfig,
   dest: "dist",
   outFileJs: "bower.js",
   outFileCss: "bower.css"

};
gulp.task("bower-js", getTask("bower-js", bConfig));
gulp.task("bower-css", getTask("bower-css", bConfig));

var wdConfig = {
   src: "index.html",
   dest: "./"
};
var wiredep = require("gulp-wiredep", {});
gulp.task("wiredep", function() {
   gulp.src("index.html")
      .pipe(wiredep({
      
      }))
      .pipe(gulp.dest("./"));
});
// TODO: Fix this
//gulp.task("wiredep", getTask("wiredep", wdConfig));


// Use the web.config to determine whether the default task should create a debug or a release build
// If the web.config contains this: '<compilation debug="true"' then we do a default build, otherwise
// we do a release build.  It's a little hacky but generally works
var fs = require("fs");
var data = fs.readFileSync(__dirname + "/web.config", "utf-8");
var inDebug = !!data.match(/<compilation debug="true"/);

gulp.task("build-debug", [
   "ts-lint"
]);

gulp.task("build-release", [
   "ts-lint"
]);

gulp.task("inDebug", [(inDebug ? "build-debug" : "build-release")]);

// TODO: Add ng-annotate and uglify to the build task
gulp.task("default", ["bootstrap"]);
// TODO: Add a watch to the test task
gulp.task("test", [
   "echo",
   "ts-lint",
   "ts-compile",
   "bootstrap"
]);

// TODO: Fix ts-compile issue with implicit any in ng-templates
gulp.task("all", [
   "clean",
   "bootstrap",
   "ts-lint",
   "ng-templates",
   "ts-compile",
   "wiredep",
   "bower-css",
   "bower-js"
]);