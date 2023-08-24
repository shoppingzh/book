# JSX支持

## Vue3支持JSX

**1. 安装JSX支持插件**

```bash
pnpm i -D @vitejs/plugin-vue-jsx # pnpm
yarn add -D @vitejs/plugin-vue-jsx # yarn
npm i -D @vitejs/plugin-vue-jsx #npm
```

在 `vite.config.ts` 中，使用插件：

```ts
import jsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  // ...

  plugins: [
    vue(),
    jsx(),
    // ...
  ],
})

```

**2. 如果使用了ESLint，开启ESLint对JSX的支持**

```js
/** @type {import('eslint').Linter.Config} */
module.exports = {
  // ...

  parserOptions: {
    // ...
    ecmaFeatures: {
      jsx: true,
    }
  },

}

```

**3. 

**使用**

有两种使用办法，官方推荐的办法是使用 `defineComponent` API：

```vue
<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return () => (
      <div>hello</div>
    )
  },
})
</script>
```

使用这种方法，就无法使用到 `script setup` 特性，对于早已习惯使用 `script setup` 的人来说简直是如鲠在喉。

因此，可以使用第二种方法，借助函数式组件的思路：

```vue
<template>
  <Render />
</template>

<script setup lang="tsx">

function Render() {
  return (
    <div>hello</div>
  )
}
</script>
```

此方法将 `script setup` 特性与JSX进行融合，使用起来比较方便，维持了原有的开发习惯。

但是，这种方法所渲染的组件层级其实变深了，第一种方法的根节点就是当前组件，而第二种方法的根节点是Render组件，然后Render组件下嵌套了当前组件。

