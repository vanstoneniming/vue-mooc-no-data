module.exports = {
  devServer: {
    port: 4300,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Range',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      maxHeaderSize: 1024000 // 设置maxHeaderSize为1MB
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        // target: 'http://api.ke.video',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      },
      '/auth': {
        target: 'http://127.0.0.1:8000',
        // target: 'http://api.ke.video',
        changeOrigin: true,
        pathRewrite: {
          '^/auth': '/auth'
        }
      }
    }
  },
  lintOnSave: false
}
