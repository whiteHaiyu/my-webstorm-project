const webpack = require("webpack");

module.exports = {
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        port: 8080,
        open: false,
        disableHostCheck: true,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            '/api': {
                target: 'http://3.137.32.201:8010',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/api': '',
                }
            }
        }
    },

}