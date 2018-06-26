# deps-write

write modules from a module-deps stream to the filesystem instead of bundling

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]

[npm-image]: https://img.shields.io/npm/v/deps-write.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/deps-write
[travis-image]: https://img.shields.io/travis/goto-bus-stop/deps-write.svg?style=flat-square
[travis-url]: https://travis-ci.org/goto-bus-stop/deps-write
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard

## Install

```
npm install deps-write
```

## Usage

```js
var unpack = require('browser-unpack')
var toStream = require('from2-array')
var depsWrite = require('deps-write')

var modules = unpack(bundleSource)
toStream(modules)
  .pipe(depsWrite({ dir: './modules' }))
```

## License

[Apache-2.0](LICENSE.md)
