import BaseComponent from '@/components/1BaseComponent/BaseComponent';

export default class SignInForm extends BaseComponent {
    static nodeName = 'sign-in-form'

    constructor() {
        super();
        this.name = 'sigInForm'


        this.innerHTML = this.render();
        
        this.$('form').addEventListener('submit', (e) => {
            e.preventDefault();
            console.log(e.target.elements.username.value)
        });
    }

    connectedCallback() {
        super.connectedCallback();
    }

    render() {
        return `
            <form id="${this.name}" class="sign-in-form__form" novalidate autocomplete="off">
                <section class="sign-in-form__container">
                    <custom-title class="sign-in-form__headline" lvl="2" value="Sign in" decore></custom-title>

                    <custom-input class="sign-in-form__input"
                            name="username" 
                            type="text"
                            placeholder="James Bond"
                            label="Username"
                            form="${this.name}"
                            required>
                    </custom-input>

                    <custom-input class="sign-in-form__input  sign-in-form__input--m-bott"
                            name="password" 
                            type="password"
                            placeholder="Password"
                            label="Password"
                            form="${this.name}"
                            required>
                    </custom-input>
                    
                    <custom-button tag="button" 
                            form="${this.name}"
                            type="submit"
                            value="Sign In" 
                            color-class="second">
                    </custom-button>
                </section>
            </form>
        `
    }
}
