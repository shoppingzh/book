
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

**1. 新建 `tailwind.preset.js`**

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

**2. 配置 `tailwind.config.js`**

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

你可能已经注意到，`presets`配置是一个数组，是的，TailwindCSS允许配置多个预设，然后从上至下进行合并，如果多个preset存在同样的配置，则后者会覆盖前者。

::: tip
`presets` 可配置多个提供了更细粒度化拆分配置的可能性，你可以将一个Tailwind配置，按照不同的模块进行拆分，使用时，根据需要组合使用。

这种拆分形式相当于在配置层面进行原子化，看来TailwindCSS无处不散发着 **原子化** 的风味，Respect！
:::

## 使用插件提高开发效率

CSS的能力相比JS要弱得多，所以，针对CSS的插件其实主要是对一些常用样式进行封装，形成所谓 **CSS组件**，比如下方的代码：

```css
.button {
  display: inline-block;
  padding: 5px 12px;
  text-align: center;
  background-color: orange;
  color: #fff;
}
```

上述代码实现了一个按钮的CSS组件，在TailwindCSS中，你可以认为它是一个名为`button`的插件。当开发人员安装此插件，就可以通过简单添加一个class的方式实现快速编码。

以下简单介绍两款比较常用的官方插件的安装及使用方法：

**安装插件**

```bash
pnpm i -D @tailwindcss/line-clamp @tailwindcss/aspect-ratio
# yarn add -D @tailwindcss/line-clamp @tailwindcss/aspect-ratio
# npm i -D @tailwindcss/line-clamp @tailwindcss/aspect-ratio
```

**注册插件**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  plugins: [ // [!code focus:4]
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
}

```

**line-clamp插件使用方法**


```vue
<template>
  <div class="line-clamp-3 text-secondary">
    <span v-for="x in 100" :key="x">我是一段文本</span>
  </div>
</template>
```

<div class="line-clamp-3 text-secondary">
  <span v-for="x in 100" :key="x">我是一段文本</span>
</div>

**aspect-ratio插件使用方法**

生成一个常用视频（16:9）的比例盒子：

```html
<div class="w-[400px] aspect-video bg-blue-300">
  <video
    src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
    class="w-full h-full"
    controls />
</div>
```


<div class="w-[400px] aspect-video bg-blue-300">
  <video
    src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
    class="w-full h-full"
    controls />
</div>



## 又爱又恨的Preflight特性

TODO
