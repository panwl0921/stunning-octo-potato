const webpack = require('webpack')
const CompressionPlugin = require("compression-webpack-plugin")
// 显示打包进度和时间
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const path = require('path')

const dllPath = "./public/vendor/";
const { library } = require("./dll.config.js");

// 引入生成的 dll 文件
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
    publicPath: '/',
    pages: {
        main: {
            entry: 'src/main.ts',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    configureWebpack: (config) => {
        return {
            plugins: [
                ...Object.keys(library).map(name => {
                    return new webpack.DllReferencePlugin({
                        context: process.cwd(),
                        manifest: path.join(dllPath, `${name}-manifest.json`),
                        sourceType: "global",
                        scope: "dll",
                        name: name,
                        extensions: [".js"]
                    })
                }),
                // 将 dll 注入到 生成的 html 模板中
                new AddAssetHtmlPlugin(Object.keys(library).map(name => {
                    return {
                        filepath: require.resolve(path.resolve(`${dllPath}${name}.dll.js`)),
                        includeSourcemap: true,
                        // dll 引用路径
                        publicPath: '/vendor',
                        // dll最终输出的目录
                        outputPath: '/vendor'
                    }
                })),
                new SimpleProgressWebpackPlugin()
            ]
        }
    },
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true //less 配置
            }
        }
    },
    publicPath: './',
    chainWebpack: config => {
        config.resolve.alias
            .set('assets', path.resolve(__dirname, './src/assets'))
            .set('styles', path.resolve(__dirname, './src/styles'))
            .set('components', path.resolve(__dirname, './src/components'));
        // 移除 prefetch 插件
        config.plugins.delete('prefetch-main');
        // 移除 preload 插件
        config.plugins.delete('preload-main');
    },
    parallel: require('os').cpus().length > 1,
    productionSourceMap: true
}