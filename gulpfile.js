var source = require('vinyl-source-stream');
var gulp = require('gulp');
var browserify = require('browserify');
var less = require('gulp-less');
var path = require('path');
var browserSync = require('browser-sync');
var reload = browserSync.reload;



gulp.task('less', function () {
  return gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/css'))
    .pipe(reload({stream:true}));
});

gulp.task('images',function(){
 gulp.src('img/**').pipe(gulp.dest('./public/img'))
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



// run 'scripts' task first, then watch for future changes
gulp.task('default', ['copyhtml', 'less','images', 'browser-sync'], function() {
  gulp.watch('source/less/**/*', ['less']);
  gulp.watch('source/*.html', ['copyhtml']);
});

gulp.task('build', ['copyhtml', 'less', 'images'], function() {
});
