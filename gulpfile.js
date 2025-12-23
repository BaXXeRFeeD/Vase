const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');

gulp.task('sass', function () {
    return gulp.src('src/sass/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/'));
});

gulp.task('js', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('html', function () {
    return gulp.src('*.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('images', function () {
    return gulp.src('src/images/**/*')
        .pipe(gulp.dest('dist/images/'));
});

gulp.task('default', gulp.parallel('sass', 'js', 'html', 'images'));