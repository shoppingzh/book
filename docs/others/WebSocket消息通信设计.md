# WebSocket消息通信设计


## 一、实现效果分析
- 整个应用的生命周期内，连接只发生一次
- 同一个订阅全局只发生一次（否则会发生多次事件回调，也会使得同一个频道产生多个消费者）
- 可在任意地方进行频道订阅，不局限于全局统一订阅（例如进入指定路由后才订阅频道）
- 多处同时订阅同一个频道时，实际的订阅只会发生一次，保证单一性
- 多处同时订阅同一个频道时，需要保证各处都接收到消息回调，并且可随时删除该回调

## 二、具体实现方法
基于要实现的效果，设计了以下两个类：
1. **Client**
用于管理与服务端的连接，以后的所有频道订阅、消息发送都在该连接下发生，可建立连接、创建频道

2. **Channel** 
频道，或称管道，管理了当前客户端与服务器之间的一个通信管道，可随时添加、删除消息处理器，当管道收到消息后会通知所有消息处理器；也可向管道发送消息，该消息将发送至服务端。

最终实现如下：
message.js
```js
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import _ from 'lodash'

const DEFAULT_BEAT_FREQUENCY = 60000 // 默认心跳节奏

class Client {
  constructor(url, heartbeat = {
    outgoing: DEFAULT_BEAT_FREQUENCY,
    incoming: DEFAULT_BEAT_FREQUENCY
  }) {
    this.url = url
    this.channels = []
    this.sock = new SockJS(url)
    this.stomp = Stomp.over(this.sock)
    this.stomp.heartbeat = heartbeat
    this.connect()
  }

  connect() {
    return new Promise((resolve, reject) => {
      if (this.stomp.connected) {
        return resolve(this.stomp)
      }
      this.stomp.connect({}, function() {
        resolve(this.stomp)
      }, function(err) {
        reject(err)
      })
    })
  }

  /**
   * 打开一个频道，如果已经有打开的频道，则复用该频道
   * @param {String} url 频道URL
   * @param {Object} headers 头信息
   */
  openChannel(url, headers) {
    let channel = this.channels.find(o => o.url === url)
    if (!channel) {
      channel = new Channel(this, url, headers)
      this.channels.push(channel)
    }
    return channel
  }
}

class Channel {
  constructor(client, url, headers) {
    this.client = client
    this.url = url
    this.headers = headers
    this.handlers = []

    this.client.connect().then((stomp) => {
      const _this = this
      this.entity = stomp.subscribe(url, function(frame) {
        _this.handlers.forEach((handler) => {
          handler.call(_this, frame)
        })
      }, headers)
    })
  }

  /**
   * 添加一个消息处理器，当频道接收到消息时，会通知该处理器
   * @param {Function} handler 消息处理器
   */
  addMessageHandler(handler) {
    if (handler && typeof handler === 'function') {
      this.handlers.push(handler)
    }
  }

  /**
   * 移除指定的消息处理器
   * @param {Function} handler 消息处理器
   */
  removeMessageHandler(handler) {
    const index = this.handlers.findIndex(o => handler === o)
    if (index >= 0) {
      this.handlers.splice(index, 1)
    }
  }

  /**
   * 往频道发送消息
   * @param {Any} content 消息内容
   * @param {Object}} headers 头信息
   */
  sendMessage(content, headers) {
    this.client.stomp.send(this.url, headers, content)
  }

  /**
   * 销毁频道
   */
  destroy() {
    while (this.handlers.shift());
    this.entity.unsubscribe()
    _.remove(this.client.channels, o => o.url === this.url)
  }
}

export default new Client(process.env.VUE_APP_BASE_API + '/endpoint')

```
