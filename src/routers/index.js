/*
 * index.js
 *
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2016-12-09 09:00
 */
import vue from 'vue'
import vueRouter from 'vue-router'
import map from './map'

vue.use(vueRouter)

const router = new vueRouter({
	routes: map
})
router.beforeEach((to, from, next, abort) => {
    next()
})
router.afterEach((to, from, next) => {
})

export default router
