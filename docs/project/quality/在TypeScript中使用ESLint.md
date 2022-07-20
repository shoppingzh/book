## 安装

```bash
yarn add -D eslint @types/eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
// npm i -D eslint @types/eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

## 配置

在项目根目录下新建`.eslintrc.js`文件：

```js
/** @type {import('@types/eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    node: true,
    borwser: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    "semi": [2, 'never']
  },
}
```

## 执行Lint

```bash
npx eslint src
```

