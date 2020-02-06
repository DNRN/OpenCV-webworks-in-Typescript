/* Configure HTMLWebpack plugin */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/src/index.html',
    filename: 'index.html',
    inject: 'body',
});

/* Configure Copy */
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CopyWebpackPluginConfig = new CopyWebpackPlugin([
    {from: 'src/assets', to: '', exclude: 'index.html'}
]);

/* Configure ProgressBar */
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const ProgressBarPluginConfig = new ProgressBarPlugin()

/* Export configuration */
module.exports = {
    mode: 'development',
    target: 'node',
    // node: {
    //     fs: 'empty'
    // },
    // devtool: 'source-map',
    // target: 'node',
    devServer: {
        inline: true,
        compress: true
    },
    externals: ['fs'],
    module: {
        rules: [
            {test: /\.worker\.ts$/, loader: 'worker-loader'},
            {
                test: /\.ts$/,
                use: 'awesome-typescript-loader'
            },
            {
                test: /\.worker\.js$/,
                use: { loader: 'worker-loader' }
            },
            {
                test: /\.opencv.js$/,
                use: ['script-loader']
            },
            {
                test: /\.css$/,
                exclude: /[\/\\]src[\/\\]/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    { loader: 'css-loader' }
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                exclude: /[\/\\](node_modules|public)[\/\\]/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                exclude: /[\/\\](node_modules|public)[\/\\]/,
                use: { loader: 'html-loader' }
            },
        ]
    },
    resolve: { extensions: [".web.ts", ".web.js", ".ts", ".js"] },
    plugins: [
        HTMLWebpackPluginConfig,
        CopyWebpackPluginConfig,
        ProgressBarPluginConfig
    ]
}
