const test = require('ava')
'use strict'
const groupByPinyin = require('./index')
const _ = require('lodash')

let arr = [
  {
    name: '张三',
    id: 1
  },
  {
    name: '李四',
    id: 2
  },
  {
    name: 'Li Si',
    id: 3
  },
  {
    name: 'LA',
    id: 6
  },
  {
    name: '123',
    id: 4
  },
  {
    id: 5
  },
]


test('object array', t => {
  let result = groupByPinyin(arr, 'name')
  let expect = {
    L: [
      { name: 'LA', id: 6 },
      { name: 'Li Si', id: 3 },
      { name: '李四', id: 2 },
    ],
    Z: [ { name: '张三', id: 1 } ],
    '#': [
      { name: '123', id: 4 },
      {id: 5},
    ]
  }
  console.log(result)
  t.deepEqual(result, expect)
})

test('string array', t => {
  let strArray = _.map(arr, 'name')
  let result = groupByPinyin(strArray)
  let expect = {
    L: [
      'LA',
      'Li Si',
      '李四',
    ],
    Z: [ '张三' ],
    '#': [
      '123',
      undefined,
    ]
  }
  console.log(result)
  t.deepEqual(result, expect)
})
