`config.js` 定义了一个 `Config` 类型：

```js
export type Config = {};
```

输出的值包括：

- optionMergeStrategies: Object.create(null)
- silent: false
- productionTip 
- devtools
- performance 是否记录 perf
- errorHandler
- warnHandler
- ignoredElements: []
- keyCodes: Object.create(null) 自定义 v-on 用户键
- isReservedTag: no
- isReservedAttr: no
- isUnknownElement: no
- getTagNamespace: noop
- parsePlatformTagName: identity
- mustUseProp: no
- async: true
- `_lifecycleHooks`: LIFECYCLE_HOOKS 与旧代码保持兼容

`index.js` 在 Vue 上执行 `initGlobalAPI(Vue)`，然后定义了三个属性。