const webpackMerge = require('webpack-merge');

const env = process.env.NODE_ENV;
const commonConfig = require('./config/base.js');

if(env == 'development'){
    let develop = require('./config/develop.js');
    module.exports = webpackMerge(commonConfig,develop);
}else if(env == 'production'){
    let product = require('./config/product.js');
    module.exports = webpackMerge(commonConfig,product);
}
