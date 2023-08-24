# JSX支持

## Vue3支持JSX

**第一步：安装JSX支持插件**

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

**第二步：如果使用了ESLint，开启ESLint对JSX的支持**

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

**第三步：使用**

