"use strict";

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const autoprefixer = require("autoprefixer");

function resolve(dir) {
    return path.join(__dirname, "..", dir);
}

module.exports = {
    entry: {
        app: ["@babel/polyfill", "./src/main.js"]
    },
    output: {
        filename: "js/[name].[hash:8].js",
        path: path.resolve("dist")
    },
    resolve: {
        mainFields: ["main"],
        extensions: [".js", ".vue", ".json", ".css"],
        alias: {
            vue$: "vue/dist/vue.esm.js",
            "@plugins": resolve("src/utils/plugins"),
            "@helper": resolve("src/utils/helper"),
            "@pages": resolve("src/pages"),
            "@view": resolve("src/components/view/")
        }
    },
    module: {
        rules: [
            // 处理vue文件
            {
                test: /\.vue$/,
                use: "vue-loader",
                include: [resolve("src")],
                exclude: /node_modules/
            },
            // 处理js文件
            {
                test: /\.js$/,
                use:
          process.env.NODE_ENV !== "production"
              ? "babel-loader?cacheDirectory"
              : "happypack/loader?id=babel",
                include:
          process.env.NODE_ENV !== "production"
              ? [resolve("src")]
              : [
                  resolve("src"),
                  resolve("test"),
                  resolve("node_modules/webpack-dev-server/client")
              ],
                exclude: [resolve("src/assets/lib")]
            },
            // 处理sass|scss|css文件
            {
                test: /\.(sa|sc|c)ss$/,
                include: [resolve("src"), resolve("/node_modules/element-ui/lib/")],
                use: [
                    process.env.NODE_ENV !== "production"
                        ? "vue-style-loader"
                        : MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 3 // 指定css-loader处理前最多经过的loader个数
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers: ["> 1%"]
                                })
                            ]
                        }
                    },
                    {
                        loader: "sass-loader"
                    },
                    {
                        loader: "sass-resources-loader",
                        options: {
                            resources: ["./src/assets/css/index.scss"]
                        }
                    }
                ]
            },
            // 处理图片资源
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: "url-loader",
                exclude: [resolve("src/assets/svg")],
                options: {
                    limit: 10000,
                    fallback: "file-loader",
                    outputPath: "img/"
                }
            },
            // 处理音频
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    fallback: "file-loader",
                    outputPath: "media/"
                }
            },
            // 处理字体
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    fallback: "file-loader",
                    outputPath: "fonts/"
                }
            }
        ]
    },
    plugins: [
    // VueLoader
        new VueLoaderPlugin(),
        // 提取CSS
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash:8].css" // 设置独立提取出的CSS的文件名
        }),
        new FriendlyErrorsWebpackPlugin()
    ]
};
