## Explanation of Build Files

|                               | UMD                 | CommonJS              | ES Module           |
| ----------------------------- | ------------------- | --------------------- | ------------------- |
| **Full**                      | vue.js              | vue.common.js         | vue.esm.js          |
| **Runtime-only**              | vue.runtime.js      | vue.runtime.common.js | vue.runtime.esm.js  |
| **Full (production)**         | vue.min.js          |                       |                     |
| **Runtime-only (production)** | vue.runtime.min.js  |                       |                     |

生产环境下只有 UMD 版本，并且名称中均有 `min` 表示压缩版。生产环境下分为完整版（包括编译器和运行时）和运行时两个版本。

开发环境下分为 UMD、CommonJS 和 ES Module 三个版本，并且每个版本分为完整版和运行时两个小版本。

### Terms

- **Full**: builds that contains both the compiler and the runtime.

- **Compiler**: code that is responsible for compiling template strings into JavaScript render functions.

- **Runtime**: code that is responsible for creating Vue instances, rendering and patching virtual DOM, etc. Basically everything minus the compiler.

- **[UMD](https://github.com/umdjs/umd)**: UMD builds can be used directly in the browser via a `<script>` tag. The default file from Unpkg CDN at [https://unpkg.com/vue](https://unpkg.com/vue) is the Runtime + Compiler UMD build (`vue.js`).

> UMD 版可以直接在浏览器中执行

- **[CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1)**: CommonJS builds are intended for use with older bundlers like [browserify](http://browserify.org/) or [webpack 1](https://webpack.github.io). The default file for these bundlers (`pkg.main`) is the Runtime only CommonJS build (`vue.runtime.common.js`).

> CommonJS 主要用作旧版打包器使用，比如 browserify 或 webpack 1 等。默认输出文件位于字段 `pkg.main` 中。

- **[ES Module](http://exploringjs.com/es6/ch_modules.html)**: ES module builds are intended for use with modern bundlers like [webpack 2](https://webpack.js.org) or [rollup](http://rollupjs.org/). The default file for these bundlers (`pkg.module`) is the Runtime only ES Module build (`vue.runtime.esm.js`).

> ES 模块主要用作现代打包器，比如 webpack 2 或 rollup 。默认输出值位于字段 `pkg.module` 中。

### Runtime + Compiler vs. Runtime-only

If you need to compile templates on the fly (e.g. passing a string to the `template` option, or mounting to an element using its in-DOM HTML as the template), you will need the compiler and thus the full build.

如果需要动态编译模板（比如使用字符串 `template` 选项），需要使用包含编译器的完整版。

When using `vue-loader` or `vueify`, templates inside `*.vue` files are compiled into JavaScript at build time. You don't really need the compiler in the final bundle, and can therefore use the runtime-only build.

> 当使用 `vue-loader` 或 `vueify` 时，`*.vue` 文件中的模板会在构建阶段编译为 JavaScript。因此最终打包时并不需要包含编译器，可以使用仅运行时版。

Since the runtime-only builds are roughly 30% lighter-weight than their full-build counterparts, you should use it whenever you can. If you wish to use the full build instead, you need to configure an alias in your bundler.

> 运行时版要比完整版小 30%，因此尽量使用运行时版。如果希望使用完整版，需要在打包器中设置别名。

#### Webpack

```js
module.exports = {
  // ...
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
    }
  }
}
```

#### Rollup

```js
const alias = require('rollup-plugin-alias')

rollup({
  // ...
  plugins: [
    alias({
      'vue': 'vue/dist/vue.esm.js'
    })
  ]
})
```

#### Browserify

Add to your project's `package.json`:

```js
{
  // ...
  "browser": {
    "vue": "vue/dist/vue.common.js"
  }
}
```

### Development vs. Production Mode

Development/production modes are hard-coded for the UMD builds: the un-minified files are for development, and the minified files are for production.

CommonJS and ES Module builds are intended for bundlers, therefore we don't provide minified versions for them. You will be responsible for minifying the final bundle yourself.

CommonJS and ES Module builds also preserve raw checks for `process.env.NODE_ENV` to determine the mode they should run in. You should use appropriate bundler configurations to replace these environment variables in order to control which mode Vue will run in. Replacing `process.env.NODE_ENV` with string literals also allows minifiers like UglifyJS to completely drop the development-only code blocks, reducing final file size.

#### Webpack

Use Webpack's [DefinePlugin](https://webpack.js.org/plugins/define-plugin/):

```js
var webpack = require('webpack')

module.exports = {
  // ...
  plugins: [
    // ...
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
}
```

#### Rollup

Use [rollup-plugin-replace](https://github.com/rollup/rollup-plugin-replace):

```js
const replace = require('rollup-plugin-replace')

rollup({
  // ...
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}).then(...)
```

#### Browserify

Apply a global [envify](https://github.com/hughsk/envify) transform to your bundle.

```bash
NODE_ENV=production browserify -g envify -e main.js | uglifyjs -c -m > build.js
```
