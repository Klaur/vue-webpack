const path = require('path')
// const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
let config={
    target: "web",
    entry:{
        main:path.join(__dirname,"src/main.js")
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        // publicPath: "/dist/",
        filename: '[name]-[hash].js'
    },
    module: {
        rules: [
            {
                test:/\.vue$/,
                loader:'vue-loader',
                options:{
                    loaders:{
                        css:ExtractTextPlugin.extract({
                            use:'css-loader',
                            fallback:'vue-style-loader'
                        })
                    }
                }
            },
            {
                test:/\.(gif|jpg|jpeg|png|woff|svg|eot|ttf)\??.*$/,
                loader: "url-loader?limit=1024"
            },
            {
                test:/\.css$/,
                use:ExtractTextPlugin.extract({
                    use:'css-loader',
                    fallback:'style-loader'
                })
            },
            {
                test:/\.js/,
                loader: "babel-loader",
                exclude:/node_modules/
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename:'[name]-[hash].css'
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress:{
        //         warnings:false
        //     }
        // }),
        new HtmlWebpackPlugin({
            title: 'webpack demo',  // 生成 HTML 文档的标题
            filename: 'index.html', // 写入 HTML 文件的文件名，默认 `index.html`
            template:'./index.html'
        }),
        new CleanWebpackPlugin(['dist'])
    ],
    devServer: {
        port:1314,
        host:'0.0.0.0',
        overlay:{
            errors:true
        },
        // hot:true
    }
}
module.exports =config