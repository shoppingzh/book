### 1\. 创建一个简单对象
```js
const obj = {}
```
### 2\. 设置对象的原型为构造函数的原型对象
```js
Object.setPrototypeOf(obj, Constructor.prototype)
```
作用：这样这个简单对象才能访问到构造函数原型链上的属性、方法。

### 3\. 执行构造函数
```js
const result = Constructor.apply(obj, Array.prototype.slice.call(arguments, 1))
```
作用：创建一个对象，当然需要执行构造函数。

### 4\. 返回创建后的对象
```js
return typeof result === 'object' ? result : obj
```
如果构造函数有对象类型的返回值，返回，否则，返回这个创建的对象。