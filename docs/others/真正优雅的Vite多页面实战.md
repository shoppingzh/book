# 真正优雅的Vite多页面实战

## Vite如何支持多页？
[https://cn.vitejs.dev/guide/build.html#multi-page-app](https://cn.vitejs.dev/guide/build.html#multi-page-app)

官方文档对于多页模式的描述中说到，如果想要新建一个单页，只需要在 **项目根目录（注意：不是src目录！）** 新建：

- nested
   - index.html
   - main.js
- package.json
- vite.config.js

然后通过访问：`http://localhost:5173/nested/`即可。



这里要说明两个问题：

**为什么在根目录新建目录，而不是src目录？**

因为vite启动时，会以根目录启动一个开发服务器，可以简单理解为开发服务器托管了整个项目的文件（但其实内部做了一些其他处理如处理public目录等）。

因此，在项目目录下的文件，都可以通过链接访问到，你可以访问`http://localhost:5173/package.json` 试试。

所以，你可以在任意目录放置自己的单页，但是开发时的访问地址也必须受限于单页的目录结构，如果你的单页入口文件放在`src/hello/index.html` ，也就只能通过`http://localhost:5173/src/hello/` 来进行访问。



**为什么使用`/nested/` 访问而不是`/nested` ？**

访问`/nested/` 相当于访问`nested`目录下的入口文件（一般静态服务器都会将`index.html` 作为入口文件）。



## 官方例子不符合实际开发场景
vite官方给出的项目模板是这样的：

* src
   * main.js
   * App.vue
* index.html
* package.json
* vite.config.js

按照官方例子，如果要新增一个单页，需要这样组织目录结构：

* src
   * main.js
   * App.vue
* nested
   * index.html
* index.html
* package.json
* vite.config.js

新的单页居然与`src` 目录是平行的！这显然不符合正常的项目结构，一般而言，开发相关的源代码都会放在`src`目录下。因此，这个方案不适用，废弃。



那么，试试看第二种方案：

* index
   * index.html
   * main.js
   * App.vue
* nested
   * index.html
   * main.js
   * App.vue
* package.json
* vite.config.js

这种方案的好处是，单页互为平行关系，而且可以通过访问`/index/`与`/nested/`访问到对应的单页。

但是，其缺点就是：**如何管理公共资源？** 例如，`index` 单页与`nested`单页都使用到同一款公共组件，应该放在哪里管理呢？

显然，这种项目结构缺陷明显，因此，这个方案也不适用，废弃。



## 项目结构最佳实践

按照以往的开发经验，这样组织项目结构可以让开发的可扩展达到最好：

* src
   * components
   * pages
      * index
         * index.html
         * main.js
         * App.vue
      * nested
         * index.html
         * main.js
         * App.vue
* package.json
* vite.config.js

这种项目结构，可以在`src`目录下管理多个单页需要使用到的公共资源，引用非常方便，并且扩展新的单页也非常方便。

但是！这种结构下，访问对应的单页需要使用`http://localhost:5173/src/pages/index/` 来访问，这种开发体验虽说不好，但尚且能忍受。最致命的问题是，当我们在`vite.config.js`中配置多页打包时：

```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'src/pages/index/index.html'),
        nested: path.resolve(__dirname, 'src/pages/nested/index.html'),
      }
    }
  }
})
```
打出来的包是这样的：

* dist
   * src
      * pages
         * index
            * index.html
         * nested
            * index.html
   * assets

也就是说，线上用于也必须通过`http://localhost/src/pages/index/` 来访问！这显然不符合预期，我们预期的输出应该是：

* dist
   * assets
   * index.html
   * nested.html



为了解决这个问题，网上的一篇热门文章，采用了一种更改打包后的文件路径的方法来解决此问题，此方案的基本思路是：

1. 将`src/pages`下所有子目录下的`index.html`文件复制到根目录，并且改名为其父目录的名称，如`src/pages/nested/index.html`复制到跟目录，改名为`nested.html` 
2. 将`nested.html` 下的样式、js等引用改为正确的引用路径。



这个方案看似解决了打包后的路径问题，但是给开发人员带来了额外的认知成本，虽勉强解决了问题，但思路不够优雅。（居然是google搜索“vite 多页面”的第一篇文章，有点误人子弟了。）



## 优雅的解决方案
首先，我们的项目结构必须以此为准：

* src
   * pages
      * index
      * nested
* package.json
* vite.config.js

其次，打包出来的结构必须以此为准：

* dist
   * assets
   * index.html
   * nested.html



为了实现第二点，必须要求项目根目录下至少有这两个文件：

* src
* index.html
* nested.html
* package.json
* vite.config.js

然后，在`src/pages/index`目录下，不放置`index.html`，只放`main.js`、`App.vue`等，让`src/index.html` 反向引用`src/pages/index/main.js`即可：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + Vue + TS</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/pages/index/main.js"></script>
  </body>
</html>

```


至此，vite多页面架构的问题已完美解决！



## 总结
* 官方文档虽然权威，但不一定适合所有场景
* 在框架内解决问题，勉强的方案虽能解决问题，但后患无穷
