fis
    .set('project', {
        charset: 'utf8',
        files: [
            '/mock/**',
            '/node_modules/**',
            '/src/**',
            '/static/**',
            '/map.json',
            '/index.html'
        ],
        ignore: fis.get('project.ignore').concat(['.tmp/**', 'database/**', 'DS_store']),
        md5Length: 16,
        md5Connector: '.'
    })
    .set('livereload', {
        // hostname: '127.0.0.1',
        port: 8135
    })

	// mock 忽略依赖
	.match('/mock/**.js', {
		ignoreDependencies: true,
		parser: [
			fis.plugin('babel-5.x', {
				stage: 2
			})
		]
	})

	// vue
	.match('/src/**.vue', {
		isMod: true,
		rExt: 'js',
		parser: [
			fis.plugin('vue-component'),
			fis.plugin('babel-5.x', {
				stage: 2,
				compact: false,
				sourceMaps: false,
				comments: false
			})
		]
	})

	// babel
	.match('/{node_modules,src}/**.js', {
		// useHash: true,
		isMod: true,
		useSameNameRequire: true,
		parser: [
			fis.plugin((content, file) => {
				if (file.filename == 'vue-touch') {
					return content
									.replace(/;\(function\s\(\)\s{\s/ig, '')
									.replace(/if\s\(typeof\sexports[\s\S]*?[\s\S]*?}\)\(\)/ig, '; module.exports = vueTouch')
				}
				return content.replace(/process\.env\.VUE_ENV/ig, '\'client\'')
			}),
			fis.plugin('babel-5.x', {
				stage: 2,
				compact: false, // > 100KB
				sourceMaps: false,
				comments: false
			})
		]
	})

	.match('/node_modules/fis-mod/**.js', {
		isMod: false
	})
	.match('/src/**.{vue,js}', {
		preprocessor: [
			fis.plugin('js-require-css'),
			fis.plugin('js-require-file', {
				useEmbedWhenSizeLessThan: 10 * 1024 // 小于10k用base64
			})
		]
	})

	// hook
	.unhook('components')
	.hook('node_modules', {
		shimProcess: false,
		ignoreDevDependencies: true
		// shutup: true
	})
	.hook('commonjs', {
		extList: [
			'.js', '.vue'
		],
        packages: [
	        {
		        name: 'vue',
		        location: '/node_modules/vue/dist',
		        main: 'vue.common.js'
	        }, {
                name: 'store',
                location: '/src/static/js/store',
                main: 'store2.js'
            }
        ]
	})

	// sass的编译
	.match('/{node_modules,src,static/css}/**.{css,scss}', {
		rExt: '.css',
		parser: fis.plugin('sass2', {
			sourceMap: false,
			include_paths: [
				'/node_modules',
				'/src/static/css'
			],
			define: {
				env: 'development'
			}
		}),
		postprocessor: [
			fis.plugin((content, file) => {
				const postcss = require('postcss')
				const plugins =  [
					require('postcss-size'),
					require('postcss-circle'),
					require('postcss-triangle')(),
					require('postcss-clearfix'),
					require('postcss-position'),
					// require('postcss-px2rem')({
					// 	baseDpr: 2,
					// 	remUnit: 75,
					// 	remPrecision: 8,
					// 	threeVersion: true
					// }),
					require('postcss-discard-comments')({
						removeAll: true
					}),
					require('autoprefixer', {
						browsers: [
							'last 3 versions',
							'ie >= 10',
							'ie_mob >= 10',
							'ff >= 30',
							'chrome >= 34',
							'safari >= 6',
							'opera >= 12.1',
							'ios >= 6',
							'android >= 4.4',
							'bb >= 10',
							'and_uc 9.9'
						],
						cascade: true,
						remove: true
					})
				];

				return postcss(plugins).process(content).css
			})
		]
	})
	.match('/{static/css,src/static/css}/{_*,**/_*}.scss', {
		release: false
	})

	// packager
	.match('::packager', {
		postpackager: fis.plugin('loader', {
			resourceType: 'mod',
			useInlineMap: true,
			allInOne: {
				includeAsyncs: false,
				ignore: [
					'**.js',
					'**.css'
				],
				sourceMap: true,
				useTrack: true
			}
		}),
		packager: fis.plugin('map')
	})

    // svg
    .match('/{src/static/img,static/img}/(**).svg', {
        optimizer: fis.plugin((content, file) => {
            const deasync = require('deasync')
            const svgo = require('svgo')
            const options = {
                plugins: [{
                    removeDoctype: false
                }, {
                    removeComments: false
                }, {
                    cleanupNumericValues: {
                        floatPrecision: 2
                    }
                }, {
                    convertColors: {
                        names2hex: false,
                        rgb2hex: false
                    }
                }]
            }
            const optimize = deasync((content, callback) => {
                new svgo(options).optimize(content, (result) => {
                    callback(null, new Buffer(result.data))
                })
            })

            return optimize(fis.util.readBuffer(content))
        }),
        release: '/static/img/$1'
    })


    .media('prod')
    .match('/src/**.js', {
        optimizer: fis.plugin('uglify-js', {
            compress: {
                drop_console: true
            }
        })
    })
