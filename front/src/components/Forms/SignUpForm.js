import BaseComponent from '$/components/1BaseComponent/BaseComponent';
import { isEmpty } from 'utils';
import axios from 'axios';

export default class SignUpForm extends BaseComponent {
    static nodeName = 'sign-up-form'

    constructor() {
        super();
        this.name = 'sigUpForm';
        this.emptyFieldErrorText = 'This field is required';
        this.passwordsNotEqualErrorText = 'Passwords doesn\'t equal'
    }

    connectedCallback() {
        super.connectedCallback();

        this.$(`#${this.name}`).addEventListener('submit', (e) => {
            this.collectAndSendData(e);
        });
    }

    collectAndSendData(event) {
        event.preventDefault();
        
        const form = event.target;

        if (!this.isValidData(form)) {
            return;
        }

        const usernameInput = form.elements.username;
        const emailInput = form.elements.email;
        const passwordInput = form.elements.password;

        axios({
            method: 'POST',
            baseURL: 'http://localhost:3000',
            url: '/api/v1/auth/signup',
            headers: { 'Content-Type': 'application/json' },
            data: {
                name: usernameInput.value,
                email: emailInput.value,
                password: passwordInput.value,
                timeout: 1000,
            }
        }).then((response) => {
            console.log(response)
        }).catch(err => console.error(err))
    }

    isValidData(form) {
        const passwordInput = form.elements.password;
        const passwordInput2 = form.elements.repeat_password;
        const inputsArr = [...form.elements].filter((formEl) => formEl.tagName === 'INPUT');

        if (inputsArr.some((input) => isEmpty(input.value))) {
            inputsArr.forEach((input) => {
                if (isEmpty(input.value)) {
                    input.parentElement.setAttribute('error-text', this.emptyFieldErrorText);
                }
            });

            return false;
        }

        if (passwordInput.value !== passwordInput2.value) {
            [passwordInput, passwordInput2].forEach((input) => {
                input.parentElement.setAttribute('error-text', this.passwordsNotEqualErrorText);
            })

            return false;
        }

        return true;
    }

    render() {
        return `
            <form id="${this.name}" class="sign-up-form__form" autocomplete="off" novalidate>
                <section class="sign-up-form__container">
                    <h3 class="sign-up-form__headline">
                        Sign up
                    </h3>

                    <custom-input class="sing-up-form__input"
                            name="username" 
                            type="text"
                            placeholder="James Bond"
                            label="Username"
                            form="${this.name}"
                            required>
                    </custom-input>

                    <custom-input class="sing-up-form__input"
                            name="email" 
                            type="text"
                            placeholder="007@mi6.com"
                            label="Email"
                            form="${this.name}"
                            required>
                    </custom-input>

                    <custom-input class="sing-up-form__input"
                            name="password" 
                            type="password"
                            placeholder="Super secret password"
                            label="Password"
                            form="${this.name}"
                            required>
                    </custom-input>

                    <custom-input class="sing-up-form__input"
                            name="repeat_password" 
                            type="password"
                            placeholder="Super secret password again"
                            label="Repeat password"
                            form="${this.name}"
                            required>
                    </custom-input>
                    
                    <custom-button class="sing-up-form__btn"
                            tag="button" 
                            form="${this.name}"
                            value="SignUp" 
                            color-class="second">
                            type="submit"
                    </custom-button>
                </section>
            </form>
        `
    }
}
