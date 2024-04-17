require('@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js');
require('@webcomponents/webcomponentsjs/webcomponents-bundle.js');
require('./countdown-timer.js');

describe('MyComponent', () => {
    let element;

    beforeEach(() => {
        element = document.createElement('countdown-timer');
        document.body.appendChild(element);
    });

    afterEach(() => {
        document.body.removeChild(element);
        element = null;
    });

    it('should render a heading', () => {
        element.heading = 'My countdown timer';
        element.date = new Date().getTime() + 10000;

        setTimeout(() => {
            expect(element.querySelector('.countdown-timer__title').innerText).toBe('My countdown timer');
        }, 2000);
    });

    // it('should update properties when attributes change', () => {
    //     element.setAttribute('some-attribute', 'new value');
    //     expect(element.someProperty).toBe('new value');
    // });
});
