/*
 * api.js
 *
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2016-12-09 09:20
 */
const extend = require('extend')
const parseUrl = require('url').parse
const request = require('request')

export default (req, res, next) => {
    let type = parseUrl(req.originalUrl).pathname;
    let url = `http://api.laravel-shop-test.com/${type}`

    let options = extend(true, {
        url: url,
        method: req.method,
        headers: req.headers,
        json: true,
        qs: req.query,
        form: req.body,
        proxy: 'http://api.laravel-shop-test.com',
        timeout: 10000
    }, {
        headers: {
            host: parseUrl(url).host
        }
    })

    request(options, function (error, response, body) {
        res.json(body)
    })
}
