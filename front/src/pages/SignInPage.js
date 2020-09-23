import BaseComponent from '@/components/1BaseComponent/BaseComponent';

export default class SignInPage extends BaseComponent {
    static nodeName = 'sign-in-page';

    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
    }

    render() {
        return `
            <main class="sign-in-page container">
                <sign-in-form></sign-in-form>

                <custom-button tag="a" 
                        value="back" 
                        url="/"
                        color-class="first">
                </custom-button>
            </main>
        `
    }
}