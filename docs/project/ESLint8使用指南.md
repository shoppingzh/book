# ESLint8使用指南

[更新内容](https://eslint.org/blog/2021/06/whats-coming-in-eslint-8.0.0)

## 关于Flat Config

来源：[https://eslint.org/docs/latest/use/configure/configuration-files-new](https://eslint.org/docs/latest/use/configure/configuration-files-new)

如果不设置 `files` ，配置对象将应用于所有匹配到的文件，如：

```js
export default [
  {
    rules: {
      semi: [2]
    }
  }
]
```

默认情况下，ESLint将匹配这些文件：

```bash
**/*.js
**/*.cjs
**/*.mjs
```

