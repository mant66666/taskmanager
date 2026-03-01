const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    devtool: "inline-source-map",
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        hot: true,
        liveReload: true,
        open: true,
        port: 3000,
        watchFiles: ["src/**/*"],
    },
    performance: {
        maxAssetSize: 500000, // 500 KB
        maxEntrypointSize: 500000,
        hints: 'warning'
    },
    resolve: {
        alias: {
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@base': path.resolve(__dirname, 'src/assets/styles/base'),
            '@blocks': path.resolve(__dirname, 'src/assets/styles/blocks'),
            '@js': path.resolve(__dirname, 'src/assets/js'),            
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.(scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,

                    "css-loader",

                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [autoprefixer],
                            },
                        },
                    },

                    "sass-loader",
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {
                    filename: "assets/fonts/[name][ext]",
                },
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/img/[name].[ext]'
                }
            }

        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "index.html",
        }),
        new CopyWebpackPlugin({
            patterns: [
                { 
                    from: "src/assets", 
                    to: "assets",
                    noErrorOnMissing: true
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
        }),

    ],
};