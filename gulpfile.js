const gulp = require('gulp');
const $    = require("./gulps/setup");

const coffee      = require("./gulps/coffee");
const haml        = require("./gulps/haml");
const html        = require("./gulps/html");
const manifests   = require("./gulps/manifests");
const pug         = require("./gulps/pug");
const ruby        = require("./gulps/ruby");
const sass        = require("./gulps/sass");
const scripts     = require("./gulps/scripts");
const watch       = require("./gulps/watch");

//################################################################

gulp.task(
  'compile', 
  gulp.series(
    gulp.parallel(
      sass,
      coffee,
      scripts
    ),
    manifests,
    pug
  )
)


//################################################################

exports.watch     = watch;
exports.sass      = gulp.series(sass, manifests);
exports.coffee    = gulp.series(coffee, manifests);
exports.scripts   = gulp.series(scripts, manifests);
exports.pug       = pug;
exports.nah       = nah;
exports.haml      = haml;
exports.ruby      = ruby;
exports.html      = html;
exports.manifests = manifests;

