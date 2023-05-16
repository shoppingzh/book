
# TailwindCSS高级使用技巧



- 使用@layer指令



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

**preflight** 是TailwindCSS内置的一套全局样式，其作用类似于 [normalize.css](https://github.com/necolas/normalize.css) / [modern-normalize](https://github.com/sindresorhus/modern-normalize) （TailwindCSS建立在modern-normalize之上）。

preflight主要修改的全局样式情况：

- 为所有元素设置box-sizing为 `border-box`
- 为所有元素设置了一个宽度为0，风格为 `solid` 的边框（这里有坑，后面会提到）
- 去掉body/h1/h2/h3/h4/h5/h6/p等标签的 `margin`
- 设置h1/h2/h3/h4/h5/h6的字体大小为网页默认字体
- 去掉a标签的颜色和下划线
- 去掉按钮的背景色
- 去掉ol/ul的列表风格
- 设置textarea只能纵向伸缩
- 重设input/textarea的placholder颜色
- **img/video/audio/svg/canvas/iframe等标签被设置为块级盒子**
- 设置图片、视频的最大宽度为100%，以防溢出父级视区内

#### 禁用此特性

preflight默认是跟随 `@tailwind base` 被注入到你的应用中的，如果不想使用这个特性，可以在配置中新增一行：

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false
  },
  // ...
}
```

::: tip 个人看法
我个人不喜欢使用这个特性，一般会关掉，理由有三：
1. 一般我会在项目中引用 `normalize.css` 或 `modern-normalize` 库，如果使用preflight，其实有部分工作是重复的；
2. preflight主要是对html的一些原生标签进行样式重置，而像h1/h2/h3/h4/h5/h6/ol/ul/p等标签，我喜欢使用div标签代替，虽然会降低语义化，但是效率提升了；
3. 我不喜欢img标签被设置为块级盒子这个特性，因为这很反直觉，给开发人员带来了额外的学习成本。
:::

#### 边框默认样式的坑

如果你禁用了这个特性，在设置边框时需要注意一下写法的不同。TailwindCSS官方推荐的边框写法：

```html
<div class="border-t border-gray-200" />
```

结合preflight的全局样式：

```css
* {
  border-width: 0;
  border-style: solid;
}
```

最终，合成的样式将会是：

```css
div {
  border-width: 0;
  border-top-width: 1px;
  border-style: solid;
  border-color: #e5e7eb;
}
```

但是，如果禁用掉preflight，则最终合成的样式将会是：

```css
div {
  border-top: 1px;
  border-color: #e5e7eb;
}
```

此时，边框将会不存在，因为没有设置边框的风格。

因此，**你需要为每个设置边框的场景都设置边框样式**：

```html
<div class="border-t border-solid border-gray-200" />
```

这种写法的问题就更大了，除了上边框是灰色外，其他边也会出现边框，因为html中所有元素的默认边框宽度为1px。为了去掉其他边的边框，你还需要手动处理：

```html
<div class="border-t border-solid border-gray-200 border-l-0 border-r-0 border-b-0" />
```

这？？？也太痛苦了，所以，个人推荐手动加入一些全局样式：

```css
*, *:before, *:after {
  border-width: 0;
  border-style: solid;
}
```

这样，就跟开启了preflight特性的效果保持一致了。

::: tip
反向操作，你可以在启用preflight的前提下，将img等标签设置为行内盒子。
:::

