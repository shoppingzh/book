## 基本使用

**安装**

```bash
yarn add -D eslint @types/eslint
// npm i -D eslint @types/eslint
```

**配置**

在项目根目录下新建`.eslintrc.js`文件：

```js
/** @type {import('@types/eslint').Linter.Config} */
module.exports = {
  // 根配置(避免eslint向父级目录寻找配置)
  root: true,
  // 环境
  env: {
    node: true,
    borwser: true,
    es6: true,
    // ...
  },
  // 继承配置
  extends: [
    'eslint:recommended'
  ],
  rules: {
    "semi": [2, 'never'] // 结尾无分号，否则报错
  },
}
```




**执行Lint**

```
npx eslint src
```

或在`package.json`文件中新增`scripts`：

```json
{
  "scripts": {
    "lint": "eslint src"
  }
}
```

## 在TypeScript中使用

**安装**

```bash
yarn add -D eslint @types/eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
// npm i -D eslint @types/eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

**配置**

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

**执行Lint**

```bash
npx eslint src
```

## 与Prettier配合使用

**安装**

```bash
pnpm i -D prettier eslint-config-prettier @types/prettier
# yarn add -D prettier eslint-config-prettier @types/prettier
# npm i -D prettier eslint-config-prettier @types/prettier
```

**新建prettier配置文件**

在工程根目录下新建 `.prettierrc.js` 文件，内容如下：

```js
/** @type {import('prettier').Config} */
module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
}
```

**配置eslint**

在 `.eslintrc.js` 文件中配置：

```js
module.exports = {
  extends: [
    // ...
    'prettier', // 保证prettier位于最后
  ],
  rules: {
  },
  // ...
}

```

::: tip
`eslint-config-prettier` 的原理是关掉与prettier配置相冲突的eslint配置。

更多请见：[https://github.com/prettier/eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
:::