定义了挂载函数 `mountComponent(vm, el, hydrating)`

```js
import Watcher from '../observer/watcher'

export function mountComponent(vm, el, hydrating) {
  let updateComponent = () => {
    const vnode = vm._render()
    vm._update(vnode, hydrating)
  }

  new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true)

  return vm
}
```

核心是调用 `vm._render` 方法生成 `vnode`，再实例化一个渲染 `Watcher`，在其回调函数中调用 `updateComponent` 方法。

最后判断为根节点时，设置 `vm._isMounted = true`。表示实例已经挂载了，同时执行 `mounted` 钩子函数。

`vm.$vnode` 表示 Vue 实例的父虚拟 Node，它为 `null` 表示当前实例是根 Vue 的实例。