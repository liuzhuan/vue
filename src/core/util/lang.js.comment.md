输出的函数：

- isReserved(str) 判断一个属性是否以 `$` 或 `_` 开头
- def(obj, key, val, enumerable) 定义新属性，可写可配置
- parsePath(path) 生成一个 getter 函数，获取某个路径的属性值

```js
const bailRE = /^\w.$/
function parsePath(path) {
  if (bailRE.test(path)) return
  const segments = path.split('.')
  return function(obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}
```