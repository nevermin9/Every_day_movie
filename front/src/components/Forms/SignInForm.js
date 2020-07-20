import BaseComponent from '$/components/1BaseComponent/BaseComponent';

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
    }

    render() {
        return `
            <form id="${this.name}">
                <fieldset>
                    <legend> Sign in </legend>

                    <custom-input name="username" 
                            type="text"
                            placeholder="Username"
                            form="${this.name}"
                            required>
                    </custom-input>

                    <custom-input name="password" 
                            type="password"
                            placeholder="Password"
                            form="${this.name}"
                            required>
                    </custom-input>
                    
                    <custom-button tag="button" 
                            form="${this.name}"
                            type="submit"
                            value="SignIn" 
                            colorClass="first">
                    </custom-button>
                </fieldset>
            </form>
        `
    }
}
