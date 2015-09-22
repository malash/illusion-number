'use scrice';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plugins = require('gulp-load-plugins')(),
    livereload = plugins.livereload,
    logger = require('winston');

gulp.task('css', function() {
    // postcss + precss
    // return gulp.src('src/*.css')
    //     .pipe(plugins.postcss([
    //         require('precss'),
    //         require('postcss-calc'),
    //         require('postcss-nested'),
    //         require('autoprefixer')
    //     ]))
    //     .pipe(gulp.dest('dest/'))
    //     .pipe(livereload());

    // sass + postcss
    return gulp.src('src/*.scss')
        .pipe(sass({ indentWidth: 4 }).on('error', sass.logError))
        .pipe(plugins.postcss([
            require('autoprefixer'),
            // require('cssnano')
        ]))
        .pipe(gulp.dest('dest/'));
});

gulp.task('dev', function() {
    livereload.listen({
        start: true
    });
    gulp.watch('src/*.*', ['css']).on('change', function(file) {
        livereload.changed('example/index.html');
    });
    gulp.watch('example/*').on('change', function(file) {
        livereload.changed(file);
    })
});

gulp.task('build', ['css']);
