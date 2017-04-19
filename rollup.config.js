/**
 * @since 2017-04-19 12:43:40
 * @author vivaxy
 */

import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
// import uglify from 'rollup-plugin-uglify';

export default {
    entry: 'source/index.js',
    format: 'umd',
    dest: 'bundle/index.rollup.js',
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
};
