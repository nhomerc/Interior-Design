"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var csso = require('gulp-csso');
var rename = require("gulp-rename");

gulp.task("style", function () {
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(csso())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest("./build/css"))

    .pipe(server.stream());
  gulp.src("source/css/*.css") //Выберем файлы по нужному пути
    .pipe(gulp.dest("./build/css"))
});

gulp.task('js', function () {
  gulp.src('source/js/script.js') // файлы, которые обрабатываем
    .pipe(uglify()) // получившуюся "портянку" минифицируем
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./build/js/')) // результат пишем по указанному адресу
});

gulp.task('image', function () {
  gulp.src('source/img/**/*') // берем любые файлы в папке и ее подпапках
    .pipe(imagemin({ //Сожмем их
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest("./build/img")) //И бросим в build
});

gulp.task('fonts', function () {
  gulp.src("source/fonts/*.woff")
    .pipe(gulp.dest("./build/fonts"))
});

gulp.task('html', function () {
  gulp.src("source/*.html") //Выберем файлы по нужному пути
    .pipe(gulp.dest("./build")) //Выплюнем их в папку build
});

gulp.task('build', [
  'js',
  'style',
  'fonts',
  'image',
  "html"
]);

gulp.task("serve", ["style"], function () {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("source/*.html").on("change", server.reload);
});
