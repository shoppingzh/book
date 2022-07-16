## 对象转数值的规则：
1. 调用对象的`valueOf`方法得到原始值，如果结果是原始数据类型，则直接转换为数值
2. 如果第1步中返回的仍不是原始数据类型，则继续调用`toString`方法并转换数值
3. 如果既没有`valueOf`方法也没有`toString`方法，则抛出错误



## 其他类型转换数值的规则
|原始类型|转换规则|举例|
| ----- | ----- | ----- |
|string|Number.parseInt/Number.parseFloat|'123' -> 123|
|boolean|true为1，false为0|\-|
|undefined|NaN|\-|
|null|0|\-|
|symbol|转换报错|\-|

## `parseFloat` 规则
