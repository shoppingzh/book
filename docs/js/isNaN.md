# isNaN与Number.isNaN
`Number.isNaN`是`isNaN`的健壮版本，它会判断传入参数是否是number类型，如果不是，直接返回false。

而`isNaN`会尝试将传入参数转成number，如果失败了，则返回true，其内部原理可以描述为：

```js
isNaN('123x')

// 1. Number('123x') => NaN
// 2. Number.isNaN(NaN) => true
```
