const gulp  = require('gulp');
const $     = require("./setup");

// This is used for building Net-at-hand plugins.  It simply processes
// ruby files for the gulp-include syntax so you can build the plugin
// code without relying on the order of the files in the filesystem.
// 
// For plugins, there needs to be an output.rb file within the source
// folder that then gets processed into the build folder and picked
// up by the rake tasks for the rest of it.
module.exports = function ruby() {
  return gulp.src("./source/**/*.rb")
    .pipe($.include({
      extensions:     'rb',
      includePaths:   ["./lib.calm","./lib"],
      hardFail:       true,
      separateInputs: true
    }))
    .pipe(gulp.dest("./build"))
}

