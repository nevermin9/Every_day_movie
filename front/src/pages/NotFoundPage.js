import BaseComponent from '@/components/1BaseComponent/BaseComponent';

export default class NotFoundPage extends BaseComponent {
    static nodeName = 'not-found-page';

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = this.render();
    }

    render() {
        return `
            <h1>404 not found !</h1>
        `;
    }
}