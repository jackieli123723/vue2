/*
 * index.js
 *
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2016-12-09 09:20
 */
import vue from 'vue'
import vuex from 'vuex'
// modules

// use
vue.use(vuex)
export default new vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
    }
})
