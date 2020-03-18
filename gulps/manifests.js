const gulp  = require('gulp');
const $     = require("./setup");

// This combines the manifests from sass, coffee, and js into a single
// manifest file to use for replacing refs to the 
module.exports = function manifests() {
  return gulp.src('build/manifest.*.json')
    .pipe($.mergeJson({fileName: 'manifest.json'}))
    .pipe(gulp.dest('build'))
}
