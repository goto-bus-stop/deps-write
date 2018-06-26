#!/usr/bin/env node

var JSONStream = require('JSONStream')
var argv = require('minimist')(process.argv.slice(2))
var write = require('.')

var dirname = argv._[0]
if (!dirname) {
  console.error('usage: deps-write <dirname>')
  process.exit(1)
}

argv.dir = dirname

process.stdin
  .pipe(JSONStream.parse([ true ]))
  .pipe(write(argv))
