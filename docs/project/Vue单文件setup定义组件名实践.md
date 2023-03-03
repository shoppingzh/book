# Vue单文件setup定义组件名实践

## 方法一：两个 `<script>`

```vue
<script lang="ts">
export default {
  name: 'MyComponent'
}
</script>
<script setup lang="ts">
// ...
</script>
```

## 方法二：使用 `unplugin-vue-define-options` 插件

### 安装

::: code-group
```bash [pnpm]
pnpm i -D unplugin-vue-define-options
```

```bash [yarn]
yarn add -D unplugin-vue-define-options
```

```bash [npm]
npm i -D unplugin-vue-define-options
```
:::

### 类型支持

在 `tsconfig.json` 中新增如下代码：

```json {3}
{
  "compilerOptions": {
    "types": ["unplugin-vue-define-options/macros-global" /* ... */]
  },
}

```

### 使用

```vue
<script setup lang="ts">
defineOptions({
  name: 'MyComponent'
})
</script>
```

### eslint支持

如果eslint定义了 `no-undef` 规则，使用 `defineOptions` 会提示使用了未定义的变量，此时需要在eslint配置文件中将该函数定义为全局字段：

```js {3-5}
/** @type {import('eslint').Linter.Config} */
module.exports = {
  globals: {
    'defineOptions': 'readonly'
  },

  // ...
}

```