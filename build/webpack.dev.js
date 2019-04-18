"use strict";
const merge = require("webpack-merge");
const common = require("./webpack.base.js");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // html处理插件

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        hot: true, // 开启HMR
        stats: "minimal",
        host: "0.0.0.0",
        port: 8080,
        overlay: true,
        proxy: {
            "/API": {
                target: "http://0.0.0.0:8090/", // 代理服务器地址
                pathRewrite: { "^/API": "" } // 把URL中path部分的api移除
            }
        },
        openPage: "index.html"
    },
    plugins: [
        new webpack.NamedModulesPlugin(), // 用于启动HMR时显示模块的相对路径
        new webpack.HotModuleReplacementPlugin(), // Hot Module Replacement
        new webpack.DefinePlugin({
            "process.env.MOCK": JSON.stringify("true") // 是否开启MOCK
        }),
        // 生成html
        new HtmlWebpackPlugin({
            title: "DEMO页面", // 页面title
            template: "./index.html", // 模版地址
            filename: "index.html", // 输出文件名
            chunks: ["app"]
        })
    ]
});
