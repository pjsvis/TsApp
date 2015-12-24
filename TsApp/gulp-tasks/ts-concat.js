/// <reference path="../typings/tsd.d.ts" />
var gulp = require("gulp");
var expect = require("gulp-expect-file");
var tsc = require("gulp-typescript");
var concat = require("gulp-concat");
var sourcemaps = require("gulp-sourcemaps");
var del = require("del");

var clean = function () {
   return del.sync(["./dist/build.*"]);
};

module.exports = function(config) {
   return function() {
      //TODO: Use config
      console.log("Concatenating typescript:\n".yellow, config);      


      clean();
      var initMsg = ["Cleaning ", config.outDir  ].join('');
      console.log(initMsg.yellow);
      var tsResult = gulp.src(config.src)
         // Ref: https://github.com/kotas/gulp-expect-file
         //.pipe(expect([root, "**/*.ts"]))
         .pipe(sourcemaps.init()) // This means sourcemaps will be generated
         .pipe(tsc({
            sortOutput: true,
            noImplicitAny: true
         }));

      

       tsResult.js
         .pipe(concat(config.outFile)) // You can use other plugins that also support gulp-sourcemaps        
         .pipe(sourcemaps.write("/")) // Now the sourcemaps are added to the .js file         
         .pipe(gulp.dest(config.outDir))
         //.pipe(expect(["dist/build.js", "dist/build.js.map"]));
         .pipe(expect(config.expected));

       var result = ["All *.ts files in [", config.src, "] compiled to ", config.outFile, " in ", config.outDir].join('');
       console.log(result.yellow);
      return tsResult.js;
   };
   // NOTE: sourcemaps do not work yet
   // NOTE: Ref: https://github.com/Microsoft/vscode/issues/936   
};