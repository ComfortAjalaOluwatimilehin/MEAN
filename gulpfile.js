// JavaScript source code
var gulp = require("gulp");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
gulp.task("concatme", function () {
    gulp.src("client/angular/**.js")
    .pipe(concat("app.concat.js"))
    .pipe(uglify())
    .pipe(gulp.dest("client/angular"))
})

gulp.task("watch:concatme", ["concatme"], function () {
    gulp.watch("client/angular/**.js",["concatme"])
})