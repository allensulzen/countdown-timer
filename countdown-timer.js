class CountdownTimer extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['date', 'heading', 'subheading', 'theme'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this[name] = newValue;
            this.render();
        }
    }

    connectedCallback() {
        this.render();
        this.startTimer();
    }

    disconnectedCallback() {
        this.stopTimer();
    }

    generateContent(days, hours, minutes, seconds) {
        return `
            <div class="countdown-timer theme--${this.theme}">
                ${this.heading ? `
                <div class="countdown-timer__title">
                    <h2>${this.heading}</h2>
                </div>
                ` : ''}
                <div class="countdown-timer__content">
                    ${days > 0 ? `
                        <div class="countdown-timer__content__counter days">
                            <span class="figure">${days}</span>
                            <span class="label">${days !== 1 ? 'days' : 'day'}</span>
                        </div>
                    `: ''}
                    ${days > 0 || hours > 0 ? `
                        <div class="countdown-timer__content__counter hours">
                            <span class="figure">${hours}</span>
                            <span class="label">${hours !== 1 ? 'hours' : 'hour'}</span>
                        </div>
                    `: ''}
                    ${days > 0 || hours > 0 || minutes > 0 ? `
                        <div class="countdown-timer__content__counter minutes">
                            <span class="figure">${minutes}</span>
                            <span class="label">${minutes !== 1 ? 'minutes' : 'minute'}</span>
                        </div>
                    `: ''}
                    ${days > 0 || hours > 0 || minutes > 0 || seconds > 0 ? `
                        <div class="countdown-timer__content__counter seconds">
                            <span class="figure">${seconds}</span>
                            <span class="label">${seconds !== 1 ? 'seconds' : 'second'}</span>
                        </div>
                    `: ''}
                </div>
                ${this.subheading ? `
                <div class="countdown-timer__label">
                    <span>${this.subheading}</span>
                </div>
                ` : ''}
            </div>
        `;
    }

    stopTimer() {
        clearInterval(this.timerInterval);
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            const endTime = new Date(this.date);
            const currentTime = new Date();
            const timeRemaining = endTime - currentTime;

            if (timeRemaining <= 0) {
                this.stopTimer();
                this.innerHTML = 'Countdown finished!';
                return;
            }

            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            this.querySelector('.ct__container').innerHTML = this.generateContent(days, hours, minutes, seconds);
        }, 1000);
    }

    render() {
        this.innerHTML = `
            <style>
                .countdown-timer__title {
                    text-align: center;
                    font-family: inherit;
                }

                .countdown-timer__content {
                    display: flex;
                    flex-direction: row;
                    gap: 0.5rem;
                    justify-content: center;
                    align-items: center;
                    font-family: inherit;
                    min-height: 74px;
                }

                .countdown-timer__content .figure {
                    font-size: 28px;
                    font-weight: bold;
                    font-family: inherit;
                }

                .countdown-timer__content__counter {
                    position: relative;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    background-color: #fff;
                    padding: 1rem;
                    min-width: 50px;
                    text-align: center;
                    padding-bottom: 1.5rem;
                    font-family: inherit;
                }

                .countdown-timer__content__counter .label {
                    position: absolute;
                    left: 0;
                    right: 0;
                    margin: auto;
                    bottom: 0.5rem;
                    font-size: 12px;
                    text-align: center;
                    font-family: inherit;
                }

                .countdown-timer__label {
                    text-align: center;
                    margin-top: 1rem;
                    font-family: inherit;
                }

                .countdown-timer.theme--dark .countdown-timer__content__counter {
                    background-color: #000;
                    color: #fff;
                    border-color: #ccc;
                }

                .countdown-timer.theme--dark .countdown-timer__title {
                    color: white;
                }

                .countdown-timer.theme--dark .countdown-timer__label {
                    color: white;
                }

                @media only screen and (max-width: 386px) {
                    .countdown-timer__content__counter {
                        min-width: 40px;
                    }

                    .countdown-timer__content__counter .figure {
                        font-size: 16px;
                    }
                }

                @media only screen and (max-width: 346px) {
                    .countdown-timer__content__counter {
                        min-width: 23px;
                    }
                }
            </style>
            <div class="ct__container">
                ${this.generateContent()}
            </div>
        `;
    }
}

customElements.define('countdown-timer', CountdownTimer);