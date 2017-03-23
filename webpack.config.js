var path = require('path')

var APP_DIR = path.resolve(__dirname, 'app') // To tell webpack where is the entrance for source code
var PUB_DIR = path.resolve(__dirname, 'public/js')  // Distribution or target directory

var config = {
  // determine which file is first file to start transpiling and bundling journey
  entry: APP_DIR + '/app.js',
  // tell webpack where to output everything
  output: {
    path: PUB_DIR,
    filename: 'bundle.js'
  },
  module: {// For transforming ES6 to ES5, some modules need to be loaded
    loaders: [
      {
        test: /\.js?/, // regex to look at all .js files inside entry folder
        include: APP_DIR,  // Look into app directory to find all .js files
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-2']  // Presets for babel as per package.json
        }
      }
    ]
  }

}
module.exports = config
