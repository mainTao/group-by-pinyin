# group-by-pinyin

Sort by pinyin alphabet, and group by initial letter.
Any non-Chinese word will be put into `#` group.

> function(array, path)

`path` can be `'a'`, `'a.b.c'` or `'a[0].b.c'`

## Sample

```js
const groupByPinyin = require('group-by-pinyin')

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

// group by property 'name'
let result = groupByPinyin(arr, 'name')

console.log(result)

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

console.log(expect)

```
