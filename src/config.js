/*
 * config.js
 * 配置
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2016-12-09 09:20
 */
export const http = {
    root: process.env.NODE_ENV !== 'production' ? `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
                                                 : 'http://api.laravel-shop-test.com',
    version: 'v1'
}

export const token = {
    expires: 60 * 60 * 30
}