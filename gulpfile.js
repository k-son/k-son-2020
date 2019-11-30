const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');

const babel = require('gulp-babel');
const plumber = require('gulp-plumber');

// compile scss into css and stream changes
function style() {
  // 1. where is my scss file
  return gulp.src('./scss/main.scss')
  // 2. pass that file through sass compiler
  .pipe(sass().on('error', sass.logError))
  // 3. autoprefix
  .pipe(autoprefixer({cascade: false}))
  // 4. where do I save the compiled CSS and minified CSS
  .pipe(gulp.dest('css'))
  .pipe(cleanCSS())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('css'))
  // 5. stream changes to all browsers
  .pipe(browserSync.stream());
}

// watch
function watch(){
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  // watch for any change in any scss file. if then run style function.
  // etc.
  gulp.watch('./scss/**/*.scss', style);
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

// start that function by typing in terminal -->  gulp style
// it will create css folder and .css file in it
exports.style = style;

// start by typing in terminal --> gulp watch
exports.watch = watch;
