## 唯一性
```javascript
const s1 = Symbol(1)
const s2 = Symbol(2)
console.log(s1 == s2) // false
console.log(s1 === s2) // false
```


## 防止覆盖对象属性
```javascript
function Person(name) {
  this.name = name
}
Person.prototype.hello = function() {
  console.log(`hello, ${this.name}`)
}

const p = new Person('xpzheng')
const hello = Symbol('hello')
p[hello] = function() {
  console.log(`你好，${this.name}`)
}

p.hello()
p[hello]()
```


## 迭代器与生成器
```javascript
const arr = [1, 2, 3]
console.log(arr[Symbol.iterator])

const timer = {
  max: 100,
  [Symbol.iterator]() {
    let curr = 0
    return {
      next: () => {
        return {
          value: ++curr,
          done: curr > this.max
        }
      }
    }
  }
}

console.log(timer)
for (let time of timer) {
  console.log(time)
}
// => 1, 2, 3, ..., 100
```