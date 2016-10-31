/**
 * @since 2016-10-30 17:53
 * @author vivaxy
 */

import debounce from '../../source/lib/debounce';

describe('debounce', () => {
    it('should return a function', () => {
        expect(debounce()).to.be.a('function');
    });
});
