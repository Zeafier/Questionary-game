module.exports = {
    css: {
        loaderOptions: {
            sass: {
                implementation: require('sass')
            }
        }
    },
    // options...
    devServer: {
        proxy: 'https://the-trivia-api.com/',
    }
}