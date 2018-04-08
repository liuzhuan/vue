const path = require('path')

/**
 * 路径解析均以父级目录为根目录
 * @param {string} p 传入的目录
 */
const resolve = p => path.resolve(__dirname, '../', p)

module.exports = {
  vue: resolve('src/platforms/web/entry-runtime-with-compiler'),
  compiler: resolve('src/compiler'),
  core: resolve('src/core'),
  shared: resolve('src/shared'),
  web: resolve('src/platforms/web'),
  weex: resolve('src/platforms/weex'),
  server: resolve('src/server'),
  /** `entries` NOT FOUND */
  entries: resolve('src/entries'),
  sfc: resolve('src/sfc')
}
