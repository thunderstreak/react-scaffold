
// 公共文件
exports.vendors = [
    'react',
    'react-dom',

    'react-router',
    'react-router-dom',
    // 'react-router-redux',

    // 'redux',
    // 'react-redux',
    // 'redux-thunk'
];

// css 代码自动补全配置
exports.autoConfig = {
    browsers: [
        'ie >= 8',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4.4',
        'bb >= 10'
    ],
    cascade : true,
    remove  : true
};

// js 压缩 配置
exports.uglifyJsConfig = {
    beautify: false,    // 不美化输出
    compress: {
        warnings        : false, // 不保留警告
        drop_debugger   : true, // 不保留调试语句
        drop_console    : true // 不保留控制台输出信息
    },
    mangle: {           // 跳过这些，不改变命名
        except: ['$super', '$', 'exports', 'require']
    },
    space_colon : false,
    comments    : false     // 不保留注释
};
