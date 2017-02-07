/*
 * map.js
 *
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2016-12-09 09:00
 */
export default [
    {
        name: 'home',
        path: '/',
        component: (resolve) => {
            require.async(['/src/views/home'], (view) => {
                resolve(view)
            })
        }
    }, {
        name: 'user',
        path: '/user/:id',
        component: {
            template: `
                        <div class="user">
                          <h2>User {{ $route.params.id }}</h2>
                          <router-view></router-view>
                        </div>
                    `
        }
    }
]
