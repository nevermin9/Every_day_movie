import BaseComponent from '@/components/1BaseComponent/BaseComponent';

export default class CustomTitle extends BaseComponent {
    static nodeName = 'custom-title'

    constructor() {
        super();
        this.lvl = '';
        this.value = '';
        this.decore = false;
    }

    connectedCallback() {
        super.connectedCallback();
    }

    static get observedAttributes() {
        return ['lvl', 'value', 'decore'];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        switch(attrName) {
            case 'lvl':
                this.lvl = newVal;
                break;
            case 'value':
                this.value = newVal;
                break;
            case 'decore':
                this.decore = true;
                break;
        }
    }

    render() {
        return `
            <h${this.lvl} class="custom-title custom-title--${this.lvl} ${this.decore ? 'custom-title--decore' : ''}">
                ${this.value}
            </h${this.lvl}>
        `
    }
}