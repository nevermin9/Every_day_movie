import BaseComponent from '$/components/1BaseComponent/BaseComponent';

export default class SignInPage extends BaseComponent {
    static nodeName = 'sign-in-page';

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = this.render();
    }

    render() {
        return `
            <main class="sign-in-page">
                singin page

                <sign-in-form></sign-in-form>
            </main>
        `
    }
}