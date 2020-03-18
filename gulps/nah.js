const gulp  = require('gulp');
const $     = require("./setup");

// I haven't really fleshed this one out completely, but the idea
// is that certain files were meant to be uploaded to a counterpart
// on net-at-hand.  This would let me build a page locally but upload
// it to the website.
module.exports = function nah() {
  return gulp.src("./build/**/*.nah.html")
    .pipe($.nah.updatePage())
}
