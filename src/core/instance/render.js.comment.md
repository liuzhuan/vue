定义 `_render()` 方法，用来将实例渲染成一个虚拟 Node。

```js
import { createElement } from '../vdom/create-element'

export function initRender(vm) {
  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)
}

export function renderMixin (Vue) {
  Vue.prototype._render = function () {
    const vm = this
    const { render, _parentNode } = vm.$options
    vm.$vnode = _parentVnode
    let vnode
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement)
    } catch (e) {}
    vnode.parent = _parentVnode
    return vnode
  }
}
```

对于手写 `render()` 函数的样式：

```js
render: function(h) {
  return h('div', {
    attrs: {
      id: 'app'
    }
  }, this.message)
}

// => <div id="app">{{ message }}</div>
```