```ts
function bind(fn: Function, thisArg: any, ...presetArgs: any[]) {
  const context = thisArg || window
  const fnSymbol = Symbol('fn')
  context[fnSymbol] = fn
  return function(...args: any[]) {
    return context[fnSymbol](...presetArgs, ...args)
  }
}
```

实现原理：
当函数以对象成员的方式进行调用时，会自动绑定当前对象作为`this`，此polyfill就是利用了这个特性。

