const gulp  = require('gulp');
const $     = require("gulp-load-plugins")({
  pattern: ["*"],
  scope: ["devDependencies"]
});

// $.spawn     = require('child_process').spawn;
$.sync   = $.browserSync.create();
$.reload = $.browserSync.reload;

//################################################################

// This function won't really be used anymore as I'm transitioning to 
// pug for all my html pre-processing.
function haml() {
  return gulp.src('source/**/[^_]*.haml')
    .pipe($.haml())
    .pipe(gulp.dest('build'));
}


// Process all sass files for css.
function sass() {
  return gulp.src('source/**/*.+(sass|scss)')
    .pipe($.sass())
    .on('error', function(err) {
      console.log(err.toString());
      this.emit('end');
    })
    .pipe($.sourcemaps.init())
      .pipe($.cleanCss())
    .pipe($.sourcemaps.write("."))
    .pipe(gulp.dest('build'))
    .pipe($.sync.stream());
}

// Process all pug templates
// This does not include processing through gulp-include because pug
// has that sort of thing built in.
function pug() {
  return gulp.src("source/**/[^_]*.pug")
    .pipe($.pug())
    .on('error', function(err) {
      console.log(err.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('build'));
};

// Process all coffeescript files
// includes processing through gulp-include
function coffee() {
  return gulp.src("source/**/[^_]*.coffee")
    .pipe($.include())
    .pipe($.coffee({transpile: {presets:['@babel/env'], plugins: ['@babel/transform-react-jsx']}}))
    .pipe(gulp.dest('build'));
}

// process all javascript files.
// It runs them through gulp-include and creates uglified versions of 
// them, including sourcemaps.
function scripts() {
  return gulp.src("./source/**/[^_]*.js")
    .pipe($.include())
    .pipe($.babel({presets: ['@babel/env'], plugins: ['@babel/transform-react-jsx']}))
    .pipe(gulp.dest('build'))
    .pipe($.sourcemaps.init())
      .pipe($.uglify())
      .pipe($.rename({suffix: '.min'}))
    .pipe($.sourcemaps.write("."))
    .pipe(gulp.dest('./build'))
}

// This function processes html files so you can include other filew
// within them.  This way you can build up a file from multiple parts.
function html() {
  return gulp.src("./source/**/*.html")
    .pipe($.include())
    .pipe(gulp.dest("./build"))
}

// This is used for building Net-at-hand plugins.  It simply processes
// ruby files for the gulp-include syntax so you can build the plugin
// code without relying on the order of the files in the filesystem.
// 
// For plugins, there needs to be an output.rb file within the source
// folder that then gets processed into the build folder and picked
// up by the rake tasks for the rest of it.
function ruby() {
  return gulp.src("./source/**/*.rb")
    .pipe($.include({
      extensions:     'rb',
      includePaths:   ["./lib.calm"],
      hardFail:       true,
      separateInputs: true
    }))
    .pipe(gulp.dest("./build"))
}


// I don't know that I really use this one at all, but for compatibility
// I am leaving it in.
gulp.task('compile', gulp.parallel(
  sass,
  pug,
  coffee,
  scripts
))

//################################################################

// I haven't really fleshed this one out completely, but the idea
// is that certain files were meant to be uploaded to a counterpart
// on net-at-hand.  This would let me build a page locally but upload
// it to the website.
function nah() {
  return gulp.src("./build/**/*.nah.html")
    .pipe($.nah.updatePage())
}

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

function watch() {
  // Start the browser sync session
  initBrowserSync();

  // Do an initial run of all builders
  haml();
  sass();
  pug();
  coffee();
  scripts();

  // watch and rebuild as necessary
  gulp.watch(['./source/**/*.+(sass|scss)','!source/**/*.pug.sass'], sass);
  gulp.watch(['./source/**/*.html', '**/source/**/*.js'], html);
  
  // The haml is temporarily including a mock_base_render_view.js while
  // the module is being developed.  it's also included in the reload
  // watch statement
  gulp.watch(['./source/**/*.haml','lib*/**/*.haml','./mock_base_render_view.js'], haml);
  gulp.watch('./source/**/*.+(pug|pug.sass)', pug);
  gulp.watch("./source/**/*.coffee", coffee);
  gulp.watch("./source/**/*.js", scripts);
  // Had to add lib haml stuff for reload to work with rendered views
  gulp.watch(['./build/**/*.+(html|js|json)', "**/source/**/*.+(html|js|json|pug|haml)"])
      .on('all', $.sync.reload);
}

//################################################################

exports.watch   = watch;
exports.sass    = sass;
exports.coffee  = coffee;
exports.scripts = scripts;
exports.pug     = pug;
exports.nah     = nah;
exports.haml    = haml;
exports.ruby    = ruby;
exports.html    = html;

