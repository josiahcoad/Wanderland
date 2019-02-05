const path = require('path');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');

module.exports = {
    context: __dirname,
    entry: {
        content: ['./src/content/index.js'],
        background: ['./src/background/index.js'],
        popup: ['./src/popup/index.js'],
    },
    output: {
        filename: 'js/[name]Bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 8000, // If image is less than 8kb, convert to base64
                            name: 'images/[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                use: [
                    'file-loader?name=html/[name].[ext]', // Saves to html folder in dist
                    'extract-loader',
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true,
                            removeComments: true,
                            collapseWhitespace: true,
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader'],
            },
        ],
    },
    resolve: {
        modules: [path.join(__dirname, 'node_modules')],
    },
    plugins: [
        new ChromeExtensionReloader({
            reloadPage: true,
            background: 'background',
        }),
    ],
};
