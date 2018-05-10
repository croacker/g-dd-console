var path = require('path');

module.exports = {
    entry: './src/index.js',
    output:{
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'bin')
    },
    module:{
        loaders:[{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query:{
                presets: ['es2015', 'react', 'stage-0']
            }
        }]
    },
    devtool: 'source-map'
};