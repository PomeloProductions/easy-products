/**
 * Created by bryce on 2/8/17.
 */


const gulp = require('gulp');
const scss = require('gulp-scss');
const cssmin = require('gulp-cssmin');
const watch = require('gulp-watch');
const rename = require('gulp-rename');
const babelify = require('babelify');
const browserify = require('browserify');
const v_buffer = require('vinyl-buffer');
const v_source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const environments = require('gulp-environments');
const concat = require('gulp-concat');

// set evironment variables
var development = environments.development;
var production = environments.production;

// gulp javascript task - bundle and minify es6 to es5 and create a sourcemap
gulp.task('js', function(){
    var bundler = browserify({
        entries: 'assets/js/app/main.js',
        debug: true
    });
    bundler.transform(babelify, {
        presets: "es2015"
    });

    bundler.bundle()
        .on("error", function(err){ console.error(err); })
        .pipe(v_source('main.js'))
        .pipe(v_buffer())
        .pipe(development(sourcemaps.init({ loadMaps: true })))
        .pipe(rename('app.min.js'))
        .pipe(production(concat('app.min.js')))
        .pipe(production(uglify()))
        .pipe(development(sourcemaps.write('./')))
        .pipe(gulp.dest('./dist/js/'));

    bundler = browserify({
        entries: 'assets/js/admin/main.js',
        debug: true
    });
    bundler.transform(babelify, {
        presets: "es2015"
    });

    bundler.bundle()
        .on("error", function(err){ console.error(err); })
        .pipe(v_source('main.js'))
        .pipe(v_buffer())
        .pipe(development(sourcemaps.init({ loadMaps: true })))
        .pipe(rename('admin.min.js'))
        .pipe(production(concat('admin.min.js')))
        .pipe(production(uglify()))
        .pipe(development(sourcemaps.write('./')))
        .pipe(gulp.dest('./dist/js/'));
});

// gulp less task - compile LESS documents and minify
gulp.task('app-scss', function(){
    return gulp.src(['./assets/scss/app/app.scss'])
        .pipe(scss().on('error', function(err){
            console.log(err);
        }))
        .pipe(production(cssmin().on('error', function(err){
            console.log(err);
        })))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./dist/styles/'));
});

// gulp less task - compile LESS documents and minify
gulp.task('admin-scss', function(){
    return gulp.src(['./assets/scss/admin/admin.scss'])
        .pipe(scss().on('error', function(err){
            console.log(err);
        }))
        .pipe(production(cssmin().on('error', function(err){
            console.log(err);
        })))
        .pipe(concat('admin.css'))
        .pipe(gulp.dest('./dist/styles/'));
});

// gulp watch task - run less and js tasks
gulp.task('watch', function () {
    gulp.watch('./assets/scss/app/**/**.scss', ['app-scss']);
    gulp.watch('./assets/scss/admin/**/**.scss', ['admin-scss']);
    gulp.watch('./assets/js/**/**.js', ['js']);
});

gulp.task('default', ['app-scss', 'admin-scss', 'js', 'watch']);
