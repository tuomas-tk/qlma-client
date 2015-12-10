var source = require('vinyl-source-stream');
var gulp = require('gulp');
var browserify = require('browserify');
var less = require('gulp-less');
var path = require('path');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var gutil = require('gulp-util');

gulp.task('less', function () {
  return gulp.src('./source/less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/css'))
    .pipe(reload({stream:true}));
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
gulp.task('default', ['copyhtml', 'less', 'images', 'build-js', 'browser-sync'], function() {
  gulp.watch('source/less/**/*', ['less']);
  gulp.watch('source/*.html', ['copyhtml']);
});

gulp.task('build', ['copyhtml', 'less', 'images','build-js'], function() {
});
