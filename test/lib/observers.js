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
        let flag = 0;
        const callback = () => {
            flag++;
        };
        observer.on(callback);
        expect(flag).to.equal(0);
        document.body.appendChild(element);
        setTimeout(() => {
            expect(flag).to.equal(1);
            done();
        }, 0);
    });
    it('should be able to off the callback', (done) => {
        const element = document.createElement('div');
        const observer = observers(element);
        let flag = 0;
        const callback = () => {
            flag++;
        };
        observer.on(callback);
        observer.on(callback);
        observer.off(callback);
        document.body.appendChild(element);
        setTimeout(() => {
            expect(flag).to.equal(0);
            observer.off(callback);
            document.body.appendChild(element);
            setTimeout(() => {
                expect(flag).to.equal(0);
                done();
            }, 0);
        }, 0);
    });
});
