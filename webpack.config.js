const path = require('path');

module.exports = {
    entry: './src/content/index.js',
    output: {
        filename: 'content.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }]
    }
};