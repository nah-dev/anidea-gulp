const gulp  = require('gulp');
const $     = require("./setup");

// This function processes html files so you can include other filew
// within them.  This way you can build up a file from multiple parts.
module.exports = function html() {
  return gulp.src("./source/**/*.html")
    .pipe($.include())
    .pipe(gulp.dest("./build"))
}
