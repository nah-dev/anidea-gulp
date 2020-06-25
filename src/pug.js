const gulp  = require('gulp');
const $     = require("./setup");


// Process all pug templates
// This does not include processing through gulp-include because pug
// has that sort of thing built in.
module.exports = function pug() {
  return gulp.src("source/**/[^_]*.pug")
    .pipe($.pug())
    .on('error', function(err) {
      console.log(err.toString());
      this.emit('end');
    })
    .pipe($.revReplace({manifest: gulp.src("build/manifest.json", {allowEmpty: true})}))
    .pipe(gulp.dest('build'))
    .pipe($.touchFd());
};
