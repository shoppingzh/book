## web框架

web框架选用的是 `egg.js` ，使用TypeScript进行开发。

**创建项目**

```bash
mkdir demo
npm init egg --type=ts
```

**安装项目**

如果使用pnpm，需要在 `.npmrc` 文件中设置pnpm依赖包全部提升到同级目录（即与npm/yarn相同）。配置如下：

::: code-group 
```bash [.npmrc]
shamefully-hoist=true
```
:::

然后再运行：

```bash
pnpm i
```

**运行项目**

```bash
pnpm dev
# yarn dev
# npm run dev
```