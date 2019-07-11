var assert = require('assert')
var mkdirp = require('mkdirp')
var sink = require('to2').obj
var path = require('path')
var fs = require('fs')

module.exports = function (opts) {
  if (!opts) opts = {}
  assert.strictEqual(typeof opts.dir, 'string', 'deps-write: opts.dir must be a file path')
  var madeDirs = Object.create(null)

  return sink(onrow)

  function onrow (row, enc, next) {
    var source = row.source
    var sourceFile = row.file
    if (sourceFile && opts.root) {
      sourceFile = path.relative(opts.root, sourceFile)
    }
    var basename = appendJS(sourceFile || row.id)
    var filename = path.join(opts.dir, basename)

    if (/^\.\.\//.test(path.relative(opts.dir, filename))) {
      filename = filename.replace(/\.\.\//g, '__parent/')
    }

    if (!/\.js$/.test(filename)) {
      filename += '.js'
    }

    var dirname = path.dirname(filename)
    if (madeDirs[dirname]) {
      write()
    } else {
      mkdirp(dirname, write)
    }

    function write (err) {
      if (err) return next(err)
      madeDirs[dirname] = true
      fs.writeFile(filename, source, next)
    }
  }
}

function appendJS (name) {
  if (typeof name === 'string' && path.extname(name) === '.js') {
    return name
  }
  return name + '.js'
}
