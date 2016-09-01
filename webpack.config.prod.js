var webpack = require('webpack');
var path = require('path');
var combineLoaders = require('webpack-combine-loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: {
        app: './src/index.jsx'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'javascript-[chunkhash].js'
    },
    plugins: [
        new ExtractTextPlugin('styles-[chunkhash].css'),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')  //'"production"'              
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true,
                warnings: false
            },
            mangle: {
                screw_ie8: true
            },
            output: {
                comments: false,
                screw_ie8: true
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new HtmlWebpackPlugin({
            template: 'index.template.ejs',
            inject: 'body',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.s?css$/,
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    combineLoaders([
                        {
                            loader: 'css-loader',
                            query: {
                                modules: true,
                                localIdentName: '[name]__[hash:base64:7]'
                            }
                        },
                        {
                            loader: 'sass-loader',
                            query: {
                                sourceMap: true,
                                includePaths: [
                                    'src'
                                    // 'app/assets/stylesheets/legacy',
                                ]
                            }
                        }])
                )
            },
            { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}