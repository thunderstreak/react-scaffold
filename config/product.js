const webpack = require('webpack');
const path = require('path');
const config = require('./config.js');
const root = path.resolve(__dirname, '../');

const ExtractTextPlugin = require("extract-text-webpack-plugin");//提取css文件
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        app:path.resolve(root, 'src/main.js'),
        vendors: config.vendors
    },
    output: {
        path: path.resolve(root, 'dist'),
        filename:'js/[name].[hash].js',
        publicPath: '/',
        chunkFilename: '[name].[chunkhash].js'
    },
    // 预处理加载器
    module: {
        // devtool: false,
        rules: [
            {
                test: /\.css|less$/,
                use:ExtractTextPlugin.extract({
                    fallback    : "style-loader",
                    use         : 'css-loader!postcss-loader!less-loader',
                    /*loaders: [
                        // 通过 loader 参数激活 source maps
                        {
                            loader: 'css-loader',
                            options: { sourceMap: true, importLoaders: 1 }
                        },
                        {
                            loader: 'less-loader',
                            options: { sourceMap: true }
                        }
                    ],*/
                    publicPath  : '/'
                })
            }
        ]
    },
    //插件
    plugins: [
        //解决react打包构建时提示使用压缩后的React development
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:JSON.stringify("production")
            }
        }),
        // js 压缩
        new webpack.optimize.UglifyJsPlugin(config.uglifyJsConfig),
        // webpack 提取css为单文件
        new ExtractTextPlugin({
            filename    :'css/[name].[hash].css',
            allChunks   :true,//向所有额外的 chunk 提取（默认只提取初始加载模块）
        }),
        // webpack3 新特性作用域的提升
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
};
