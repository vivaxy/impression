/**
 * @since 2016-10-31 14:38
 * @author vivaxy
 */

import * as eventTypes from '../source/configs/events';
import * as observerTypes from '../source/configs/observers';
import Impression from '../source/index';

describe('Impression', () => {

    it('should use default options', (done) => {
        const impression = new Impression();
        expect(impression._container).to.equal(window);
        expect(impression._tolerance).to.equal(0);
        expect(impression._debounce).to.equal(100);
        const impression2 = new Impression({
            debounce: 1000,
        });
        expect(impression2._container).to.equal(window);
        expect(impression2._tolerance).to.equal(0);
        expect(impression2._debounce).to.equal(1000);
        done();
    });

    it('should has valid properties', (done) => {
        const impression = new Impression();
        expect(impression).to.have.property('on');
        expect(impression).to.have.property('off');
        expect(impression).to.have.property('isViewable');
        expect(impression).to.have.property('once');
        expect(impression).to.have.property('attach');
        expect(impression).to.have.property('detach');
        done();
    });

    it('should able to detach', (done) => {
        const SELECTOR4 = '[data-impression-unique-id="4"]';
        const impression = new Impression({
            container: document.body,
            tolerance: 0,
            debounce: 100,
        });
        let count = 0;
        const callback = () => {
            count++;
        };
        impression.on(eventTypes.BEGIN, SELECTOR4, callback);
        impression.detach();
        const element4 = document.querySelector(SELECTOR4);
        expect(impression.isViewable(element4)).to.equal(false);
        expect(count).to.equal(0);
        const div = document.createElement('div');
        document.body.appendChild(div);
        setTimeout(() => {
            expect(count).to.equal(0);
            document.body.removeChild(div);
            done();
        }, 200);
    });

    it('should throw error when attached event is not accepted', (done) => {
        const impression = new Impression({
            container: document.body,
            tolerance: 0,
            debounce: 100,
        });
        expect(impression.on.bind(impression, `enter`)).to.throw(`impression: event not accepted: enter`);
        expect(impression.once.bind(impression, `leave`)).to.throw(`impression: event not accepted: leave`);
        impression.detach();
        done();
    });

    it('should able to trigger once', (done) => {
        const SELECTOR4 = '[data-impression-unique-id="4"]';
        const impression = new Impression({
            container: document.body,
            tolerance: 0,
            debounce: 100,
        });
        let count = 0;
        const callback = () => {
            count++;
        };
        impression.once(eventTypes.BEGIN, SELECTOR4, callback);
        const element4 = document.querySelector(SELECTOR4);
        expect(impression.isViewable(element4)).to.equal(false);
        expect(count).to.equal(0);
        document.body.style.height = '400px';
        const div = document.createElement('div');
        document.body.appendChild(div);
        document.body.removeChild(div);
        setTimeout(() => {
            expect(count).to.equal(1);
            document.body.style.height = '100px';
            const div = document.createElement('div');
            document.body.appendChild(div);
            document.body.removeChild(div);
            setTimeout(() => {
                expect(count).to.equal(1);
                impression.detach();
                done();
            }, 200);
        }, 200);
    });

    it('should able to off event, selector, callback', (done) => {
        const SELECTOR4 = '[data-impression-unique-id="4"]';
        const impression = new Impression({
            container: document.body,
            tolerance: 0,
            debounce: 100,
        });
        let count = 0;
        const callback = () => {
            count++;
        };
        impression.on(eventTypes.BEGIN, SELECTOR4, callback);
        const element4 = document.querySelector(SELECTOR4);
        expect(impression.isViewable(element4)).to.equal(false);
        expect(count).to.equal(0);
        document.body.style.height = '400px';
        const div = document.createElement('div');
        document.body.appendChild(div);
        document.body.removeChild(div);
        setTimeout(() => {
            expect(count).to.equal(1);
            document.body.style.height = '100px';
            impression.off(eventTypes.BEGIN, SELECTOR4, callback);
            const div = document.createElement('div');
            document.body.appendChild(div);
            document.body.removeChild(div);
            setTimeout(() => {
                expect(count).to.equal(1);
                impression.detach();
                done();
            }, 200);
        }, 200);
    });

    it('should able to off event, selector', (done) => {
        const SELECTOR4 = '[data-impression-unique-id="4"]';
        const impression = new Impression({
            container: document.body,
            tolerance: 0,
            debounce: 100,
        });
        let count = 0;
        const callback = () => {
            count++;
        };
        impression.on(eventTypes.BEGIN, SELECTOR4, callback);
        const element4 = document.querySelector(SELECTOR4);
        expect(impression.isViewable(element4)).to.equal(false);
        expect(count).to.equal(0);
        document.body.style.height = '400px';
        const div = document.createElement('div');
        document.body.appendChild(div);
        document.body.removeChild(div);
        setTimeout(() => {
            expect(count).to.equal(1);
            document.body.style.height = '100px';
            impression.off(eventTypes.BEGIN, SELECTOR4);
            const div = document.createElement('div');
            document.body.appendChild(div);
            document.body.removeChild(div);
            setTimeout(() => {
                expect(count).to.equal(1);
                impression.detach();
                done();
            }, 200);
        }, 200);
    });

    it('should able to off event', (done) => {
        const SELECTOR4 = '[data-impression-unique-id="4"]';
        const impression = new Impression({
            container: document.body,
            tolerance: 0,
            debounce: 100,
        });
        let count = 0;
        const callback = () => {
            count++;
        };
        impression.on(eventTypes.BEGIN, SELECTOR4, callback);
        const element4 = document.querySelector(SELECTOR4);
        expect(impression.isViewable(element4)).to.equal(false);
        expect(count).to.equal(0);
        document.body.style.height = '400px';
        const div = document.createElement('div');
        document.body.appendChild(div);
        document.body.removeChild(div);
        setTimeout(() => {
            expect(count).to.equal(1);
            document.body.style.height = '100px';
            impression.off(eventTypes.BEGIN);
            const div = document.createElement('div');
            document.body.appendChild(div);
            document.body.removeChild(div);
            setTimeout(() => {
                expect(count).to.equal(1);
                impression.detach();
                done();
            }, 200);
        }, 200);
    });

    it('should able to off', (done) => {
        const SELECTOR4 = '[data-impression-unique-id="4"]';
        const impression = new Impression({
            container: document.body,
            tolerance: 0,
            debounce: 100,
        });
        let count = 0;
        const callback = () => {
            count++;
        };
        impression.on(eventTypes.BEGIN, SELECTOR4, callback);
        const element4 = document.querySelector(SELECTOR4);
        expect(impression.isViewable(element4)).to.equal(false);
        expect(count).to.equal(0);
        document.body.style.height = '400px';
        const div = document.createElement('div');
        document.body.appendChild(div);
        document.body.removeChild(div);
        setTimeout(() => {
            expect(count).to.equal(1);
            document.body.style.height = '100px';
            impression.off();
            const div = document.createElement('div');
            document.body.appendChild(div);
            document.body.removeChild(div);
            setTimeout(() => {
                expect(count).to.equal(1);
                impression.detach();
                done();
            }, 200);
        }, 200);
    });

    it('should able to emit end', (done) => {
        const SELECTOR4 = '[data-impression-unique-id="4"]';
        const impression = new Impression({
            container: document.body,
            tolerance: 0,
            debounce: 100,
        });
        let countBegin = 0;
        const callbackBegin = () => {
            countBegin++;
        };
        let countEnd = 0;
        const callbackEnd = () => {
            countEnd++;
        };
        impression.on(eventTypes.BEGIN, SELECTOR4, callbackBegin);
        impression.on(eventTypes.END, SELECTOR4, callbackEnd);
        const element4 = document.querySelector(SELECTOR4);
        expect(impression.isViewable(element4)).to.equal(false);
        expect(countBegin).to.equal(0);
        expect(countEnd).to.equal(0);
        document.body.style.height = '400px';
        const div = document.createElement('div');
        const container = document.querySelector('.container');
        div.setAttribute('data-impression-unique-id', 4);
        div.setAttribute('class', 'element');
        container.appendChild(div);
        setTimeout(() => {
            expect(countBegin).to.equal(1);
            expect(countEnd).to.equal(0);
            document.body.style.height = '100px';
            container.removeChild(element4);
            setTimeout(() => {
                expect(countBegin).to.equal(1);
                expect(countEnd).to.equal(1);
                impression.detach();
                done();
            }, 200);
        }, 200);
    });

    it('should able to detach observers', (done) => {
        const impression = new Impression({
            container: document.body,
            tolerance: 0,
            debounce: 100,
        });
        let count = 0;
        const callback = () => {
            count++;
        };
        impression.onObservers(observerTypes.MUTATION, callback);
        expect(count).to.equal(0);
        const div = document.createElement('div');
        document.body.appendChild(div);
        setTimeout(() => {
            expect(count).to.equal(1);
            document.body.removeChild(div);
            impression.detach();
            done();
        }, 200);
    });

    it('should able to detach observers once', (done) => {
        const impression = new Impression({
            container: document.body,
            tolerance: 0,
            debounce: 100,
        });
        let count = 0;
        const callback = () => {
            count++;
        };
        impression.onceObservers(observerTypes.MUTATION, callback);
        expect(count).to.equal(0);
        const div = document.createElement('div');
        document.body.appendChild(div);
        setTimeout(() => {
            expect(count).to.equal(1);
            document.body.removeChild(div);
            setTimeout(() => {
                expect(count).to.equal(1);
                impression.detach();
            }, 200);
            done();
        }, 200);
    });

    it('should throw error when attached event is not accepted', (done) => {
        const impression = new Impression({
            container: document.body,
            tolerance: 0,
            debounce: 100,
        });
        expect(impression.onObservers.bind(impression, `enter`)).to.throw(`impression: event not accepted: enter`);
        expect(impression.onceObservers.bind(impression, `leave`)).to.throw(`impression: event not accepted: leave`);
        impression.detach();
        done();
    });

    it('should able to off event, callback', (done) => {
        const impression = new Impression({
            container: document.body,
            tolerance: 0,
            debounce: 100,
        });
        let count = 0;
        const callback = () => {
            count++;
        };
        impression.onObservers(observerTypes.MUTATION, callback);
        expect(count).to.equal(0);
        impression.offObservers(observerTypes.MUTATION, callback);
        expect(count).to.equal(0);
        const div = document.createElement('div');
        document.body.appendChild(div);
        setTimeout(() => {
            expect(count).to.equal(0);
            document.body.removeChild(div);
            impression.detach();
            done();
        }, 200);
    });

    it('should able to off event, callback', (done) => {
        const impression = new Impression({
            container: document.body,
            tolerance: 0,
            debounce: 100,
        });
        let count = 0;
        const callback = () => {
            count++;
        };
        impression.onObservers(observerTypes.MUTATION, callback);
        expect(count).to.equal(0);
        impression.offObservers(observerTypes.MUTATION);
        expect(count).to.equal(0);
        const div = document.createElement('div');
        document.body.appendChild(div);
        setTimeout(() => {
            expect(count).to.equal(0);
            document.body.removeChild(div);
            impression.detach();
            done();
        }, 200);
    });

    it('should able to off event, callback', (done) => {
        const impression = new Impression({
            container: document.body,
            tolerance: 0,
            debounce: 100,
        });
        let count = 0;
        const callback = () => {
            count++;
        };
        impression.onObservers(observerTypes.MUTATION, callback);
        expect(count).to.equal(0);
        impression.offObservers();
        expect(count).to.equal(0);
        const div = document.createElement('div');
        document.body.appendChild(div);
        setTimeout(() => {
            expect(count).to.equal(0);
            document.body.removeChild(div);
            impression.detach();
            done();
        }, 200);
    });

    it('should able to scan elements', (done) => {
        const impression = new Impression({
            container: document.body,
            tolerance: 0,
            debounce: 100,
        });
        let count = 0;
        const SELECTOR = '[data-impression-unique-id]';
        impression.on('begin', SELECTOR, () => {
            count++;
        });
        impression.scan();
        setTimeout(() => {
            expect(count).to.equal(Array.prototype.filter.call(document.querySelectorAll(SELECTOR), (el) => {
                return impression.isViewable(el);
            }).length);
            impression.detach();
            done();
        }, 200);
    });
});
