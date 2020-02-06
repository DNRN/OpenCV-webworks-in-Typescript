const merge = require('webpack-merge');
const common = require('./webpack.common.js');

/* Configure BrowserSync */
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const BrowserSyncPluginConfig = new BrowserSyncPlugin({
    host: 'localhost',
    port: 3000,
    proxy: 'http://localhost:8080/'
}, config = {
    reload: false
});

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        // contentBase: './temp',
        // historyApiFallback: {
        //     index: 'index.html'
        // }
    },
    entry: './src/index.ts',
    output: {
        filename: '[name]/[name].js',
        path: __dirname + '/temp',
        publicPath: '/'
    },
});