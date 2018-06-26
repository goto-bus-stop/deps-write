var test = require('tape')
var tmp = require('tmp')
var readFileTree = require('read-file-tree')
var depsWrite = require('..')

test('simple extraction', function (t) {
  var dir = tmp.dirSync({ unsafeCleanup: true })
  t.on('end', dir.removeCallback)

  var s = depsWrite({ dir: dir.name })
  s.on('error', t.error)
  s.on('finish', function () {
    t.deepEqual(readFileTree.sync(dir.name, { encoding: 'utf8' }), {
      'app.js': 'module.exports = require("./a") + require("./b")',
      'a.js': 'module.exports = 1',
      'b.js': 'module.exports = 2'
    })
    t.end()
  })

  s.write({
    id: './app.js',
    source: 'module.exports = require("./a") + require("./b")',
    deps: { './a': './a.js', './b': './b.js' }
  })
  s.write({ id: './a.js', source: 'module.exports = 1' })
  s.end({ id: './b.js', source: 'module.exports = 2' })
})

test('numeric module ids', function (t) {
  var dir = tmp.dirSync({ unsafeCleanup: true })
  t.on('end', dir.removeCallback)

  var s = depsWrite({ dir: dir.name })
  s.on('error', t.error)
  s.on('finish', function () {
    t.deepEqual(readFileTree.sync(dir.name, { encoding: 'utf8' }), {
      '0.js': 'module.exports = require("./a") + require("./b")',
      '1.js': 'module.exports = 1',
      '2.js': 'module.exports = 2'
    })
    t.end()
  })

  s.write({
    id: 0,
    source: 'module.exports = require("./a") + require("./b")',
    deps: { './a': './a.js', './b': './b.js' }
  })
  s.write({ id: 1, source: 'module.exports = 1' })
  s.end({ id: 2, source: 'module.exports = 2' })
})
