import BaseComponent from '@/components/1BaseComponent/BaseComponent';
import { isEmpty } from 'utils';
import { signUpUser } from 'api';

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
        console.log(this.$store);
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

        this.$store.dispatch('signUpUser', {
            name: usernameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
        })
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
                    <custom-title class="sign-up-form__headline" lvl="2" value="Sign up"></custom-title>

                    <custom-input class="sign-up-form__input"
                            name="username" 
                            type="text"
                            placeholder="James Bond"
                            label="Username"
                            form="${this.name}"
                            required>
                    </custom-input>

                    <custom-input class="sign-up-form__input"
                            name="email" 
                            type="text"
                            placeholder="007@mi6.com"
                            label="Email"
                            form="${this.name}"
                            required>
                    </custom-input>

                    <custom-input class="sign-up-form__input"
                            name="password" 
                            type="password"
                            placeholder="Super secret password"
                            label="Password"
                            form="${this.name}"
                            required>
                    </custom-input>

                    <custom-input class="sign-up-form__input  sign-up-form__input--m-bott"
                            name="repeat_password" 
                            type="password"
                            placeholder="Super secret password again"
                            label="Repeat password"
                            form="${this.name}"
                            required>
                    </custom-input>
                    
                    <custom-button class="sign-up-form__btn"
                            tag="button" 
                            form="${this.name}"
                            value="Sign Up" 
                            color-class="second">
                            type="submit"
                    </custom-button>
                </section>
            </form>
        `
    }
}
