# MySQL定期备份

## MySQL备份命令

将数据库 `sys` `mysql` 备份，命令如下：


```bash
mysqldump -uroot -p --databases sys mysql > bak.sql
```

## 编写脚本，方便工作

运行脚本，则将数据库备份到一个当前日期时间的sql文件下，脚本如下：

::: code-group
```bash [bak.sh]
now=`date +%Y-%m-%d-%H-%M-%S`

mysqldump -uroot -p --databases sys mysql > bak-$now.sql
```
:::

## 使用定时工具，定期运行脚本

**第一步：新建cron表达式**

::: code-group
```bash [bak.cron]
* 6 * * * root run-parts ./bak.sh
```
:::

如以上表达式设置每天6点运行 `bak.sh` 脚本。

**第二步：将表达式加入到crontab中**

```bash
crontab ./bak.cron
```

**第三步：检查是否添加成功**

```bash
crontab -l
```