## 输出

参数 | 说明 | 类型 | 默认值 | 可选值
-- | -- | -- | -- | --
noEmit | 无输出 | boolean | false | -
target | 输出的JavaScript文件的ES版本 | string | es6 | es2015/es2016/...
outDir | 输出目录 | string | - | -
removeComments | 是否清除注释 | boolean | false | -
sourceMap | 是否生成sourceMap文件 | boolean | false | -
declaration | 是否生成声明文件 | boolean | false | -
declarationDir | 生成声明文件的目录 | string | - | -
declarationMap | 生成声明文件的sourceMap | boolean | false | -
module | 生成的模块格式 | string | commonjs | none/commonjs/amd/system/umd/es6


## 开发与编译

参数 | 说明 | 类型 | 默认值 | 可选值
-- | -- | -- | -- | --
lib | 编译过程中需要的库列表 | string[] | -
moduleResolution | 模块解析器 | string | node | classic/node
allowJs | 是否允许编译js代码 | boolean | false | -


## 严谨性与健壮性

参数 | 说明 | 类型 | 默认值 | 可选值
-- | -- | -- | -- | --
strict | 是否开启严格模式 | boolean | false | -
noImplicitAny | 存在隐式`any`时报错 | boolean | false | -
noImplicitThis | 存在隐式`this`时报错 | boolean | false | -
strictNullChecks | 严格性的null值检查（例如不能给number类型的变量赋null值） | boolean | true | -
noUnusedLocals | 不允许声明变量但无使用 | boolean | false | -
noUnusedParameters | 不允许声明函数参数但不使用 | boolean | false | -
allowUnreachableCode | 允许无法达到的代码 | boolean | true | -
strictBindCallApply | 调用bind/call/apply方法时，必须符合函数的参数 | boolean | true | -







