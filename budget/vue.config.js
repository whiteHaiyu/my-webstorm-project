module.exports = {

    publicPath: './',
    outputDir: 'budget',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        port: 18080,
        open: false,
        disableHostCheck: true,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3000',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/api': '',
                }
            },
        }
    }

}