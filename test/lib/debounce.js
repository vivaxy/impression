/**
 * @since 2016-10-30 17:53
 * @author vivaxy
 */

import debounce from '../../source/lib/debounce';

describe('debounce', () => {
    it('should execute after 100ms', (done) => {
        let flag = false;
        const debouncedFunction = debounce(() => {
            flag = true;
        }, 100);
        debouncedFunction();
        expect(flag).to.equal(false);
        expect(typeof debouncedFunction).to.equal('function');
        setTimeout(() => {
            expect(flag).to.equal(true);
            done();
        }, 100);
    });

    it('should execute after 100ms', (done) => {
        let flag = false;
        const debouncedFunction = debounce(() => {
            flag = true;
        }, 100);
        debouncedFunction();
        expect(flag).to.equal(false);
        expect(typeof debouncedFunction).to.equal('function');
        setTimeout(() => {
            debouncedFunction();
            expect(flag).to.equal(false);
            setTimeout(() => {
                expect(flag).to.equal(true);
            }, 100);
        }, 50);
        setTimeout(() => {
            expect(flag).to.equal(false);
            done();
        }, 100);
    });
});
