

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css'),
    sass = require('gulp-sass'),
    eslint = require('gulp-eslint'),
    concat = require('gulp-concat');
    imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
    browserSync.init ({
     server: {
        baseDir: "./"
        }
    });
    gulp.watch("./sass/**/*.scss", ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch("./css/*.css").on('change', browserSync.reload);
    gulp.watch("./js/*.js").on('change', browserSync.reload);
});

gulp.task('hello', function(){
    console.log('Hello World');
});

gulp.task('robot', function(){
    console.log('I AM A ROBOT');
});

gulp.task('sass', function () {
     gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function(){
    gulp.src('js/**/*.js')
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('js/'));
});

gulp.task('styles', function(){
    gulp.src('css/**/*.css')
        .pipe(cleanCSS())
        .pipe(rename('styl.min.css'))
        .pipe(gulp.dest('css/'));
});

gulp.task('lint', function() {
    gulp.src('js/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());

});

gulp.task('watch', function(){
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('css/**/*.css', ['styles']);
});

gulp.task('script-concat-min', function() {
    gulp.src('js/**/*.js')
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./js'))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js'));
});

gulp.task('image-min-1',function(){
    gulp.src('./views/images/*.jpg')
    .pipe(imagemin())
    .pipe(gulp.dest('./views/images'))
});

gulp.task('image-min-2',function(){
    gulp.src('./img/*.jpg')
    .pipe(imagemin())
    .pipe(gulp.dest('./img'))
});

gulp.task('default', ['browser-sync']);