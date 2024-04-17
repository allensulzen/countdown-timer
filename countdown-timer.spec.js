require('@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js');
require('@webcomponents/webcomponentsjs/webcomponents-bundle.js');
require('./countdown-timer.js');

const testProps = { // date is in the future
    date: new Date(Date.now() + 7 * 24 * 60 * 60 *  1000).toISOString(),
    heading: 'My countdown timer',
    subheading: 'My subheading',
    theme: 'dark',
    link: 'https://example.com',
    linktext: 'Click here',
    message: 'My message',
};

const testProps2 = { // date is in the past
    date: new Date(Date.now() - 7 * 24 * 60 * 60 *  1000).toISOString(),
    heading: 'My countdown timer',
    subheading: 'My subheading',
    theme: 'light',
    link: 'https://example.com',
    linktext: 'Click here',
    message: 'My message',
};

const testProps3 = { // date is not an iso string
    date: 'not an iso string',
    heading: 'My countdown timer',
    subheading: 'My subheading',
    theme: 'light',
    link: 'https://example.com',
    linktext: 'Click here',
    message: 'My message',
};

const applyProps = (element, props) => {
    for(let prop in props) {
        element.setAttribute(prop, props[prop]);
    }
};

describe('CountdownTimer', () => {
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

        const updateTimer = new Promise(resolve => element.addEventListener('updateTimer', resolve));
        await updateTimer;

        expect(element.querySelectorAll('.countdown-timer__content__counter').length).toBe(4);
    });

    it('should render a message', async () => {
        applyProps(element, testProps2);

        const updateTimer = new Promise(resolve => element.addEventListener('updateTimer', resolve));
        await updateTimer;

        expect(element.querySelector('.countdown-timer__title h2').innerHTML).toBe(testProps2.message);
    });

    it('should render a link', async () => {
        applyProps(element, testProps2);

        const updateTimer = new Promise(resolve => element.addEventListener('updateTimer', resolve));
        await updateTimer;

        expect(element.querySelector('.countdown-timer__label a').innerHTML).toBe(testProps2.linktext);
        expect(element.querySelector('.countdown-timer__label a').getAttribute('href')).toBe(testProps2.link);
    });

    it('should throw an error if date is not an iso string', async () => {
        const stopTimer = jest.spyOn(element, 'stopTimer');
        applyProps(element, testProps3);

        expect(() => element.connectedCallback()).toThrow('Invalid date');
        expect(stopTimer).toHaveBeenCalled();
    });
});
