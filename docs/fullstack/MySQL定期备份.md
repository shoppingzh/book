# MySQL定期备份

## MySQL备份命令

将数据库 `sys` `mysql` 备份，命令如下：


```bash
mysqldump -uroot -p --databases sys mysql > bak.sql
```

## 编写脚本，方便工作

运行脚本，则将数据库备份到一个当前日期时间的sql文件下，脚本如下：

```bash
now=`date +%Y-%m-%d-%H-%M-%S`

mysqldump -uroot -p --databases sys mysql > bak-$now.sql
```

## 使用定时工具，定期运行脚本

<Todo />
