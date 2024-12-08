const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.6.25:3000/anime', // Your base API that doesn't block CORS
        changeOrigin: true,
        pathRewrite: {
          '^/api': '', // Optional: Rewrite URL if necessary
        },
      },
      '/watch': {
        target: 'http://your-backend-server.com', // Your own backend to proxy to third-party API
        changeOrigin: true,
        pathRewrite: {
          '^/proxy': '', // Optional: Rewrite the URL if necessary
        },
      },
    },
  },
})
