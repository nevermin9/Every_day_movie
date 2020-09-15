import BaseComponent from '@/components/1BaseComponent/BaseComponent';

export default class CustomTitle extends BaseComponent {
    static nodeName = 'custom-title'

    constructor() {
        super();
        this.lvl = '';
        this.value = '';
    }

    connectedCallback() {
        this.innerHTML = this.render();
    }

    static get observedAttributes() {
        return ['lvl', 'value'];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        switch(attrName) {
            case 'lvl':
                this.lvl = newVal;
                break;
            case 'value':
                this.value = newVal;
                break;
        }
    }

    render() {
        return `
            <h${this.lvl} class="custom-title custom-title--${this.lvl}">
                ${this.value}
            </h${this.lvl}>
        `
    }

}