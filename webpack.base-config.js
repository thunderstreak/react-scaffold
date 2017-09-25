const webpack = require('webpack');
const path = require('path');
const root = __dirname;

const webpackMerge = require('webpack-merge');//config文件合并
const HtmlWebpackPlugin = require('html-webpack-plugin');// 引入html-webpack-plugin
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');//长效缓存
const ExtractTextPlugin = require("extract-text-webpack-plugin");//提取css文件

const env = process.env.NODE_ENV;
const commonConfig = require('./config/base.js');

if(env == 'development'){
    let develop = require('./config/develop.js');
    module.exports = webpackMerge(commonConfig,develop);

}else if(env == 'production'){
    let product = require('./config/product.js');
    module.exports = webpackMerge(commonConfig,product);
}

return;

module.exports = {
    cache   : true,  // 启用缓存
    context : path.resolve(root, 'src'),
    devtool : 'cheap-module-source-map', // 增强浏览器调试
    // 入口文件
    entry: {
        app: [
            'react-hot-loader/patch', // 开启react代码的模块热替换（HMR）

            'webpack-dev-server/client?http://localhost:8008',
            // 为webpack-dev-server的环境打包好运行代码,然后连接到指定服务器域名与端口

            'webpack/hot/only-dev-server',
            // 为热替换（HMR）打包好运行代码,only- 意味着只有成功更新运行代码才会执行热替换（HMR）

            path.resolve(root, 'src/main.js') // 我们的入口文件
        ],
        vendors: ['react', 'react-dom']
    },
    // 出口文件
    output: {
        filename        : 'js/[name].[hash].js',// 输出的打包文件
        path            : path.resolve(root, 'dist'),
        publicPath      : '/',// 对于热替换（HMR）是必须的，让webpack知道在哪里载入热更新的模块（chunk）
        chunkFilename   : '[name].chunk.js',
    },
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
                test: /\.css|less$/,
                /*use:ExtractTextPlugin.extract({
                    fallback    : "style-loader",
                    use         : 'css-loader!less-loader',
                    loaders: [
                        // 通过 loader 参数激活 source maps
                        {
                            loader: 'css-loader',
                            options: { sourceMap: true, importLoaders: 1 }
                        },
                        {
                            loader: 'less-loader',
                            options: { sourceMap: true }
                        }
                    ]
                    publicPath  : '/'
                })*/
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'less-loader'
                ]
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|mp4|webm)(\?\S*)?$/,
                loader: 'url-loader?limit=8192&name=images/[name].[has:4].[ext]'
            }
        ]
    },
    // 服务
    devServer:{
        hot                 : true,// 开启服务器的模块热替换（HMR）
        contentBase         : path.resolve(root,'dist'),// 输出文件的路径
        publicPath          : '/',// 和上文output的"publicPath"值保持一致
        port                : '8008',
        historyApiFallback  : true,
        clientLogLevel      : 'none',//日志输出等级
        open                : false,//启动时打开默认浏览器
    },
    //插件
    plugins: [
        new webpack.HotModuleReplacementPlugin(),//HMR替换插件
        new webpack.NamedModulesPlugin(),//执行HMR替换时打印模块名称

        // 提取公共模块
        new webpack.optimize.CommonsChunkPlugin({
            names: [
                'vendors', 'manifest' // manifest 用于分离 webpack runtime
            ],
            filename    : 'js/[name].[hash].js', // 公共模块文件名
            minChunks   : Infinity,     // Infinity 表示仅仅创建公共组件块，不会把任何modules打包进去。
            //children    : true,//将公共模块打包进父 chunk
        }),

        // 将 manifest 提取到一个单独的 JSON 文件中
        new ChunkManifestPlugin({
            filename            : 'chunk-manifest.json',
            manifestVariable    : 'webpackManifest' // 全局变量的名称，webpack 将利用它查找 manifest JSON 对象
        }),

        // webpack 提取css为单文件
        new ExtractTextPlugin({
            filename    :'css/[name].[hash].css',
            allChunks   :true,//向所有额外的 chunk 提取（默认只提取初始加载模块）
        }),

        new HtmlWebpackPlugin({
            // template:path.resolve(root,'src/template/template.html')

            title    : 'React SPA应用',//标题名称
			// favicon  : 'asset/favicon.ico', //favicon路径
			hash     : true, //开启hash值验证
			filename : 'index.html', //输出入口文件
			template : path.resolve('src/template', 'index.html'), //模板文件路径
			chunks   : ['app', 'vendors', 'manifest'],//需要注入的文件块
			inject   : true, //注入资源到template中(true|'head'|'body'|false)
            cache    : false,
			minify   : { //压缩HTML文件
				removeComments      : true, //移除HTML中的注释
				collapseWhitespace  : true //删除空白符与换行符
			}
        }),
    ]
}
