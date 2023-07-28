# Rollup入门

## @rollup/plugin-commonjs

commonjs插件允许你使用 `require` 引用，而不必使用ESM的引用方式。

该插件为兼容已经存在的commonjs模块提供了极大的便利。如：

::: code-group
```js [index.js]
const { sayHello } = require('./util')

sayHello()
```
``` js [util]
exports.sayHello = function() {
  console.log('hello')
}
```
:::



## @rollup/plugin-node-resolve

该插件使用 [Node模块处理算法](https://nodejs.org/api/modules.html#modules_all_together) 来查找模块，以便方便使用 `node_module` 中的模块。

**特别注意，除了使用node模块处理算法外，该插件还会将依赖的第三方包打包到最终的产物中。**

举个例子，原来你需要这样引用模块：

```js
import { sayHello } from './util/index'
```

使用插件后，你只需要这样：

```js
import { sayHello } from './util'
```

因为Node模块处理算法会默认查找模块下 `index` 的文件。

::: details Node模块处理算法概述
TODO
:::