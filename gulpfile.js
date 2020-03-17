const gulp  = require('gulp');
const $     = require("gulp-load-plugins")({
  pattern: ["*"],
  scope: ["devDependencies"]
});

// $.spawn     = require('child_process').spawn;
$.sync   = $.browserSync.create();
$.reload = $.browserSync.reload;

//################################################################

function haml() {
  return gulp.src('source/**/[^_]*.haml')
    .pipe($.haml())
    .pipe(gulp.dest('build'));
}

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

function pug() {
  return gulp.src("source/**/[^_]*.pug")
    .pipe($.pug())
    .on('error', function(err) {
      console.log(err.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('build'));
};

function coffee() {
  return gulp.src("source/**/[^_]*.coffee")
    .pipe($.include())
    .pipe($.coffee({transpile: {presets:['@babel/env'], plugins: ['@babel/transform-react-jsx']}}))
    .pipe(gulp.dest('build'));
}

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

function html() {
  return gulp.src("./source/**/*.html")
    .pipe($.include())
    .pipe(gulp.dest("./build"))
}

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

gulp.task('compile', gulp.parallel(
  sass,
  pug,
  coffee,
  scripts
))

//################################################################

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

