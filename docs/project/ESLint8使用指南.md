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

### `ignores` 的设置原则

如果一个配置对象中，只设置了 `ignores` 一个字段，这个匹配规则会成为全局匹配规则：

```js
export default [
  {
    ignores: [
      '.config/*'
    ]
  }
]
```

该配置表示所有 `.config` 目录下的文件都不会被匹配。

::: tip
另外，官方文档中还指出，只有全局 `ignores` 才能设置匹配文件夹，但是我在非全局配置中设置了匹配文件夹，也匹配成功了。
:::

