# 原理解释
预设（preset）的概念非常简单，因为一个一个去配置插件太麻烦了（光ES6的语法转换就有十几个插件），所以提出了预设的概念。



将插件组合起来，形成一个预设，只要使用这个预设，就认为使用了N个插件。

简单来说，预设给了开发者**开箱即用**的可能性。

# 一、安装依赖包
```bash
npm i -D @babel/core @babel/cli @babel/preset-env
```
# 二、简单配置，开箱即用
babel.config.json

```json
{
    "preset": [
        "@babel/preset-env"
    ]
}
```