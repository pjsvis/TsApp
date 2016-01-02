/// <reference path="typings/tsd.d.ts" />
// Ref: http://macr.ae/article/splitting-gulpfile-multiple-files.html
// Ref: http://lab.brightnorth.co.uk/2014/08/13/automating-linkage-how-i-learned-to-stop-worrying-and-love-the-build/
// Ref: http://twin.github.io/getting-the-most-out-of-bower/
var gulp = require("gulp");
var beep = require("beepbeep")();
var gutil = require("gulp-util");
var del = require("del");
var plumber = require("gulp-plumber");


gulp.task("default", [
   "bower-wiredep"
]);

gulp.task("test", [
//"app-inject",
   "bower-css",
   "bower-js"
]);


// gulp-tasks
function getTask(task, config) {
   return require("./gulp-tasks/" + task)(config);
}

gConfig = {
   // Inject app *.js and *.css refs into index.html
   injectTarget: "./index.html",
   injectSources: ["./app/**/*.js", "./css/**/*.css"],
   injectDest: "./"
};

gulp.task("app-inject", getTask("app-inject", gConfig));

// put bower dependencies in /.src and ./dist/
var mbfConfig = {
   paths: {
      bowerDirectory: "bower_components",
      bowerrc: ".bowerrc",
      bowerJson: "bower.json"
   }
};
var bConfig = {
   mbfConfig: mbfConfig,
   devDest: "./build",
   dest: "./dist",
   outFileJs: "bower.js",
   outFileCss: "bower.css"

};
gulp.task("bower-js", getTask("bower-js", bConfig));
gulp.task("bower-css", getTask("bower-css", bConfig));

// TODO: Figure out why this is not doing anything
// TODO: Change the folder to src/...
gulp.task("bower-wiredep", getTask("bower-wiredep", {
   src: "index.html",
   dest: "./"
}));

// clean dist dir
// TODO: Make this delete everything in ./dist
gulp.task("clean-dist", getTask("clean", { dist: ["./dist/**/*.*"] }));

// TODO: get a list of the folders in ./less
// TODO: Loop over the folder and run less compile on each
// NOTE: Ref: http://stackoverflow.com/questions/22149966/iterating-over-directories-with-gulp
// compile bootstrap to ./css/bootstrap.css
var lbConfig = {
   src: "app/less/bootstrap.less",
   dest: "./css",
   expected: ["css/bootstrap.css"]
};
gulp.task("less-bootstrap", getTask("less-bootstrap", lbConfig));

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

// Clean tsc generated *.js and *.js.map files 
var tscConfig = {
   glob: "./app/**/*.ts",
   mapFiles: "./app/**/*.js.map",
   src: ["./app/app.module.ts", "./app/**/*.ts"],
   outDir: "app/"
};
gulp.task("ts-clean", getTask("ts-clean", tscConfig));
// TODO: Get rid of the leading slash
gulp.task("ts-compile", getTask("ts-compile", tscConfig));

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
gulp.task("ts-concat", getTask("ts-concat", tsConfig));
gulp.task("ts-lint", getTask("ts-lint", {

}));

// Use the web.config to determine whether the default task should create a debug or a release build
// If the web.config contains this: '<compilation debug="true"' then we do a default build, otherwise
// we do a release build.  It's a little hacky but generally works
var fs = require("fs");
var data = fs.readFileSync(__dirname + "/web.config", "utf-8");
var inDebug = !!data.match(/<compilation debug="true"/);

gulp.task("inDebug", [(inDebug ? "build-debug" : "build-release")]);



