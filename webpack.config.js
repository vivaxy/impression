/**
 * @since 2016-10-30 11:22
 * @author vivaxy
 */

const path = require('path');

const SOURCE_PATH = 'source';
const RELEASE_PATH = 'bundle';

const webpackConfig = {
    entry: {
        index: `./${SOURCE_PATH}/index.js`,
    },
    output: {
        path: path.resolve(__dirname, `${RELEASE_PATH}`),
        filename: '[name].js',
        library: `Impression`,
        libraryTarget: 'umd',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: [
                    'babel'
                ]
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
        ],
    },
    plugins: [],
};

module.exports = webpackConfig;
