/**
 * @since 2016-10-31 09:39
 * @author vivaxy
 */

const webpackConfig = require('./webpack.config');

webpackConfig.devtool = 'cheap-inline-source-map';

module.exports = function(config) {
    config.set({
        basePath: '',
        autoWatch: true,
        customContextFile: './test/index.html',
        frameworks: [
            'mocha',
            'chai',
        ],
        files: [
            './source/index.js',
            './test/**/*.js',
        ],
        browsers: [
            'PhantomJS',
        ],
        preprocessors: {
            './source/index.js': [
                'webpack',
                'sourcemap',
            ],
            './test/**/*.js': [
                'webpack',
                'sourcemap',
            ],
        },
        webpack: webpackConfig,
        singleRun: true,
        reporters: [
            'progress',
            'coverage',
        ],
        coverageReporter: {
            dir: 'coverage/',
            reporters: [
                {
                    type: 'lcov',
                },
            ],
        },
        customLaunchers: {
            'PhantomJS_Desktop': {
                base: 'PhantomJS',
                options: {
                    viewportSize: {
                        width: 400,
                        height: 1200,
                    },
                },
            },
        },
    });
};
