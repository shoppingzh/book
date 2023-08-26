# 多页history路由问题在Vite下的的优雅解决


## 静态服务器原理

不管是在本地开发环境，还是线上运行环境，前端应用都需要在一个静态服务器下运行。

因此，在讨论这个经典话题前，还是有必要将静态服务器的一些解析规则讲清楚，才可以对问题的引发与解决理解地更为透彻。

假设服务器托管的文件夹的目录结构是：

- images
   - logo.png
   - logo.svg
- day.txt
   - 1.txt
   - 2.txt
   - 3.txt
   - 5.txt
   - exception
      - 4.txt
- index.html
- README.txt

接下来，让我们看几个案例：


- `http://localhost` -> `index.html`
   - 当访问 `http://localhost` 或 `http://localhost/` 时，服务器会寻找默认的入口文件，绝大多数服务器会以 `index.html` 为入口文件，因此这里会返回根目录下的 `index.html` 文件。
- `http://localhost/README.txt` -> `README.txt`
   - 在根目录下存在 `README.txt` 返回
- `http://localhost/README` -> 404
   - 找不到名为 `README` 的文件
- `http://localhost/images` -> 404
   - 找不到名为 `images` 的文件
- `http://localhost/images/logo.png` -> `images/logo.png`
   - 在 `images` 目录下找到了 `logo.png` 文件，返回
- `http://localhost/day.txt` -> 404
   - 尝试寻找根目录下的 `day.txt` 文件，没有找到
- `http://localhost/day.txt/1.txt` -> `/day.txt/1.txt`
   - 找到了 `day.txt` 下的 `1.txt` 文件，返回


## 问题引出

传统的单页应用只有一个 `index.html` 单页，如果该单页下有一个路由 `/home` ，那么访问的URL是：

`http://localhost/home`


为什么无需使用 `http://localhost/index.html` 也可以访问 `index.html` 文件？这其实跟服务器解析的规则有关，在这个例子中，绝大多数服务器的解析过程是：

1. 解析到 `/home` URL
2. 尝试在服务器所托管的资源目录内，寻找名为 `home` 的文件
3. 没有找到，尝试返回默认HTML页（一般为 `index.html`）
4. 找到 `index.html` 文件，返回

