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

## 整合ORM框架

ORM框架选择的是 `typeorm` ，使用一个 `egg.js` 的 `typeorm` 插件进行整合即可。

**安装依赖**

```bash
pnpm i typeorm mysql @forsigner/egg-typeorm
# yarn add typeorm mysql @forsigner/egg-typeorm
# npm i typeorm mysql @forsigner/egg-typeorm
```

**配置插件**

::: code-group
```ts [config/plugin.ts]
import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  typeorm: {
    enable: true,
    package: '@forsigner/egg-typeorm',
  },
};

export default plugin;
```

```ts [config/config.default.ts]
import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // ...

  config.typeorm = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'xpzheng',
    database: 'test',
    synchronize: true,
    logging: false,
    entities: ['app/entity/**/*.ts'],
    migrations: ['app/migration/**/*.ts'],
    subscribers: ['app/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'app/entity',
      migrationsDir: 'app/migration',
      subscribersDir: 'app/subscriber',
    },

  };

  return {
    ...config,
  };
};

```
:::

**新增一个实体**

::: code-group

```ts [app/entity/User.ts]
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
}

```

:::

**操作数据库试试**

在Controller中操作数据库插入一个实体：

::: code-group

```ts [app/controller/home.ts]
import { Controller } from 'egg';
import { User } from '../entity/User';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    const user = new User();
    user.name = 'zxp'
    await ctx.repo.User.insert(user)
    ctx.body = await ctx.repo.User.find()
  }
}

```

:::