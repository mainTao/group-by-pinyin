'use strict'

const _ = require('lodash')
const pinyin = require('pinyin')

module.exports = function (list, path) {
  let pathArray = _.toPath(path)
  let getStringFn

  if(pathArray.length > 0){
    getStringFn = function (obj) {
      return _.get(obj, pathArray, '~')
    }
  }
  else{
    getStringFn = function (str) {
      if(!_.isString(str)){
        return '~'
      }
      return str
    }
  }

  list = list.map(c => {
    return {
      origin: c,
      pinyin: pinyin(getStringFn(c))[0][0]
    }
  })

  list = list.sort(function (a, b) {
    if(a.pinyin > b.pinyin){
      return 1
    }
    if(a.pinyin < b.pinyin){
      return -1
    }
    return 0
  })

  let ret = _.groupBy(list, c => {
    let firstChar = c.pinyin.toUpperCase()[0]
    if(firstChar < 'A' || firstChar > 'Z'){
      return '#'
    }
    return firstChar
  })

  ret = _.each(ret, (arr, key) => {
    ret[key] = _.map(arr, 'origin')
  })

  // move # to the end
  let temp = ret['#']
  delete ret['#']
  ret['#'] = temp

  return ret
}
