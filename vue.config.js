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
        target: 'http://localhost:8000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      },
      '/auth': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        pathRewrite: {
          '^/auth': '/auth+'
        }
      }
    }
  },
  lintOnSave: false
}
