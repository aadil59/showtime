'use strict';
var gulp = require("gulp"),

    // Task Ragister
    sass = require('gulp-sass'),
    sassLint = require('gulp-sass-lint'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    // var del = require('del');
    runSequence = require('run-sequence'),
    imagemin = require('gulp-imagemin');

// Sass
gulp.task('sass', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

//   // Run Compile Sass and Sass linter

// src variable
var vendorJSFiles = [
'node_modules/jquery/dist/jquery.min.js',
'node_modules/jquery-ui/ui/widgets/datepicker.js'];

// Load Concat task for JS files
gulp.task('vendorJS', function () {
    return gulp.src(vendorJSFiles)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./dist/assets/js/'));
});

// src variable
var vendorCSSFiles = [
    'node_modules/jquery-ui/themes/base/datepicker.css'];

// Load Concat task for CSS files
gulp.task('vendorCSS', function () {
    return gulp.src(vendorCSSFiles)
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('./dist/assets/css/'));
});


// Load minify task for CSS files
gulp.task('compressCSS', function () {
    return gulp.src('dist/assets/css/*.css')
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('dist/assets/css/'));
});

// Load uglify task for JS files
gulp.task('compressJS', function (cb) {
    pump([
            gulp.src('dist/assets/js/*.js'),
            uglify(),
            gulp.dest('dist/assets/js/')
        ],
        cb
    );
});

//Clean Task
//gulp.task('clean:dist', function () {
//    return del.sync('dist')
//});

// Image min (to compress Images)
// gulp.task('imgCompress', function () {
//     gulp.src('src/images/**/*')
//         .pipe(imagemin({
//             optimizationLevel: 10,
//             progressive: true,
//             interlaced: true,
//             multipass: true,
//             svgPlugins: [{
//                 removeViewBox: true
//             }]
//         }))
//         .pipe(gulp.dest('dist/assets/images'))
// });

//Auto live reload Task
// Static Server + watching scss/html files
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
});
// Copy files
gulp.task('copyJS', function () {
    gulp.src('src/js/*.js')
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('watch', ['browserSync', 'copyJS'], function () {
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/js/*.js', ['copyJS']);
    gulp.watch('dist/*.html', browserSync.reload);
});


gulp.task('default', function (callback) {
    runSequence(['watch'],
        callback
    )
});
gulp.task('build', function (callback) {
    runSequence(['vendorJS', 'vendorCSS', 'compressCSS', 'compressJS'],
        callback
    )
});