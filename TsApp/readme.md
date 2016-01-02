## Introduction

This project aims to put together a bunch of reuseable gulp tasks that  are used to build an MVC-5 angular typescript app with a number of custom bootstrap files.

Each of the gulp tasks is in the gulp-tasks folder. 

The dependencies for each task are in the file.

The gulpfile.js file has a method that configures a task, gets it and allows it to be composed with other tasks.

So far we have the following in gulp-tasks:

1. app-inject
1. bower-css
1. bower-js
1. bower-wiredep
1. clean
1. less-bootstrap: creates a custom bootstrap file TODO: Add options to use more than one customisation
1. ng-annotate
1. ng-templates
1. ts-clean
1. ts-compile: Build *.js from *.ts and create source maps
1. ts-concat: Build a single app.js file
1. ts-lint
1. wiredep 

In gulpfile.js we have:

1. build-debug
1. build-release
1. default: ["build-debug", "build-release"]
1. all: run all of the tasks just to make sure they are working


### References
1. [gulp-wiredep and gulp-inject](http://blog.johnnyreilly.com/2015/02/using-gulp-in-asp-net-instead-of-web-optimization.html)

