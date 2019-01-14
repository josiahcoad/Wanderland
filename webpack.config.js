const path = require('path');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');

module.exports = {
    context: __dirname,
    entry: {
        content: [
            './src/content/index.js',
        ],
        background: [
            './src/background/background.js',
        ],
    },
    output: {
        filename: '[name]Bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
        },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader',
        },
        {
            test: /\.html$/,
            loader: 'html-loader',
            exclude: /node_modules/,
        },
        ],
    },
    resolve: {
        modules: [
            path.join(__dirname, 'node_modules'),
        ],
    },
    plugins: [
        new ChromeExtensionReloader({
            reloadPage: true,
            background: 'background',
        }),
    ],
};
