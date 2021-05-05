Static Web Development with Gulp
================================

This library is simply the gulp setup used by [an.idea](http://anidea.co) 
for development. It is mainly used for static web development (html, css, js)
but is also used internally to combine ruby code into a single file for 
[Net-at-hand](https://net-at-hand.com) plugins.

The following preprocessors can be used with a live preview of each:
* [SASS](https://sass-lang.com/documentation) for generating CSS
* [Pug](https://pugjs.org/api/getting-started.html) for generating HTML
* [Coffeescript](http://coffeescript.org) for generating javascript

In addition to these, javascript files are run through babel to transform
JSX code.

All of the file types can be combined using [gulp-include](https://github.com/wiledal/gulp-include).
The gulpfile is set up to skip over files that start with an underscore
character (_) to mimic how partials work in a rails application.  This lets
you separate functionality into separate files but then combine them to a single
file using

    //= require "./path/to/file.js"

Usage
-----
To use just add it as a git package to your package.json file (we're not making
it available as an npm package).  Then create a Gulpfile.js file that includes:

    module.exports = require("anidea-gulp");

Make sure there are a ./source and ./build folder; then in a terminal you can
run the preview with

    yarn run gulp watch

This should open up a new browser window pointed to http://localhost:8080 showing
the current folder structure in your build folder.
    
