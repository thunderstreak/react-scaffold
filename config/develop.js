const webpack = require('webpack');
const path = require('path');
const config = require('./config.js');

const root = path.resolve(__dirname, '../');

// `npm install ip` 获取本机 ip 用于配置服务器
const ip = require('ip').address();
const devenv = {
    test        : 'http://xxx.xxx',
    development : 'http://' + ip + ':8008',
    production  : 'http://xxx.xxx',
    point       : 8008,
};

module.exports = {
    devtool : 'cheap-module-source-map', // 增强浏览器调试
    // 入口文件
    entry: {
        app: [
            'react-hot-loader/patch', // 开启react代码的模块热替换（HMR）

            'webpack-dev-server/client?' + devenv.development,
            // 为webpack-dev-server的环境打包好运行代码,然后连接到指定服务器域名与端口

            'webpack/hot/only-dev-server',
            // 为热替换（HMR）打包好运行代码,only- 意味着只有成功更新运行代码才会执行热替换（HMR）

            path.resolve(root, 'src/main.js') // 入口文件
        ],
        vendors: config.vendors
    },
    // 出口文件
    output: {
        filename        : 'js/[name].[hash].js',// 输出的打包文件
        path            : path.resolve(root, 'dist'),
        publicPath      : '/',// 对于热替换（HMR）是必须的，让webpack知道在哪里载入热更新的模块（chunk）
        chunkFilename   : '[name].[chunkhash].js',
    },
    // 预处理加载器
    module: {
        rules: [
            {
                test: /\.css|less$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'postcss-loader',
                    'less-loader'
                ]
            },
        ]
    },
    // 服务
    devServer:{
        hot                 : true,// 开启服务器的模块热替换（HMR）
        contentBase         : path.resolve(root,'dist'),// 输出文件的路径
        publicPath          : '/',// 和上文output的"publicPath"值保持一致
        host                : ip,
        port                : devenv.point,
        historyApiFallback  : true,
        clientLogLevel      : 'none',//日志输出等级,none, error, warning 或者 info（默认值）。
        open                : true,//启动时打开默认浏览器

        inline              : true,//内联模式
        compress            : true,//启用gzip 压缩
        noInfo              : false,//「启动时和每次保存之后，那些显示的 webpack 包(bundle)信息」的消息将被隐藏。错误和警告仍然会显示。

        stats: {
            colors  : true,
            errors  : true,
            warnings: true,
            modules : false,
            chunks  : false
        },

        proxy: {//代理模式
            "/api": {
                target: "http://localhost:3000",
                pathRewrite: {"^/api" : ""}
            }
        }

    },
    //插件
    plugins: [
        new webpack.HotModuleReplacementPlugin(),//HMR替换插件
        new webpack.NamedModulesPlugin(),//执行HMR替换时打印模块名称
    ]
};
