定义初始化函数 `Vue.prototype._init(options)`，该函数主要做以下内容：

1. 合并配置
2. 初始化生命周期
3. 初始化事件
4. 初始化渲染
5. 初始化 data
6. 初始化 props, computed, watch

```js
if (vm.$options.el) {
  vm.$mount(vm.$options.el)
}
```

如果有 el 属性，则挂载它。