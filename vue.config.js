module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/static/' : '/',
  
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')

    config.module
        .rule('images')
        .use('url-loader')
        .tap(options => Object.assign(options, { limit: 500 }));
  },
  
  devServer: {
    open: 'darwin' === process.platform,

    // host: '0.0.0.0',
    port: 8088,
    https: false,
    hotOnly: false,

    // proxy: 'https://api.douban.com' // string | Object 
    proxy: 'http://localhost:3000' // string | Object 
  },

  lintOnSave: false
}


