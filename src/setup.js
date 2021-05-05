var $     = require("gulp-load-plugins")({
  pattern: ["*"],
  scope: ["dependencies", "devDependencies"]
});

$.rev.del = require('rev-del');

$.inliner = require('sass-inline-svg');

$.config = {}

$.setConfig = function(opts) {
  // Uset this to disable minify/uglify
  // or manifesting
  // 
  // disableMinify:   true
  // disableManifest: true

  Object.assign($.config, opts)
  return $.config;
}

module.exports = $