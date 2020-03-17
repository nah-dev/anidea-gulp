Static Web Development with Gulp
================================

This library is simply the gulp setup used by anidea for development. It
is mainly used for static web development (html, css, js), but it is also
used as the build method for creating the ruby code for Net-at-hand plugins
(mainly using the include function from gulp-include).

It is meant to be pulled in as a subtree into whatever project you are
working on.  You'll then use the gulpfile by specifying:

| yarn run gulp --gulpfile anidea.gulp/gulpfile.js [action]

You can put this into your tasks file however needed to make it easy
to call up.

--------------------------

The file sample.package.json is just for reference so you can make sure
to include all the needed packages needed for anidea.gulp to process
the files.