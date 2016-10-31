/**
 * @since 2016-10-31 12:57
 * @author vivaxy
 */

import observers from '../../source/lib/observers';

describe('observers', () => {
    it('should return a object', (done) => {
        const element = document.createElement('div');
        const observer = observers(element);
        expect(observer).to.have.property('on');
        expect(observer).to.have.property('off');
        done();
    });
    it('should be able to execute the callback', (done) => {
        const element = document.createElement('div');
        const observer = observers(element);
        let flag = false;
        observer.on(() => {
            flag = true;
        });
        expect(flag).to.equal(false);
        document.body.appendChild(element);
        setTimeout(() => {
            expect(flag).to.equal(true);
            done();
        }, 0);
    });
    it('should be able to off the callback', (done) => {
        const element = document.createElement('div');
        const observer = observers(element);
        let flag = false;
        const callback = () => {
            flag = true;
        };
        observer.on(callback);
        observer.off(callback);
        document.body.appendChild(element);
        setTimeout(() => {
            expect(flag).to.equal(false);
            done();
        }, 0);
    });
});
