```ts
function instanceOf(o: any, constructor: Function): boolean {
  let curr = o
  while (curr) {
    const proto = curr.__proto__
    if (proto === constructor.prototype) return true
    curr = proto
  }
  return false
}

```

`instanceof`缺点：
- 无法检测基本数据类型，如`1 instanceof Number => false`