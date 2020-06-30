import BaseComponent from '$/components/1BaseComponent/BaseComponent';

export default class PageLayout extends BaseComponent {
    static nodeName = 'page-layout';

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = this.render();
    }

    render() {
        return (`
            <section class="page-layout">
                <main class="page-layout__main">
                    this.innerHTML
                </main>
            </section>
        `);
    }
}
