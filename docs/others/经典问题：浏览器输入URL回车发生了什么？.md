# 经典问题：浏览器输入URL回车发生了什么？

## 一、构造一个请求
当我们在浏览器的地址栏按下回车时，浏览器会为我们构造一个**请求对象**。
一个请求对象包含了两类信息：**请求相关信息与客户端相关信息**。请求相关信息描述了**去哪里**、**要什么**、**带了什么**等，客户端相关信息描述的是**我是谁**、**我在哪**、**我能接受什么**等。比如：
```bash
// 请求信息
Request URL: https://github.com/shoppingzh/ui
Request Method: GET
// 客户端信息
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36
```

> 注：所有HTTP的客户端几乎都实现了相同的请求对象，只是某些请求头略有差异。

## 二、请求包裹往何处发？
浏览器成功构造请求后，现在要将这个请求包裹发送到目的地，问题是，目的地在哪呢？
**请求的URL描述的就是目的地。**
假设我们请求的地址是`https://www.google.com`，这个地址就代表了请求的目的地。但是浏览器并不能直接访问这个地址，因为HTTP协议基于TCP/IP协议，因此需要拿到目的地的IP才可以将请求正确发送。那么，如何通过URL拿到IP地址呢？

我们思考一个问题：你的朋友让你把一本书送给清华大学的李明同学，你会怎么做？
当然，你不会到清华大学挨个的问谁是李明，最好的办法是找学生处的负责人要一个全校学生的名单，然后从名单中直接找到李明，将李明锁定到某某学院某某系某某班。

这就是DNS。TCP/IP协议并不知道`google.com`是谁，但是浏览器会通过DNS服务器获得到其对应的IP地址，如果就近的DNS服务器没有获取到该域名对应的IP，则会到根域名服务器找，直到找到为止。

> 真正的寻找IP的过程是非常复杂的，由于要足够快，因此还涉及到浏览器本地缓存、本机缓存、DNS服务器缓存等，总之，所有的途径都试过了还找不到IP的时候，才到根域名服务器去找。

## 三、打包请求包裹，准备上路
经过一系列的步骤，我们终于知道请求的目的地是何处了，接下里要干的活，就是将请求打包，发往目的地。那么，浏览器会如何打包请求呢？

浏览器遵循的网络协议是HTTP协议，而HTTP协议又是基于TCP/IP协议，要想正确发送请求，浏览器需要将请求的内容包装成一个HTTP协议所规范的标准包。这里就涉及到**OSI模型**，OSI模型分为七层（应用层、表达层、会话层、传输层、网络层、数据链路层、物理层），其中，HTTP协议属于应用层（其他例如FTP、SSH、SMTP都属于该层），TCP/UDP协议属于传输层，而IP协议属于网络层。一个HTTP的包在最终到达物理层时，会被层层解包，最终在网络中传输的是二进制数据；在服务器获取到请求前，这些二进制数据又会被层层封包，最终成为一个HTTP协议包。

> 具体细节可详细阅读OSI模型的规范。

## 四、如果保障路上的安全？
正如现实世界的快递运输，快递公司不能保证包裹在达到收件人手里之前一定是安全的，快递公司往往会承诺运输过程绝对安全，但实际是偶尔也会出现意外。
请求在网络链路上的传输正是如此。请求的传输过程并不是绝对安全的，一旦有人在传输过程中的任意一处动了手脚，收件人就可能拿到错误的数据，也就是说，请求的传输过程一旦被拦截，拦截人是可以篡改请求的数据的。那么，如何解决该问题呢？

如果有一家快递公司承诺，他们的货物在运输的过程中是绝对安全的，那么只有一种可能：他们建造了一条私有的的运输通道。
HTTP传输过程的安全性也是这样来保证的。**TLS（传输层安全协议，其前身为SSL）**可以建立一个安全的传输通道，基于TLS协议的应用层协议可以安全地进行数据传输。HTTPS就是HTTP与SSL结合的产物。
需要注意的是，TLS不属于OSI模型，它不与HTTP等应用层协议发生任何的耦合，所有应用层协议都可以透明地使用TLS协议来保证传输的安全性。

> 关于HTTPS如何确保数据传输的安全性以及证书的认证方式，请详细学习HTTPS协议。

## 五、请求到达目的地
通过HTTP协议，请求安全地到达了目的地，即`google.com`域名所对应的IP地址所处的服务器上。接下来，服务器会如何处理该请求呢？
你可能会想，这台服务器会直接处理完请求然后返回数据给浏览器，非也。以现在大家正在使用的绝大多数互联网应用来讲，同一时刻，到达服务器的请求可能是海量的，一台服务器根本处理不完这么多请求。以网购平台为例，不仅要接纳同一时刻海量的请求，还涉及到文件读写、数据库读写等非常耗时的操作，同一台服务器是无法干完这些事情的。

一个人完成不了的事情，可以由N个人来完成。因此，请求所到达的目的地服务器只是一个**代理**，它会将请求继续转发到下面实际干活的服务器。假设一个代理服务器下有10个干活的服务器，同一时刻的请求到达后被均匀的分配到10个服务器手中，这样便实现了**负载均衡**，而代理的过程称为**反向代理**，底下干活的10台服务器称为**应用服务器**。

> 与正向代理不同的是，反向代理是客户端无感知的，请求在到达最终处理的服务器之前可能被转发了N次，但客户端并不知道也不关心这个过程，客户端只关心请求能否被正确处理并返回数据。

> 除了代理外，请求还可能经过网关、隧道。具体请自行学习。

