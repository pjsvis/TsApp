
## vendor *.js and *.css files
1. gulp-wiredep => index.html
1. gulp-uglify => ./dist/vendor.js and ./dist/vendor.css

## app css files

        ./css/*.css
1.  

## bootstrap less files

      ./less
         common.other
         /bootstrap
            bootstrap.less
            bootstrap.css
            bootstrap.min.css
            bootstrap.css.map
         /fis
            ...
         /heartland
            ...
         /worldpay
            ...

1. gulp-less to ./less/clientFolder/bootstrap.css, bootstrap.min.css, bootstrap.map
1. gulp-concat with app.css to ./dist/app.css

## angular-templates

        ./app/templates
1. gulp-angular-templatecache => ./app/templates.js
        
## app ts files

        ./app
            /directives
            /services
            /templates
            /home
            /about

1. tsc with sourcemaps 
1. Inject ts=>js into index.html
1. Inject other ./app/*js using

        "files.exclude": {
        "**/*.js": {
            "when": "$(basename).ts"
        }

1. Concat and minify to ./dist/app.js
