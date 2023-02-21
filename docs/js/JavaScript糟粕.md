# JavaScript糟粕

## indexOf缺陷


```javascript
const arr = [1, NaN, 3]
console.log(arr.indexOf(NaN)) // -1
```
`indexOf`内部使用`===`进行比较，因为NaN不等于NaN，所以会找不到。
