/**
 * @since 2016-10-31 12:57
 * @author vivaxy
 */

import * as observerTypes from '../../source/configs/observers';
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
        let count = 0;
        let type;
        const callback = (_type) => {
            count++;
            type = _type;
        };
        observer.on(callback);
        expect(count).to.equal(0);
        document.body.appendChild(element);
        setTimeout(() => {
            expect(count).to.equal(1);
            expect(type).to.equal(observerTypes.MUTATION);
            done();
        }, 0);
    });
    it('should be able to off the callback', (done) => {
        const element = document.createElement('div');
        const observer = observers(element);
        let count = 0;
        const callback = () => {
            count++;
        };
        observer.on(callback);
        observer.on(callback);
        observer.off(callback);
        document.body.appendChild(element);
        setTimeout(() => {
            expect(count).to.equal(0);
            observer.off(callback);
            document.body.appendChild(element);
            setTimeout(() => {
                expect(count).to.equal(0);
                done();
            }, 0);
        }, 0);
    });
});
