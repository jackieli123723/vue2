/*
 * index.js
 *
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2016-12-09 09:03
 */
import vue from 'vue'
import vueTouch from 'vue-touch'
import { sync } from 'vuex-router-sync'
import vuex from './vuex'
import router from './routers'
// babel-polyfill
require('babel-polyfill/dist/polyfill')

// app
import app from './app'
// use
vue.use(vueTouch)

if (process.env.NODE_ENV !== 'production') {
    vue.config.debug = true
}

sync(vuex, router)
new vue({ router, vuex, ...app }).$mount('#app')