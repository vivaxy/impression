/**
 * @since 2016-10-30 11:22
 * @author vivaxy
 */

const path = require('path');
const webpack = require('webpack');

const packageJSON = require('./package.json');

const SOURCE_PATH = 'source';
const RELEASE_PATH = 'bundle';

const webpackConfig = {
    entry: {
        index: `./${SOURCE_PATH}/index.js`,
    },
    output: {
        path: path.resolve(__dirname, `${RELEASE_PATH}`),
        filename: 'impression.webpack.js',
        library: `Impression`,
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: ['node_modules'],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                'es2015',
                                {
                                    modules: false,
                                },
                            ],
                            'stage-0',
                        ],
                        env: {
                            test: {
                                plugins: [
                                    'istanbul',
                                ],
                            },
                        },
                    },
                },
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
            },
        ],
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin(),
        new webpack.BannerPlugin(`${packageJSON.name}@v${packageJSON.version} by ${packageJSON.author}`),
    ],
};

module.exports = webpackConfig;
