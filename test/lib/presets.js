/**
 * @since 2016-10-31 13:33
 * @author vivaxy
 */

import presets from '../../source/lib/presets';

describe('presets', () => {
    it('should change the container style', (done) => {
        const container = document.querySelector('.container');
        presets(container);
        expect(container.style.position).to.equal('relative');
        const element1 = container.querySelector('[data-impression-unique-id="1"]');
        expect(element1.style.position).to.equal('static');
        done();
    });
});
