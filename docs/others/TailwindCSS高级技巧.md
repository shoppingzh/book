
# TailwindCSS高级使用技巧

- 使用preset提取配置
- 好用的插件
- Preflight详解



## 前言

如果你刚刚熟悉TailwindCSS，不妨先看看这篇文章：[TailwindCSS的使用，看这一篇就够了！](./TailwindCSS%E4%BD%BF%E7%94%A8%E6%8A%80%E5%B7%A7.md)。

以下内容，将会假设你已经使用过TailwindCSS一段时间了，比较熟悉其使用手感。本篇内容将会着重于讲解比较不常用的功能点，如果你是深度使用者，可能需要此篇文章。

## 提取配置

我们想到的第一个问题就是： **复用**。你总会碰到需要抽象的情况，例如需要在多个项目中共享一份配置。尽管可以通过`Ctrl C, Ctrr V`一分钟搞定，这种方案速度最快，后患却也最大（散落在各处的副本，最后都不知道该以哪个为基准）。

幸好TailwindCSS为我们提供了`preset`的特性，你只需要几个简单的步骤就可以将配置抽离出去：

**1. 新建`tailwind.preset.js`**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'orange'
      }
    },
  },
}
```

`preset`文件的配置方法与`tailwind.config.js`一样，TailwindCSS会根据自己的合并规则去合并`preset`和`tailwind.config.js`中的配置。

> 合并规则可参考：[https://tailwindcss.com/docs/presets#merging-logic-in-depth](https://tailwindcss.com/docs/presets#merging-logic-in-depth)

**2. 配置`tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  presets: [ // [!code focus:3]
    require('./tailwind.preset.js')
  ],
}
```


当然，你也可以考虑将`tailwind.preset.js`发布为一个npm库：

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  presets: [ // [!code focus:3]
    require('tailwind-preset') // 库名为tailwind-preset，配置package.json中main字段为配置文件位置作为库的默认导出
  ],
}
```

