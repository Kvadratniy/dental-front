const path = require('path');
const { defineConfig } = require('@vue/cli-service');
const SpritePlugin = require('svg-sprite-loader/plugin');

module.exports = defineConfig({
  lintOnSave: false,

  chainWebpack: (config) => {
    const dir = path.resolve(__dirname, 'src/assets/icons');

    config.module
      .rule('svg-sprite')
      .test(/\.(svg)(\?.*)?$/)
      .include.add(dir)
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        extract: true,
      });

    config.plugin('svg-sprite').use(SpritePlugin, [
      {
        plainSprite: true,
      },
    ]);

    config.module.rule('svg').exclude.add(dir);
  },

  devServer: {
    allowedHosts: 'all',
    proxy: {
      '^/api': {
        target: process.env.API_HOST,
        secure: false,
        changeOrigin: true,
      },
    },
  },
});
