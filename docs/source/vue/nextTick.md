**实现原理**

当浏览器支持`MutationObserver`API时：

1. 创建一个文本节点，然后观察这个文本节点，当观察回调时，调用`nextTick`的回调函数。
2. 每调用一次`nextTick`，改变一次文本节点的内容，触发回调。

否则：

直接使用`setTimeout`API。

