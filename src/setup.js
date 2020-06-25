var $     = require("gulp-load-plugins")({
  pattern: ["*"],
  scope: ["dependencies", "devDependencies"]
});

$.rev.del = require('rev-del');

$.inliner = require('sass-inline-svg');

module.exports = $