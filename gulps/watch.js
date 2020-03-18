const gulp  = require('gulp');
const $     = require("./setup");

$.sync    = $.browserSync.create();
$.reload  = $.sync.reload;


const sass      = require("./sass");
const coffee    = require("./coffee");
const scripts   = require("./scripts");
const manifests = require("./manifests");
const pug       = require("./pug");

//################################################################

function initBrowserSync() {
  $.sync.init({
    server: {
      baseDir: 'build',
      directory: true
    },
    notify: false,
    open: true,
    port: 8080
  });
}

function initiateWatch() {
  gulp.watch(['./source/**/*.+(sass|scss)','!source/**/*.pug.sass'], gulp.series(sass, manifests));
  gulp.watch('./source/**/*.+(pug|pug.sass)', pug);
  gulp.watch("./source/**/*.coffee", gulp.series(coffee, manifests));
  
  // .pre.js files in build are meant to be included in other js files
  // in source.
  gulp.watch(["./source/**/*.js","./build/**/*.pre.js"], gulp.series(scripts, manifests));
  gulp.watch(['./build/**/*.+(html|js)'])
      .on('change', $.reload);

}

async function watch() {
  // Do an initial run of all builders
  await gulp.series(
    gulp.parallel(
      sass,
      coffee,
      scripts
    ),
    manifests,
    pug,
    initBrowserSync
  )();
  
  initiateWatch();

}


module.exports = watch;

/* This watch function was from previous builds, it was superceeded
by work done in lodi.ratchetstraps.com.  This is left here commented out
to make some stuff available if needed. */
// function watch() {
//   // Start the browser sync session
//   initBrowserSync();

//   // Do an initial run of all builders
//   haml();
//   sass();
//   pug();
//   coffee();
//   scripts();

//   // watch and rebuild as necessary
//   gulp.watch(['./source/**/*.+(sass|scss)','!source/**/*.pug.sass'], sass);
//   gulp.watch(['./source/**/*.html', '**/source/**/*.js'], html);
  
//   // The haml is temporarily including a mock_base_render_view.js while
//   // the module is being developed.  it's also included in the reload
//   // watch statement
//   gulp.watch(['./source/**/*.haml','lib*/**/*.haml','./mock_base_render_view.js'], haml);
//   gulp.watch('./source/**/*.+(pug|pug.sass)', pug);
//   gulp.watch("./source/**/*.coffee", coffee);
//   gulp.watch("./source/**/*.js", scripts);
//   // Had to add lib haml stuff for reload to work with rendered views
//   gulp.watch(['./build/**/*.+(html|js|json)', "**/source/**/*.+(html|js|json|pug|haml)"])
//       .on('all', $.sync.reload);
// }
