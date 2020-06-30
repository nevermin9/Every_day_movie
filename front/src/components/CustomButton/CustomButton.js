import BaseComponent from '$/components/1BaseComponent/BaseComponent';

export default class CustomButton extends BaseComponent {
    static nodeName = 'custom-button';

    constructor() {
        super();
        this.tag = null;
        this.colorClass = null;
        this.url = null;
        this.value = '';
    }

    connectedCallback() {
        this.innerHTML = this.render();
        this.setUrl();
    }

    static get observedAttributes() {
        return ['tag', 'value', 'colorClass', 'url'];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        switch(attrName) {
            case 'tag':
                this.tag = newVal;
                break;
            case 'value':
                this.value = newVal;
                break;
            case 'colorClass':
                this.colorClass = newVal;
                break;
            case 'url':
                this.url = newVal;
                break;
        }
    }

    setUrl() {
        if (this.tag === 'a' && this.url !== null) {
            this.$('a').setAttribute('href', this.url);
        } else if (this.tag === 'a') {
            throw new Error('set url for link');
        }
    }

    render() {
        return `
            <${this.tag} class="btn btn--${this.colorClass}">
                ${this.value}
            </${this.tag}>
        `
    }

}