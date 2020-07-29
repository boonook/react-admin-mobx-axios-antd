const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('./config/index');
module.exports = function (app) {
    app.use(createProxyMiddleware('/api',
        {
            target: config.baseUrl.dev, // 测试环境
            changeOrigin: true,
        }
    ));
};
