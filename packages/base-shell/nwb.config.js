const path = require('path')

module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: false,
  },
  webpack: {
    /*
    html: {
      template: 'demo/public/index.html',
    },
    */
    aliases: {
      'base-shell/lib': path.resolve('src'),
    },
  },
}
