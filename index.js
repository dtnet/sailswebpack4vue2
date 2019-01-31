const historyFallback = require('connect-history-api-fallback')
const webpack = require('webpack')
const webpackDev = require('webpack-dev-middleware')
const webpackHot = require('webpack-hot-middleware')
const webpackconfig = require('@vue/cli-service/webpack.config')
module.exports = sails => {
  return {
    configure () {
      /* historyFallback */
      sails.config.http.middleware.historyFallback = historyFallback()

      let compiler = webpack(webpackconfig)
      /* webpackDev */
      let webpackDevopts = typeof (sails.config.webpackdev) === 'undefined'
        ? { logLevel: 'debug' }
        : sails.config.webpackdev
      sails.config.http.middleware.webpackDev = webpackDev(compiler, webpackDevopts)
      let webpackHotopts = typeof (sails.config.webpackhot) === 'undefined'
        ? { log: false, heartbeat: 2000 }
        : sails.config.webpackhot
      sails.config.http.middleware.webpackHot = webpackHot(compiler, webpackHotopts)
      let index = sails.config.http.middleware.order.findIndex(el => el === 'router' ? el : undefined)
      sails.config.http.middleware.order.splice(index + 1, 0, 'historyFallback', 'webpackDev', 'webpackHot')
    }
  }
}
