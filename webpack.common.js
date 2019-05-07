const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
    entry: [
        './src/styles/styles.scss',
        '@babel/polyfill',
        './src/ts/index.ts'
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true,
                        }
                    }
                ],
                exclude: path.resolve(__dirname, 'src/index.html')
            },
            {
                test:/\.scss$/,
                use:  [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { url: false, sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ]
            },
            {
                test: /\.tsx?$/,
                use: [
                    'babel-loader',
                    'ts-loader'
                ],
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: "src/index.html",
                filename: "./index.html"
            }
        ),
        new MiniCssExtractPlugin({
            filename: "styles.[hash].css"
        }),
        new CopyWebpackPlugin([
            {from:'assets',to:'assets'}
        ]),
        new ProgressBarPlugin()
    ],
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'dist')
    }
};
