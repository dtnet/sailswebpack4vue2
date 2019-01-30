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
      sails.config.http.middleware.webpackDev = webpackDev(compiler, {
        logLevel: 'debug'
      })
      sails.config.http.middleware.webpackHot = webpackHot(compiler, {
        log: false,
        heartbeat: 2000
      })
      let index = sails.config.http.middleware.order.findIndex(el => el === 'router' ? el : undefined)
      sails.config.http.middleware.order.splice(index + 1, 0, 'historyFallback', 'webpackDev', 'webpackHot')
    }
  }
}
