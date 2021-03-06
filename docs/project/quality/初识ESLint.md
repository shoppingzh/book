## 安装

```bash
yarn add -D eslint @types/eslint
// npm i -D eslint @types/eslint
```

## 配置

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

## 执行Lint

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

