var source = require('vinyl-source-stream');
var gulp = require('gulp');
var browserify = require('browserify');
var sass = require('gulp-sass');
var path = require('path');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var gutil = require('gulp-util');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("./source/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./public/css"))
        .pipe(browserSync.stream());
});

gulp.task('images',function(){
 gulp.src('./source/img/**').pipe(gulp.dest('./public/img'))
});

gulp.task('browser-sync', function() {
    browserSync({
        server : "./public"
    });
});

gulp.task('copyhtml', function() {
  gulp.src('source/*.html').pipe(gulp.dest('public'))
  .pipe(reload({stream:true}));

});

gulp.task('build-js', function() {  
    var b = browserify({
        entries: './source/js/app.js',
        debug: true,
        paths: ['./source/js/controllers', './source/js/services', './source/js/directives'],
        transform: []
    });
 
    return b.bundle()
        .pipe(source('bundle.js'))
        .on('error', gutil.log)
        .pipe(gulp.dest('./public/js/'));
});


// run 'scripts' task first, then watch for future changes
gulp.task('default', ['copyhtml', 'sass', 'images', 'build-js', 'browser-sync'], function() {
  gulp.watch('source/scss/**/*', ['sass']);
  gulp.watch('source/*.html', ['copyhtml']);
});

gulp.task('build', ['copyhtml', 'sass', 'images','build-js'], function() {
});