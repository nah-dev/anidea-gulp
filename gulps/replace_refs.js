const gulp  = require('gulp');
const $     = require("./setup");

/* This does the work of actually replacing the refs within files that
end in .manifest.html.
The problem that remains with this still is that it can only be run
once and the pug or whatever will need to be recompiled if there
is a change in the manifests.  What would be better is to do it
automatically if there is a change in the manifest.

I had done this previously but it was generating a *.manifest.html for
every pug file, regardless of if there were any changes in it or not.
If there were a way for it to know if it had done any replacing within
the file and then generate the destination if there were.*/
module.exports = function replaceRefs() {
  return gulp.src("build/**/*.manifest.html")
    .pipe($.revReplace({manifest: gulp.src("build/manifest.json")}))
    .pipe(gulp.dest("./build"))
}


