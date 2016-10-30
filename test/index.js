/**
 * @since 2016-10-30 17:53
 * @author vivaxy
 */

import { expect } from 'chai';

import debounce from '../source/lib/debounce';

describe('haha', () => {
    it('est', () => {
        expect(debounce()).to.be.a('function');
    });
});
