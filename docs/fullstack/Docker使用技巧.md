# Docker使用技巧

## 制作镜像

请先看下方的 `Dockerfile` 文件：

```bash
FROM nginx

COPY dist /usr/share/nginx/html
```

`Dockerfile` 文件用于制作Docker镜像，上面的文件表示以nginx镜像为基础，新建一个新的镜像，并将 **构建上下文目录** 中的 `dist` 目录复制到nginx的根目录。

接下来，我们就可以通过 `docker build` 命令来制作一个新的镜像：

```bash
docker build -t mynginx:v1 .
```

命令最后的 `.` 表示构建上下文的位置，需要特别注意：

::: danger 注意
Docker构建镜像基于C/S架构，构建过程中会启动一个服务器，这个服务的根目录其实就是 **构建上下文目录** 。在 `Dockerfile` 中，所有的路径都是基于此目录的，因此，所有路径都是 **相对路径**。例如：

```bash
COPY /dist /usr/share/nginx/html
```

看似是将根目录下的 `dist` 目录移动到 `/usr/share/nginx/html` 目录，但其实这个 `/dist` 会基于构建上下文的目录进行合成，如果合成后的目录在构建上下文中不存在，则会报错（例如使用 `../dist` 将会超出构建上下文的目录范围，会报错）。
:::

### 指定 `Dockerfile` 文件位置

注意！`Dockerfile` 文件不是一定要与构建上下文目录在一起的，你可以很灵活的指定 `Dockerfile` 的位置：

```bash
docker build -t mynginx:v1 . -f /xxx/yyy/Dockerfile
```

## 阶段性构建

<Todo />
