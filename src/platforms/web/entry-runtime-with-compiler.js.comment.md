主要是定义了 `Vue.prototype.$mount`，在网络环境下的挂载函数。

首先缓存原型链的 `$mount` 方法。如果没有 `render()` 方法，就把 `el` 或 `template` 转换为 `render()` 方法。

最终所有的 `el`, `template` 都将转换为 `render()` 函数。

原来原型链定义在 `src/platforms/web/runtime/index.js` 中。