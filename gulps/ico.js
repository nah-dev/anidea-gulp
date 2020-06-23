var gulp = require("gulp");
var ico  = require("gulp-to-ico");

module.exports = function() {
  return gulp.src("source/**/favicon.png")
    .pipe(ico('favicon.ico', {resize: true, sizes: [16,24,32,64,128,256]}))
    .pipe(gulp.dest("build/"));
};
