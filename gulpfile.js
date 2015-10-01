'use scrice';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plugins = require('gulp-load-plugins')(),
    livereload = plugins.livereload,
    logger = require('winston'),
    fs = require('fs');

gulp.task('css', function() {
    return gulp.src('src/*.scss')
        .pipe(sass({ indentWidth: 4 }).on('error', sass.logError))
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 version', '> 5%', 'ie 10', 'ff 10', 'opera 15', 'chrome 12']
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(plugins.minifyCss())
        .pipe(plugins.rename(function (path) {
            path.extname = '.min.css';
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('js', function() {
    return gulp.src('src/*.js')
        .pipe(gulp.dest('dist/'))
        .pipe(plugins.uglify())
        .pipe(plugins.rename(function (path) {
            path.extname = '.min.js';
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('dev', function() {
    livereload.listen({
        start: true
    });
    gulp.watch('src/*.*', ['css', 'js']).on('change', function(file) {
        livereload.changed('example/index.html');
    });
    gulp.watch('example/*').on('change', function(file) {
        livereload.changed(file);
    })
});

gulp.task('build', ['css', 'js']);
gulp.task('default', ['build']);
