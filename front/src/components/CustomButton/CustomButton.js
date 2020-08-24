import BaseComponent from '$/components/1BaseComponent/BaseComponent';

export default class CustomButton extends BaseComponent {
    static nodeName = 'custom-button';

    constructor() {
        super();
        this.tag = null;
        this.colorClass = null;
        this.url = null;
        this.value = '';
        this.form = null;
        this.type = null;
    }

    connectedCallback() {
        super.connectedCallback();

        if (this.tag === 'a' && this.url !== null) {
            this.setUrl();
        }

        if (this.tag === 'button' && this.form !== null) {
            this.setFormAndType()
        }
    }

    static get observedAttributes() {
        return ['tag', 'value', 'color-class', 'url', 'form', 'type'];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        switch(attrName) {
            case 'tag':
                this.tag = newVal;
                break;
            case 'value':
                this.value = newVal;
                break;
            case 'color-class':
                this.colorClass = newVal;
                break;
            case 'url':
                this.url = newVal;
                break;
            case 'form':
                this.form = newVal;
            case 'type':
                this.type = newVal;
        }
    }

    setUrl() {
        this.$('.btn').setAttribute('href', this.url);
    }

    setFormAndType() {
        const btn = this.$('.btn');
        btn.setAttribute('form', this.form);
        btn.setAttribute('type', this.type);
    }

    render() {
        return `
            <${this.tag} class="btn btn--${this.colorClass}">
                <svg class="btn__svg-block"
                    version="1.1"
                    baseProfile="full"
                    width="200"
                    height="40"
                    viewBox="0 0 200 40"
                    xmlns="http://www.w3.org/2000/svg">

                    <rect class="btn__rect" x="0" y="0" width="200" height="40" fill="none"/>

                    <text class="btn__text" x="50%" y="50%" alignment-baseline="middle" text-anchor="middle">
                        ${this.value}
                    </text>
                </svg>
            </${this.tag}>
        `
    }

}