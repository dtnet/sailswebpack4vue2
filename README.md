# sailswebpack4vue2
## build sails with nofrontend
````
sails new <project name> --no-frontend
cd <project name>
npm i sails-hook-webpack4vue2
````
## config static dir
````
# config/loacl.js or .sailsrc
  paths:{
    public: 'public'
  }
  # or
  "paths": {
    "public": "public"
  }
````
## config webpack
````
# vue.config.js
module.exports = {
  configureWebpack: config => {
    if (sails.config.environment === 'development') {
      /* HMR */
      config.entry = {
        app: ['./src/main.js', 'webpack-hot-middleware/client?reload=true']
      }
    } else {
      /* config for production mode */
    }
  }
}
````
````
mkdir public
# public/index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title>vuecli</title>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but vuecli doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
````
````
mkdir src
# src/main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
````
````
# src/router.js
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
````
````
# src/store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  }
})

````
````
# src/App.vue
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
````
[config webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware)
````
# config/webpackdev.js
module.exports.webpackdev = {
  /* config */
}
````
[config webpack-hot-middleware](https://github.com/webpack-contrib/webpack-hot-middleware)
````
# config/webpackhot.js
module.exports.webpackhot = {
  /* config */
}
````

