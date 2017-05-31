/**
 * @since 2017-04-19 12:43:40
 * @author vivaxy
 */

import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const packageJSON = require('./package.json');
// import uglify from 'rollup-plugin-uglify';

export default {
    entry: 'source/index.js',
    format: 'umd',
    exports: 'default',
    moduleName: 'Impression',
    dest: 'bundle/impression.rollup.js',
    plugins: [
        babel({
            babelrc: false,
            presets: [
                'es2015-rollup',
                'stage-0',
            ],
        }),
        resolve(),
        commonjs(),
        // uglify(),
    ],
    legacy: true,
    banner: `/* ${packageJSON.name}@v${packageJSON.version} by ${packageJSON.author} */`,
};
