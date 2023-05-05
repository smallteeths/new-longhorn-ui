const { createProxyMiddleware } = require('http-proxy-middleware');
const endpoint = process.env.LONGHORN_MANAGER_IP || 'http://127.0.0.1:9500/';

module.exports = function(app) {
  app.use(createProxyMiddleware('/v1/', {
    target: endpoint,
    changeOrigin: false,
  }));
  app.use(createProxyMiddleware('/v1/ws/**', {
    target: endpoint,
    changeOrigin: false,
    ws: true,
    secure: false,
  }));
};