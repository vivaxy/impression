/**
 * @since 2016-10-30 14:52
 * @author vivaxy
 */

import validators from '../../source/lib/validators';

describe('validators', () => {
    it('should tell wether the element is viewable', (done) => {
        const element1 = document.querySelector('[data-impression-unique-id="1"]');
        const element4 = document.querySelector('[data-impression-unique-id="4"]');
        expect(validators(element1, window, 0)).to.equal(true);
        expect(validators(element4, window, 0)).to.equal(false);
        expect(validators(element1, document.body, 0)).to.equal(true);
        expect(validators(element4, document.body, 0)).to.equal(false);
        done();
    });
});
