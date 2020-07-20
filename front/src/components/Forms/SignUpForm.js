import BaseComponent from '$/components/1BaseComponent/BaseComponent';

export default class SignUpForm extends BaseComponent {
    static nodeName = 'sign-up-form'

    constructor() {
        super();
        this.name = 'sigUpForm'
    }

    connectedCallback() {
        this.innerHTML = this.render();
    }

    render() {
        return `
            <form id="${this.name}">
                <fieldset>
                    <legend> Sign up </legend>

                    <custom-input name="Username" 
                            type="text"
                            placeholder="Username"
                            form="${this.name}"
                            required>
                    </custom-input>

                    <custom-input name="Email" 
                            type="text"
                            placeholder="Email"
                            form="${this.name}"
                            required>
                    </custom-input>

                    <custom-input name="Password" 
                            type="password"
                            placeholder="Password"
                            form="${this.name}"
                            required>
                    </custom-input>

                    <custom-input name="Repeat password" 
                            type="password"
                            placeholder="Repeat password"
                            form="${this.name}"
                            required>
                    </custom-input>
                    
                    <custom-button tag="button" 
                            form="${this.name}"
                            value="SignUp" 
                            color-class="second">
                    </custom-button>
                </fieldset>
            </form>
        `
    }
}
