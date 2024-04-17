require('@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js');
require('@webcomponents/webcomponentsjs/webcomponents-bundle.js');
require('./countdown-timer.js');

const testProps = {
    date: new Date(Date.now() + 7 * 24 * 60 * 60 *  1000).toISOString(),
    heading: 'My countdown timer',
    subheading: 'My subheading',
    theme: 'dark',
    link: 'https://example.com',
    linktext: 'Click here',
    message: 'My message',
}

const applyProps = (element, props) => {
    for(let prop in props) {
        element.setAttribute(prop, props[prop]);
    }
};

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
        applyProps(element, testProps);

        expect(element.querySelector('.countdown-timer__title h2').innerHTML).toBe(testProps.heading);
    });

    it('should render a subheading', () => {
        applyProps(element, testProps);

        expect(element.querySelector('.countdown-timer__label span').innerHTML).toBe(testProps.subheading);
    });

    it('should render counter cards', async () => {
        applyProps(element, testProps);

        await new Promise(resolve => setTimeout(resolve, 2000));

        expect(element.querySelectorAll('.countdown-timer__content__counter').length).toBe(4);
    });
});
