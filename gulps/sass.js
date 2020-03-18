const gulp  = require('gulp');
const $     = require("./setup");

// Process all sass files for css.

// SASS FILES
module.exports = function sass() {
  return gulp.src('source/**/*.+(sass|scss)')
    .pipe($.sass({
      functions: {
        'svg':        $.inliner('./source/', {}),
        'inline-svg': $.inliner('./source/', {})
      }
    }))
    .on('error', function(err) {
      console.log(err.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('build'))
    .pipe($.cleanCss())
    .pipe($.rename({suffix: '.min'}))
    .pipe($.rev())
    .pipe(gulp.dest('build'))
    .pipe($.rev.manifest('manifest.sass.json'))
    .pipe($.rev.del({dest:"build"}))
    .pipe(gulp.dest('build'))
    .pipe($.reload({stream: true}));
}