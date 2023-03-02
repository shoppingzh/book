# git工作流 - 高级篇


## commlint规则自定义

如果需要类型提示，可先安装：

::: code-group
```bash [pnpm]
pnpm i -D @commitlint/types
```

``` bash [yarn]
yarn add -D @commitlint/types
```

``` bash [npm]
npm i -D @commitlint/types
```
:::

然后在配置文件前新增类型信息：

::: code-group
``` js [commitlint.config.js] {1}
/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional']
}

```
:::

如果想要增加一条新规则，可在配置文件中新增 `rules` 字段：

```js {4-8}
/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'style', 'refactor', 'build', 'docs']],
    'scope-enum': [2, 'always', ['base', 'admin']],
    'scope-empty': [2, 'never'],
  },
}

```

> 所有规则可参见：[https://commitlint.js.org/#/reference-rules](https://commitlint.js.org/#/reference-rules)


## monorepo最佳实践

<Todo />