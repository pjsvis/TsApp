var gulp = require("gulp");
var expect = require("gulp-expect-file");
var tsc = require("gulp-typescript");
var concat = require("gulp-concat");
var sourcemaps = require("gulp-sourcemaps");
var del = require("del");

module.exports = function(gulp, plugins, config) {
   return function () {
      console.log("Compiling typescript:", config);

      var root = "app/app.module.ts";
      var src = ["./app/app.module.ts", "./app/**/*.ts", ".app/**/*.ts"];

      var clean = function() {
         return del.sync(["./dist/build.*"]);
      }

      clean();

      var tsResult = gulp.src(src)
         // Ref: https://github.com/kotas/gulp-expect-file
         .pipe(expect([root, "**/*.ts"]))
         .pipe(sourcemaps.init()) // This means sourcemaps will be generated
         .pipe(tsc({
            sortOutput: true,
            noImplicitAny: true
         }));

      // TODO: Do ng-annotate here

      return tsResult.js
         .pipe(concat("build.js")) // You can use other plugins that also support gulp-sourcemaps        
         .pipe(sourcemaps.write("/")) // Now the sourcemaps are added to the .js file         
         .pipe(gulp.dest("dist"))
         .pipe(expect(["dist/build.js", "dist/build.js.map"]));
   };
};