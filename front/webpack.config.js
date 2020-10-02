require('dotenv').config();
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: {
        app: path.resolve(__dirname, './src/app.js'),
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(ttf|woff|woff2|eat)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                }
            },
            {
                    test: /\.mp4$/,
                    use: 'file-loader?name=videos/[name].[ext]',
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new CleanWebpackPlugin(),
        new webpack.EnvironmentPlugin(['API_BASE_URL'])
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            'utils': path.resolve(__dirname, './src/utils/index.js'),
            'api': path.resolve(__dirname, './src/api/index.js'),
        }
    },
    devServer: {
        overlay: true,
        port: 8080,
        hot: true,
        historyApiFallback: true
    },
}