# Docker基础

## 知识体系

![](./images/docker-mind.png)

## 常用命令

### 镜像

**列出所有镜像**

```bash
docker image ls
```

**删除镜像**

```bash
docker image rm nginx:latest
```

**制作镜像**

```bash
docker build -t myimage:1.0 . -f /xxx/yyy/Dockerfile
```

### 容器

**运行容器**


```bash
docker run -d -p 80:80 --mount source=nginx,target=/usr/share/nginx/html nginx:latest
```

- `-d` 后台运行
- `-p` 暴露端口
- `--mount` 挂载卷

**停止运行容器**

```bash
docker stop 5f79d10d97
```

`5f79d10d97` 表示容器运行的唯一标识。


**列出正在运行的镜像**

```bash
docker container ls
```

![](./images/docker-container-ls.png)

**删除容器**

```bash
docker container rm 5f79d10d97
```

### 卷

**创建卷**

```bash
docker volume create nginx
```

**列出所有卷**

```bash
docker volume ls
```

![](./images/docker-volume-ls.png)


**运行时绑定卷**

方法1：指定卷名（需要先创建卷，如果没创建，docker会自动创建）

```bash
docker run -d -p 80:80 --mount source=my-volume,target=/usr/share/nginx/html nginx:latest
```

方法2：自行指定目录（更灵活）

```bash
docker run -d -p 80:80 --mount type=bind,src=d:/nginx,target=/usr/share/nginx/html nginx:latest
```

**删除指定卷**

```bash
docker volumn rm nginx
```

### 网络

<Todo />
