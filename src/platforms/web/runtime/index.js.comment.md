定义了原型链函数 `Vue.prototype.$mount`

```js
import { mountComponent } from 'core/instance/lifecycle'

Vue.prototype.$mount = function(el, hydrating) {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}
```