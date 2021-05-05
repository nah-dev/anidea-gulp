const gulp  = require('gulp');
const $     = require("./setup");

// Process all coffeescript files
// includes processing through gulp-include
module.exports = function coffee() {
  var result = gulp.src("source/**/[^_]*.coffee")
    .pipe($.include())
    .pipe($.coffee({transpile: {presets:['@babel/env']}}))
    .pipe(gulp.dest('build'))
  
  if ( !$.config.disableMinify ) {
    result = result.pipe($.uglify())
      .pipe($.rename({suffix: '.min'}))
      .pipe($.rev())
      .pipe(gulp.dest('build'))
  }
  if ( !$.config.disableManifest ) {
    result = result.pipe($.rev.manifest("manifest.coffee.json"))
      .pipe($.rev.del({dest:'build'}))
      .pipe(gulp.dest('build'));
  }
  return result;
}
