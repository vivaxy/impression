/**
 * @since 2017-04-19 12:43:40
 * @author vivaxy
 */

import babel from 'rollup-plugin-babel';
// import uglify from 'rollup-plugin-uglify'

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
        // uglify(),
    ],
    external: [
        'eventemitter3'
    ],
    globals: {
        eventemitter3: 'EventEmitter',
    },
};
