const gulp  = require('gulp');
const $     = require("./setup");

// process all javascript files.
// It runs them through gulp-include and creates uglified versions of 
// them, including sourcemaps.

// JAVASCRIPT FILES
module.exports = function scripts() { 
  return gulp.src("./source/**/[^_]*.js")
    .pipe($.include())
    .pipe($.babel({presets: ['@babel/env'], plugins: ['@babel/transform-react-jsx']}))
    .pipe(gulp.dest('build'))
    .pipe($.uglify())
    .pipe($.rename({suffix: '.min'}))
    .pipe($.rev())
    .pipe(gulp.dest('build'))
    .pipe($.rev.manifest("manifest.scripts.json"))
    .pipe($.rev.del({dest:'build'}))
    .pipe(gulp.dest('build'));
}
