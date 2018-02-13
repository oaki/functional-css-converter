#! /usr/bin/env node
var npm = require('npm')
npm.load(myConfigObject, function (er) {
  if (er) return handlError(er)
  npm.commands.install(['some', 'args'], function (er, data) {
    if (er) return commandFailed(er)
    // command succeeded, and data might have some info
  })
  npm.registry.log.on('log', function (message) { ... })
})