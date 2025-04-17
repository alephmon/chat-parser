const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    //https: true,
    allowedHosts: 'all',
    client: {
      webSocketURL: {
        protocol: 'wss',
        hostname: 'obscure-fortnight-4jjv5g44pxw6c5rx6-8080.app.github.dev', 
        port: '443',
      },
    },
  },
})
