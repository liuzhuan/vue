`constants.js` 定义了 `SSR_ATTR`, `ASSET_TYPES` 和 `LIFECYCLE_HOOKS` 三个常量。

`util.js` 定义了诸多谓词判断函数：

- isUndef()
- isDef()
- isTrue()
- isFalse()
- isPrimitive()
- isObject()
- isPlainObject()
- isRegExp()
- isValidArrayIndex()
- isBuiltInTag() 是否 `slot` 或 `component`
- isReservedAttribute() 是否 `key`, `ref`, `slot`, `slot-scope`, `is` 之一

还有一些工具函数

- toRawType() 输出原始类型字符串
- toString()
- toNumber()
- makeMap() 生成一个map，返回存取函数。该函数用途极大
- remove(arr, item)
- hasOwn(obj, key)
- cached(fn) 返回一个带缓存的函数
- camelize(str) 将 `-` 分隔的字符串，转换为驼峰格式
- capitalize(str)
- hyphenate(str) 将驼峰格式转换为 `-` 分隔类型
- bind(fn, ctx) 绑定函数的 this 到 ctx
- toArray(list, start)
- extend(to, _from) 拓展 to 对象
- toObject(arr) 将一系列数组对象，转换为一个 object 对象
- noop() 空函数
- no() 总是返回 `false`
- identity() 总是返回输入参数
- genStaticKeys(modules) 生成所有模块的静态键值
- looseEqual(a, b) 比较两个对象是否大致相同，即具有相同的数值
- looseIndexOf(arr, val) 查找具有相同数值的元素索引值
- once(fn) 保证 fn 函数只执行一次，使用闭包实现

另外，还定义了 `emptyObject`，一个冻结的空 Object 对象。

## 源码赏析

```js
function makeMap(str, expectsLowerCase) {
  const map = Object.create(null)
  const list = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }

  return expectsLowerCase
    ? val => map[val.toLowerCase()]
    : val => map[val]
}

function cached(fn) {
  const cache = Object.create(null)
  return (function cachedFn (str) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  })
}

const camelizeRE = /-(\w)/g
const camelize = cached(str => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})

const hyphenateRE = /\B([A-Z])/g
const hyphenate = cached(str => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
})

function toArray(list, start) {
  start = start || 0
  let i = list.length - start
  const ret = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}

function looseEqual(a, b) {
  if (a === b) return true
  const isObjectA = isObject(a)
  const isObjectB = isObject(b)
  if (isObjectA && isObjectB) {
    try {
      const isArrayA = Array.isArray(a)
      const isArrayB = Array.isArray(b)
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every((e, i) => {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        const keysA = Object.keys(a)
        const keysB = Object.keys(b)
        return keysA.length === keysB.length && keysA.every(key => {
          return looseEqual(a[key], b[key])
        })
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

function once(fn) {
  let called = false
  return function() {
    if (!called) {
      called = true
      fn.apply(this, arguments)
    }
  }
}
```