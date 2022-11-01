let request = require('./request').default
let classnames = require('classnames')
let config = require('./config')
let menu = require('./menu').default

// eslint-disable-next-line no-extend-native
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase()
  })
}

module.exports = {
  config,
  request,
  classnames,
  menu,
}