/**
 * @since 2016-10-30 17:53
 * @author vivaxy
 */

import debounce from '../../source/lib/debounce';

describe('debounce', () => {
    it('should execute after 100ms', (done) => {
        let flag = 0;
        const debouncedFunction = debounce(() => {
            flag++;
        }, 100);
        debouncedFunction();
        expect(flag).to.equal(0);
        expect(typeof debouncedFunction).to.equal('function');
        setTimeout(() => {
            expect(flag).to.equal(1);
            done();
        }, 100);
    });

    it('should execute after 100ms', (done) => {
        let flag = 0;
        const debouncedFunction = debounce(() => {
            flag = 1;
        }, 100);
        debouncedFunction();
        expect(flag).to.equal(0);
        expect(typeof debouncedFunction).to.equal('function');
        setTimeout(() => {
            debouncedFunction();
            expect(flag).to.equal(0);
            setTimeout(() => {
                expect(flag).to.equal(1);
            }, 100);
        }, 50);
        setTimeout(() => {
            expect(flag).to.equal(0);
            done();
        }, 100);
    });
});
