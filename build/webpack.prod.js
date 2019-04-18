"use strict";

const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.base.js");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // CSS模块资源优化插件
const HtmlWebpackPlugin = require("html-webpack-plugin"); // html处理插件
const CopyWebpackPlugin = require("copy-webpack-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HappyPack = require("happypack");
const os = require("os");
const happyThreadPoll = HappyPack.ThreadPool({ size: os.cpus().length });
const TerserPlugin = require("terser-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    output: {
        publicPath: "/",
        path: path.resolve("dist")
    },
    stats: {
        colors: true,
        children: false,
        chunks: false,
        modules: false,
        chunkModules: false
    },
    performance: {
        hints: "warning",
        maxAssetSize: 30000000,
        maxEntrypointSize: 50000000
    },
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
        splitChunks: {
            minSize: 300000,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: ".",
            name: true,
            cacheGroups: {
                default: false,
                commons: {
                    // 拆分初始化加载时被重复引用的模块
                    name: "commons",
                    chunks: "initial", // async: 作用于异步模块，all: 所有模块, initial: 初始化模块
                    minChunks: 2
                },
                vendors: {
                    name: "vendors",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HappyPack({
            id: "babel",
            loaders: ["babel-loader?cacheDirectory"],
            threadPool: happyThreadPoll,
            verbose: true
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve("static"),
                to: "static",
                ignore: [".*"]
            }
        ]),
        new HtmlWebpackPlugin({
            title: "DEMO", // 页面title
            template: "./index.html", // 模版地址
            filename: "index.html", // 输出文件名
            chunks: ["vendors", "commons", "app"],
            minify: {
                minifyCSS: true, // 压缩HTML中出现的CSS代码
                minifyJS: true, // 压缩HTML中出现的JS代码
                removeComments: true, // 移除注释
                collapseWhitespace: true, // 压缩html中的空白文本节点
                collapseInlineTagWhitespace: true // 压缩行空白，保留&nbsp;空格
            }
        })
    ]
});
