# ESLint入门


## 概念扫盲

**Rules**

校验规则，其作用是校验JavaScript语法，如：

```js
{
  rules: {
    semi: [1, 'always']
  }
}
```

以上规则表示代码必须以分号结尾，如果没有以分号结尾，将发出警告。

**Processors**

处理器，其作用是将其他类型的文件转为JavaScript代码，然后执行JavaScript的代码校验。

例如 `eslint-plugin-markdown` 这个库，支持在Markdown文档中，使用eslint校验代码块中的代码。


**Parsers**

解析器，其作用是将任意类型的代码解析为抽象语法树（AST），例如 `@typescript-eslint/parser` 将TypeScript代码转换为JavaScript AST。

<!-- ::: danger 处理器与解析器的差别
处理器是将
::: -->



**Plugins**

插件，一般用来整合各个设施，可以包含：

- Rules 规则
- Configurations 配置
- Processors 处理器
- Environments 环境



## 基本使用

**安装**

```bash
pnpm i -D eslint @types/eslint
# yarn add -D eslint @types/eslint
# npm i -D eslint @types/eslint
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
pnpm i -D eslint @types/eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
# yarn add -D eslint @types/eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
# npm i -D eslint @types/eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
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