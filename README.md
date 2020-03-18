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


**Use this as a subtree... or maybe not**
-----------------------------------------

This repository is meant to be used as a subtree rather than a node
package.  A node package would make it easier to include in the 
proejct, because we could just add it to the package.json file
and all the necessary node modules would be required automatically.

But pulling it in as a subtree makes it easier for us to make changes.
This will let us process changes within a project and then just push
them to the subtree's repository.

BUT, I'm almost convincing myself that the node module is the way to go.
All it would take is a single--

| require "anidea.gulp";

in the front gulpfile.js and it would just work.  And then this
would make changes a bigger deal (which would decrease the liklihood
that the commits would get too cumbersome and messy).


USAGE
=====
Simply add anidea.gulp to your package.json file.  Create a gulpfile.js
that has the following:
| module.exports = require("anidea.gulp");
This will set everything up.  Then launch it with:
| yarn run gulp watch

This setup creates versioned minified copies of coffee, sass, and js
files.  If the "filename.min.css" is referenced in a pug file, it
will be replaced with the versioned filename "filename-50906d38a5.min.css".

The caveat with this is that if the css file changes, it will have a 
different filename.  You'll need to re-save the pug file where it is 
referenced to pick up the new filename.