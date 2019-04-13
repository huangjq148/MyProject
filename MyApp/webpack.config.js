const webpack = require('webpack');
module.exports = {
    mode: 'production',
    entry: {
        tradeList1: './public/js/business/tradeList1.js'
        // ,"common": ['vue/dist/vue.common.js', 'element-ui']
        // ,sellPage: './public/js/business/sellPage.js'
    },
    output: {
        path:  __dirname + '/public/dist',
        publicPath:  '/dist/',  // 访问目录
        filename  :  'js/[name].js'
    },
    externals:{
        Vue:"Vue",
        ElementUI: "element-ui",
        axios: "axios",
        moment:"moment"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        //加载器配置
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    devServer:{
        contentBase:__dirname+'/dist'
    },
    watchOptions: {
        aggregateTimeout: 10,
        poll: 1000
    },
};