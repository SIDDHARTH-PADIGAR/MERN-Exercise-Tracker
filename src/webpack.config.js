const nodePolyfills = require('browserify-zlib');

module.exports = {
  entry: './src/index.js', // Adjust this to your entry file
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
  },
  resolve: {
    fallback: {
      zlib: nodePolyfills.zlib,
    },
  },
  // Other Webpack configuration options...
};
