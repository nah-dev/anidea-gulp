const gulp = require('gulp');
const $    = require("./setup");

const coffee      = require("./coffee");
const haml        = require("./haml");
const static      = require("./static");
const manifests   = require("./manifests");
const pug         = require("./pug");
const ruby        = require("./ruby");
const sass        = require("./sass");
const scripts     = require("./scripts");
const watch       = require("./watch");
const ico         = require("./ico")
const setup       = require("./setup");

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
exports.haml      = haml;
exports.ruby      = ruby;
exports.static    = static;
exports.manifests = manifests;
exports.ico       = ico;
exports.setup     = setup;

