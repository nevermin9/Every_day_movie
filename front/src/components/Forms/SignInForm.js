import BaseComponent from '$/components/1BaseComponent/BaseComponent';

export default class SignInForm extends BaseComponent {
    static nodeName = 'sign-in-form'

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = this.render();
    }

    render() {
        return `
            <custom-input name="username" 
                          type="text"
                          placeholder="Username"
                          required>
            </custom-input>
        `
    }
}
