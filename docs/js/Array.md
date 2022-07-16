## 稀疏数组

```javascript
const arr = []
arr[1] = 1
arr[50] = undefined
arr[100] = 100
```
arr即为一个稀疏数组，稀疏数组的特点：

* for...of循环会按照length的长度迭代
* forEach/map/reduce等迭代api会忽略空缺的位置

## indexOf缺陷


```javascript
const arr = [1, NaN, 3]
console.log(arr.indexOf(NaN)) // -1
```
`indexOf`内部使用`===`进行比较，因为NaN不等于NaN，所以会找不到。