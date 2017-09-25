const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

const CleanPlugin = require("clean-webpack-plugin");//清空文件夹
const HtmlWebpackPlugin = require('html-webpack-plugin');// 引入html-webpack-plugin
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');//长效缓存

// const ManifestPlugin = require('webpack-manifest-plugin');
// const WebpackChunkHash = require('webpack-chunk-hash');

const config = require('./config.js');
const root = path.resolve(__dirname, '../');

module.exports = {
    context : path.resolve(root, 'src'),//基础目录，绝对路径，用于从配置中解析入口起点(entry point)和加载器(loader)
    //入口文件配置解析类型
    resolve: {
        alias:{
            'COMPONENTS'  :path.resolve(root,'src/components'),
            'IMAGES'      :path.resolve(root,'src/images'),
            'JAVASCRIPT'  :path.resolve(root,'src/javascript'),
            'STORES'      :path.resolve(root,'src/stores'),
            'STYLE'       :path.resolve(root,'src/styles'),
            'TOOLS'       :path.resolve(root,'src/tools')
        },//路径优化
        extensions  : ['.js', '.jsx', '.json'],//自动扩展文件后缀名
        modules     : [ 'node_modules' ],
    },
    // 预处理加载器
    module: {
        rules: [
            {
                test: /\.js|.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|mp4|webm)(\?\S*)?$/,
                loader: 'url-loader?limit=8192&name=images/[name].[hash].[ext]'
            }
        ]
    },
    //插件
    plugins: [
        // 清空指定文件夹
        new CleanPlugin(['dist']),

        // autoprefixer 是 postcss-loader 的 插件，需要在这里进行 autoprefixer 插件的配置
        new webpack.LoaderOptionsPlugin({
            options: {
                context: '/',
                minimize: true,
                postcss: [autoprefixer(config.autoConfig)]
            }
        }),

        // 提取公共模块
        new webpack.optimize.CommonsChunkPlugin({
            names: [
                'vendors', 'manifest' // manifest 用于分离 webpack runtime
            ],
            filename    : 'js/[name].[hash].js', // 公共模块文件名
            minChunks   : Infinity,     // Infinity 表示仅仅创建公共组件块，不会把任何modules打包进去。
            // children    : true,//将公共模块打包进父 chunk
        }),

        //添加任何新的本地依赖，对于每次构建，vendor hash 都应该保持一致：
        new webpack.HashedModuleIdsPlugin(),
        // new ManifestPlugin(),//生成manifest.json
        // new WebpackChunkHash(),

        // 将 manifest 提取到一个单独的 JSON 文件中
        /*new ChunkManifestPlugin({
            filename            : 'chunk-manifest.json',
            manifestVariable    : 'webpackManifest' // 全局变量的名称，webpack 将利用它查找 manifest JSON 对象
        }),*/

        new HtmlWebpackPlugin({
            title    : 'React SPA应用',//标题名称
            // favicon  : 'asset/favicon.ico', //favicon路径
            hash     : true, //开启hash值验证
            filename : 'index.html', //输出入口文件
            template : path.resolve('src/template', 'index.html'), //模板文件路径
            // chunks   : ['app', 'vendors', 'manifest'],//需要注入的文件块
            inject   : true, //注入资源到template中(true|'head'|'body'|false)
            cache    : false,
            minify   : { //压缩HTML文件
            	removeComments      : true, //移除HTML中的注释
            	collapseWhitespace  : true //删除空白符与换行符
            },
            // showErrors:true,//显示错误警告到页面上？？？
            // chunksSortMode: 'dependency',//必须通过上面的 CommonsChunkPlugin 的依赖关系自动添加 js，css 等
        }),
    ]
};
