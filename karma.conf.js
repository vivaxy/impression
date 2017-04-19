/**
 * @since 2016-10-31 09:39
 * @author vivaxy
 */

const webpackConfig = require('./webpack.config');

webpackConfig.devtool = 'cheap-inline-source-map';
// webpackConfig.entry = {};
// webpackConfig.output = {};

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
            './test/**/*.js',
        ],
        browsers: [
            'PhantomJS',
        ],
        preprocessors: {
            './test/**/*.js': [
                'webpack',
                'sourcemap',
            ],
        },
        webpack: webpackConfig,
        singleRun: true,
        reporters: [
            'mocha',
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
                        width: 200,
                        height: 200,
                    },
                },
            },
        },
    });
};
