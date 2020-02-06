const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = merge(common, {
    mode: 'production',
    entry: './src/index.ts',
    optimization: {
        minimizer: [
            new TerserPlugin({
                sourceMap: false,
                terserOptions: {
                    compress: {
                        drop_console: false,
                    },
                },
            }),
        ],
    },
    output: {
        filename: '[name]/[name].js',
        path: __dirname + '/dist'
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
});