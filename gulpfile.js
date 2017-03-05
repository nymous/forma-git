var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var mustache = require('gulp-mustache');
var del = require('del');
var browserSync = require('browser-sync');
var download = require('gulp-download-stream');

const paths = {
  htmlSrc: 'src/index.html',
  mdSrc: 'src/presentation.md',
  cssSrc: 'src/assets/css/stylesheet.css',
  assetsDir: 'src/assets',
  jsDir: 'src/assets/js',
  imgDir: 'src/assets/img',
  distDir: 'dist',
}

gulp.task('compileHtml', function () {
  return gulp.src(paths.htmlSrc)
    .pipe(mustache())
    .pipe(gulp.dest(paths.distDir));
});

gulp.task('compileCss', function () {
  return gulp.src(paths.cssSrc)
    .pipe(gulp.dest(paths.distDir + '/assets/css'));
});

gulp.task('copyImg', function() {
    return gulp.src(paths.imgDir + '/**/*', {base: paths.assetsDir})
      .pipe(gulp.dest(paths.distDir + '/assets'));
});

gulp.task('copyJs', function() {
    return gulp.src(paths.jsDir + '/**/*', {base: paths.assetsDir})
      .pipe(gulp.dest(paths.distDir + '/assets'));
});

gulp.task('copyAssets',['copyImg', 'copyJs']);

gulp.task('build',['compileHtml', 'compileCss', 'copyAssets']);

gulp.task('md-watch',['build'], function(done) {
    browserSync.reload();
    done();
});

gulp.task('html-watch',['build'], function(done) {
    browserSync.reload();
    done();
});

gulp.task('css-watch', ['compileCss'], function(done) {
    browserSync.reload();
    done();
});

gulp.task('watch',['build'], function() {
    browserSync.init({
      server: {
        baseDir: paths.distDir
      }
    });

    gulp.watch(paths.mdSrc, ['md-watch']);
    gulp.watch(paths.htmlSrc, ['html-watch']);
    gulp.watch(paths.cssSrc, ['css-watch']);
});

gulp.task('deploy', ['build'], function() {
  return gulp.src(paths.distDir +  '/**/*')
    .pipe(ghPages());
});

gulp.task('updateRemark', function() {
    download({
      file: 'remark.min.js',
      url: 'https://gnab.github.io/remark/downloads/remark-latest.min.js',
    })
      .pipe(gulp.dest(paths.jsDir));
});

gulp.task('clean', function() {
    del([
        paths.distDir
      ]);
});
