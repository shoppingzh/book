# Babel入门

## 架构

|包|说明|
| ----- | ----- |
|@babel/core|核心包，解析源码与转换源码|
|@babel/cli|命令行工具|
|@babel/preset-env|预设|
|@babel/plugin-transform-arrow-functions等|插件|
|@babel-runtime|运行时，提供常用polyfill，本质上相当于引入了`regenerator-runtime`|

## 关键包
|包|说明|
| ----- | ----- |
|@babel/plugin-transform-runtime|复用Babel的辅助函数，减少重复代码|

## 插件

**原理解释**
首先，Babel的原理是简单的，例如这样的ES6代码：

```javascript
const hello = () => {
    console.log('Hello, babel!')
}
```
最终会被编译为：

```javascript

var hello = function() {
    console.log('Hello, babel!')
}
```
上述过程中，Babel需要将代码中的`const`声明全部转换为`var`，还需要将ES6中特有的箭头函数翻译为普通函数声明。

为了完成这件事，并使其足够的可扩展，Babel将上述的两件工作抽象成了两个插件：

`@babel/plugin-transform-block-scoping`
`@babel/plugin-transform-arrow-functions`

在Babel工作时，这两个插件会分别完成自己各自的工作，完成代码的翻译。

因此，插件是Babel的核心。

> 如果一个插件都不使用，Babel不会对源码进行任何的处理，输入的代码会原样地进行输出。

**一、下载依赖包**

```bash
npm i -D @babel/core @babel/cli
```
`@babel/core`是Babel的核心，它的作用是**解析代码**和**转换代码**。
`@babel/cli`，见名知意，它是Babel的命令行，这里使用它只是为了不用手动去写js代码来完成代码的解析和转换。

**二、添加配置文件**

在根目录下新建`babel.config.json`文件：

```json
{
  "plugins": [
    "@babel/plugin-transform-block-scoping",
    "@babel/plugin-transform-arrow-functions",
    "@babel/plugin-transform-classes"
  ]
}
```
这里我们不需要额外的配置，就配置3个插件，用来转换我们的代码即可。

> 注：以上三个插件都需要安装到开发依赖中。

**三、写点代码**

在`src`下新建`index.js`：

```javascript
const hello = () => {
  console.log('hello, babel!')
}

class Person {
  constructor(name) {
    this.name = name
  }

  sayHello() {
    hello()
  }
}
```
以上代码我们使用了ES6的三个特性：局部作用域、箭头函数和类。

**四、调用命令，转换代码**

在控制台中输入命令：

```bash
npx babel src --out-dir dist
```
命令的含义非常简单，将src目录下的文件转换后放置在dist目录下。



**五、查看生成结果**

```javascript
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var hello = function () {
  console.log('hello, babel!');
};

var Person = /*#__PURE__*/function () {
  function Person(name) {
    _classCallCheck(this, Person);

    this.name = name;
  }

  _createClass(Person, [{
    key: "sayHello",
    value: function sayHello() {
      hello();
    }
  }]);

  return Person;
}();
```
可以看到，Babel已经将所有ES6的代码转换为ES5的代码了。



**六、撤掉一个插件试试？**


在配置文件中，我们去除`@babel/plugin-transform-classes`，只保留局部作用于和箭头函数的转换插件，看看生成的会是什么效果呢？

```javascript
var hello = function () {
  console.log('hello, babel!');
};

class Person {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    hello();
  }

}
```
果然，撤掉ES6类的支持后，Babel没有为我们提供任何的代码转换，而是将代码原样地输出了出来。

## 预设 preset

**原理解释**
预设（preset）的概念非常简单，因为一个一个去配置插件太麻烦了（光ES6的语法转换就有十几个插件），所以提出了预设的概念。



将插件组合起来，形成一个预设，只要使用这个预设，就认为使用了N个插件。

简单来说，预设给了开发者**开箱即用**的可能性。

**一、安装依赖包**

```bash
npm i -D @babel/core @babel/cli @babel/preset-env
```

**二、简单配置，开箱即用**


babel.config.json

```json
{
    "preset": [
        "@babel/preset-env"
    ]
}
```