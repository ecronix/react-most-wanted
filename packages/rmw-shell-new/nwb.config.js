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
      'rmw-shell/lib': path.resolve('src'),
    },
    extra: {
      // Adding an extra rule which isn't managed by nwb
      module: {
        rules: [{ test: /\.md$/, loader: 'raw-loader' }],
      },
    },
  },
}
