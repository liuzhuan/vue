该函数主要用来监测环境状况。定义了如下环境变量：

- inBrowser
- inWeex
- weexPlatform
- UA
- isIE
- isIE9
- isEdge
- isAndroid
- isIOS
- isChrome
- supportsPassive 判断当前环境是否支持 passive 事件监听器
- isServerRendering()
- devtools
- isNative(Ctor) 是否浏览器内置函数
- hasSymbol 是否支持 Symbol
- `_Set` 简单集合类，只支持 `has`, `add`, `clear`


2017年4月5日，Kingwl 提交了 `v-on passive 修饰符` [#5132](https://github.com/vuejs/vue/pull/5132)。从[这里](https://zhuanlan.zhihu.com/p/24385322)可以知道，`passive` 事件监听器可以提高页面的滑动流畅度。