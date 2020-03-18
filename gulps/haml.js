const gulp  = require('gulp');
const $     = require("./setup");

// This function won't really be used anymore as I'm transitioning to 
// pug for all my html pre-processing.
module.exports = function haml() {
  return gulp.src('source/**/[^_]*.haml')
    .pipe($.haml())
    .pipe(gulp.dest('build'));
}

