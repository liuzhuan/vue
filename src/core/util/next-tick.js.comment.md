输出两个函数：

- `withMacroTask(fn)`
- `nextTick(cb, ctx)` 重点函数

还有以下辅助函数：

- `flushCallbacks()` 清空回调函数队列

在 vue 2.4- 中，仅使用了 microtask。在某些场景，microtask 优先级过高，会在一些事件中间抛出，而这些事件应当是持续触发的。甚至会在同一事件的不同冒泡阶段触发。如果全部改为 macrotask 也会导致问题，会导致渲染问题过晚。

Vue.js 默认使用 microtask，同时也提供了强制使用 macrotask 的方法（比如，通过 `v-on` 添加的事件处理函数）。

`macroTimerFunc` 优先使用 `setImmediate()`，然后是 `MessageChannel`，然后是 `setTimeout`。