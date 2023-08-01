# Rollup入门

## 前言

在开始学习之前，我想有必要将Rollup做一个简单的介绍。众所周知，Rollup是一个打包工具，对标Gulp、Grunt、Webpack等。在这里，我们并不会对各大打包工具进行对比，而是探讨一个更为基础的问题：

**我们为什么需要打包？**

想象这么一个场景，你有一个自己颇为满意的函数：

```js
function plus(a, b) {
  return a + b
}
```

为了能在不同的项目中都使用这个函数，也为了开源给他人使用，你把这个函数抽取到了 `util.js` 文件下，并将其发布到外部平台中。

这样，使用者就可以非常方便进行引用了：

```html
<html>
  <body>
    <script src="util.js"></script>
    <script>
      plus(1, 1)
    </script>
  </body>
</html>
```

果然，反响很好！你的工具得到了很多使用者的良好反馈，大家都纷纷给你提需求要求新增更多好用的函数。于是你夜以继日奋笔疾书，一个一个好用的工具竞相诞生，但是与之而来的问题也产生了：

**这个 `util.js` 文件太大了，已经变得不利于维护了，亟需一个拆分子模块的方案。**

于是，你发现了 `IIFE` 、 `AMD` 、 `CMD` 等模块化的方案，接着，你把 `util.js` 下的函数分类整理到不同的模块下。尽管使用者并不能感受到模块化带来的好处，但是你心里很清楚可维护性提升对你和这个工具的意义有多重要。

```js
// IIFE实现
(function(window) {
  function plus(a, b) {
    return a + b
  }

  const Util = {
    plus,
  }

  window.Util = Util
})(window)
```

日子一天天过去，你很勤勉地维护着这个工具。但是，越来越多的使用者发来邮件，向你抛出了无数的问题：

- 一些函数在低版本的浏览器上运行时无法得到预期的输出，甚至会报错，工具应该兼容不同的浏览器版本
- 如何在Node环境使用？工具应该支持多种模块引入方式
- 工具包的代码未经混淆与压缩，没有达到最佳大小
- ...

越来越多的库开发者碰到了与你类似的问题，这些共性问题占用了很多开发者不必要的时间，于是渐渐地，打包工具诞生了。




## 快速入手

<Todo />

## 官方插件

| 插件 | 使用场景 | 常用 | 备注 |
| -- | -- | :--: | -- |
| @rollup/plugin-alias | 使用类似 `@/assets/logo.png` 的别名语法 | ✅ | - |
| @rollup/plugin-commonjs | 兼容commonjs模块 | ✅ | - |
| @rollup/plugin-node-resolve | 使用node模块查找算法 | ✅ | - |
| @rollup/plugin-replace | 构建时替换字符串 | ✅ | - |
| @rollup/plugin-strip | 瘦身，去掉如 `console.log` 等无用代码 | ✅ | - |
| @rollup/plugin-typescript | TypeScript支持 | ✅ | - |
| @rollup/plugin-url | 以URL的方式引入文件（如引入图片） | ✅ | - |
| @rollup/plugin-terser | 压缩 | ✅ | - |
| @rollup/plugin-viturl | 虚拟模块引入 | ✅ | - |
| @rollup/plugin-beep | 构建报错提示音 |  | - |
| @rollup/plugin-json | 引用json模块 |  | - |
| @rollup/plugin-data-uri | 引入Base64模块 | | - |
| @rollup/plugin-image | 以Base64字符串引入图片 | | - |
| @rollup/plugin-run | 构建完成自动运行 | | - |
| @rollup/plugin-auto-install | 构建时自动安装依赖包 | | 鸡肋功能 |

### @rollup/plugin-alias

在项目中，我们往往会将模块拆分得比较细，以使项目逐渐庞大时不至于丢失其可维护性。但当项目中目录层级过深时，引用模块就变得麻烦，可能需要很多层的相对路径才能引用到较为上层的模块：

```js
import { sayHello } from '../../../util'
```

`@rollup/plugin-alias` 插件支持我们使用别名的方式表示路径，以避免过深的相对路径引用：

```js
import { sayHello } from '@/util'
```

配置插件时，将 `@` 别名配置为项目的根目录：

```js
export default {
  plugins: [
    alias({
      '@': path.resolve(__dirname, 'src')
    })
  ],
  // ...
}
```

特别要注意的是，当使用别名后，就无法获得代码提示了，因为IDE并不知道 `@` 的含义是什么，此时需要配置 `jsconfig.json` 或 `tsconfig.json` （如果使用js则配置 `tsconfig.json`，使用TypeScript则配置 `tsconfig.json` ）：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

```



### @rollup/plugin-commonjs

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



### @rollup/plugin-node-resolve

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

### @rollup/plugin-replace

该插件的典型应用场景是：

**有一些在构建时才有的变量需要在开发阶段提前使用，此时开发阶段将使用 `占位符` 的方式预先使用，构建时再将占位符替换为真实的环境变量。**

`process.env.NODE_ENV` 就是一个典型的案例，在一个web应用中，我们经常需要判断当前为开发环境还是运行环境，以实现在不同的环境下应用能做出不同反应的效果。开发阶段使用的 `process.env.NODE_ENV` 只是一个占位符，因为应用运行在浏览器上，浏览器并不是服务端Node环境，拿不到 `process.env.NODE_ENV` 的值，因此，我们需要在构建应用时，将 `process.env.NODE_ENV` 这串内容替换为当前构建环境的一个常量值。

举个例子，我们有这样的一段源码：

```js
if (process.env.NODE_ENV === 'production') {
  console.log('It\'s production mode')
}
```

在 `rollup.config.js` 配置中，使用 `replace` 插件进行替换:

```js
export default {
  plugins: [
    replace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': JSON.stringify('production'),
      }
    })
  ]
}
```

构建完成生成的产物是：

```js
{
  console.log('It\'s production mode');
}
```

注意，其实理论上的输出产物应该是：

```js
if ("production" === 'production') {
  console.log('It\'s production mode');
}

```

但由于Rollup强大的TreeShake能力，将代码简化到了最简模式，因此就变成了上面的样子。如果在Rollup配置中，将TreeShake功能关闭，就会得到理论上的预期输出。


### @rollup/plugin-beep

这是最简单的一个插件，其作用是：

当构建发生错误时，播放一个警报声。

> 亲测在Windows10版本的VSCode与PowerShell中都无效，但在Mac中可以。




### @rollup/plugin-json

该插件将json文件转为一个ES模块，使用方式：

::: code-group
```js [index.js]
import config from './config.json'

console.log(config.word)
```

```js [config.json]
{
  "word": "hello"
}

```
:::



