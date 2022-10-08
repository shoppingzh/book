**1. 直接调用**

```js
function hello() {
  console.log(this.age) // => undefined
}
```

`this`在非严格模式下为`window`，在严格模式下等于`undefined`

**2. 对象调用**

```js
const p = {
  age: 12,
  hello() {
    console.log(this.age) // => 12
  }
}

p.hello()
```

`this`指向调用的对象。

**3. 显示绑定调用**

```js
function hello() {
  console.log(this.age) // => 12
}

hello.call({
  age: 12
})
```

**4. 构造函数调用**

```js
function Person() {
  this.age = 12
  console.log(this.age) // => 12
}

const p = new Person()
```
