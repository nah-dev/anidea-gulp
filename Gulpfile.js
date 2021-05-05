var e = require("./src/index")

// In some scenarios you may not want to minify css or js
// nor mess with file versioning with manifests.
// 
// This is an example of how to disable them.
e.setup.setConfig({
  disableMinify: true, 
  disableManifest: true
})

module.exports = e