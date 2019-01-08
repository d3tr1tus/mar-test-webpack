const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env','@babel/react'],
                        plugins: ['@babel/proposal-class-properties', '@babel/plugin-proposal-object-rest-spread', '@babel/plugin-syntax-dynamic-import']
                    }
                }
            },
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]},
            { test: /\.json$/, loader: "json-loader" },
            { test: /\.(png|woff|woff2|eot|ttf|svg|gif|jpg)$/, loader: 'url-loader?limit=100000' },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/build',
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './dist/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin()
    ],
    optimization: {
        minimizer: [new UglifyJsPlugin()],
    },
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        hot: true
    }
};