细心的朋友可能会发现上述问题的一个漏洞：如果代理服务器处理的请求量过于大，以至于都来不及转发请求该怎么办？关于这个问题，可以看看这篇文章：[淘宝的架构演进](https://www.jianshu.com/p/f81ad699b431)

## 六、请求到达应用服务器
请求到达代理服务器后，最终会被转发到应用服务器，**应用服务器是真正处理请求的地方**。以购买一款商品为例，当用户发起一个购买请求时，应用服务器要干些什么事情呢？
应用服务器会查询商品的库存，保证最终你能买到商品；此外，还需要将你的购买记录存储下来；最后，还需要与银行系统打交道，确保你的账户余额充足并进行扣费处理。

这里，应用服务器可能会与文件服务、数据库、缓存服务、第三方服务等等打交道，总之，应用服务器绝不是单兵作战。以处理一个用户请求为例，应用服务器好比人的大脑，这个大脑负责协调各种服务，通过调用各个服务的接口获取数据，最后将最终数据返回给用户，整个过程就算结束了。

应用服务器处理完一个请求得到用户想要的数据后，同样会原路返回经过代理服务器，由代理服务器将响应返回给浏览器。因此，应用服务是不必暴露到外网的，而是由代理服务器进行内网的转发。

## 七、浏览器获得响应
与浏览器构造请求对应的是，服务器构造的是响应。因此，区分客户端、服务端除了站在获取数据、提供数据的视角来考虑，还可以站在请求、响应的构造方的视角进行考虑，构造请求的是客户端，构造响应的是服务端。

服务器将响应通过HTTP通道发送到浏览器，浏览器会分析并处理该响应。具体怎么处理取决于HTTP协议的规范，举例来说：
- 如果浏览器获得的响应的状态码是302，则会在响应头中继续寻找Location头，然后以Location头中所标明的地址发起一次重定向请求
- 如果浏览器获取到的响应头包含了`Content-Disposition=attachment`，则其会将该响应的内容保存为一个附件

大多数情况下，响应的内容往往是一个HTML文档，此时，浏览器会将该HTML渲染到页面上，一个鲜活的页面就展示在我们眼前了。

> 想要了解浏览器分析处理响应的种种情况，请详细阅读HTTP协议。

## 八、浏览器渲染页面
因为我们讨论的话题是敲下URL到出现页面的过程，因此还是简单地说一下页面的渲染过程。如果要将页面的渲染过程讲的很彻底，需要了解很多的浏览器底层原理，因此这里只是简述。
简单描述该过程为：
- 浏览器获得一个HTML文档后，会从上至下解析该文档。
- 首先，根据HTTML的标签可以得到一个DOM树，根节点是html节点。
- 当解析到样式表时，会生成CSSOM，与DOM对应的是，CSSOM描述了每个节点的样式信息。
- 接下来，浏览器会根据DOM与样式信息计算每个节点所处的位置和大小。
- 最后，浏览器调用底层绘图API，将内容绘制到屏幕上。

需要注意几个问题：
1. 样式表的解析会影响页面的渲染，因为渲染的最终结果是受到样式的影响的（比如将某个元素设置为display: none;）
2. js脚本的解析会影响页面的渲染，因为在js中可能发生DOM操作，如果进行DOM渲染，则会与异步的DOM渲染发生冲突
3. 虽然CSSOM的构建会影响页面的渲染，但并不代表DOM构建会因此阻塞，因为浏览器会根据DOM与CSSOM共同构建一个渲染树，而这个渲染树才是真正决定页面要渲染成什么样子的因素

> 浏览器的渲染过程，对于需要了解前端优化方案的前端工程师是非常重要的。想要学习相关知识可以阅读这篇文档：[浏览器渲染页面的工作原理](https://developer.mozilla.org/zh-CN/docs/Web/Performance/%E6%B5%8F%E8%A7%88%E5%99%A8%E6%B8%B2%E6%9F%93%E9%A1%B5%E9%9D%A2%E7%9A%84%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86)

## #总结
从敲下回车的一瞬间，到页面出现，这个过程经历的步骤是非常繁琐及复杂的。随着技术的进步，页面的丰富度、展示效率、用户体验都得到了巨大的提升，一个如此复杂的过程，为何能优雅地演进到今天呢？这里有两个值得我们学习的思想。
#### 分治思想
一个庞大的系统能运行地井井有条并不是因为设计者最初就考虑到了所有情况，而是这个庞大的系统的每一个部件都独立地进行发展，各个部件之间虽有沟通，但使用的是接口思维，而不是具体耦合，这样既能保证自身的独立发展，也能适应系统的变化。
以最后一个步骤 - 渲染页面为例，专注于渲染页面的工程师并不需要了解服务器反向代理的知识，他们只需要在UI渲染的领域保持足够高的造诣即可。

#### 拆分思想
当我们碰到一个复杂的问题时，不要急于解决该问题，而是先分析问题，将一个复杂问题拆分为多个比较简单的小问题，然后逐个突破。
OSI模型的建立就遵循了这种思想，OSI模型是非常复杂的，建设者并不是马上急于构建一个庞大的模型，而是将该模型拆分为7个独立的层，然后各个层逐个实现，实现完成后再组装为一个完整的OSI模型。

> 关于拆分方法，我们可以从时间维度拆分，例如在面对一个复杂的业务时，我们可以先画出流程图，然后对流程图中的每一个步骤逐个进行突破；还可以从空间的维度拆分，例如一辆汽车分为了引擎模块、控制模块，我们可以分别实现这两个模块，然后进行空间维护的组合。

#### 本文涉及知识点
- 计算机网络（OSI）
- DNS
- 网络安全（TLS）
- 云
- 应用服务器
- 数据库
- 浏览器渲染（UI）