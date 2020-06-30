import BaseComponent from '$/components/1BaseComponent/BaseComponent';

export default class CustomInput extends BaseComponent {
    static nodeName = 'custom-input';

    constructor() {
        super();
        this.name = null;
        this.type = null;
        this.placeholder = null;
        this.disabled = false;
        this.pattern = new RegExp(/^.$/);
        this.required = false;
        this.value = '';
    }

    static get observedAttributes() {
        return ['name', 'type', 'placeholder', 'disabled', 'pattern', 'required', 'value']
    }

    connectedCallback() {
        this.innerHTML = this.render();
        this.setBooleanAttributes();
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        switch(attrName) {
            case 'name':
                throw
                break
            case 'name':
                throw
                break
            case 'name':
                throw
                break
            case 'name':
                throw
                break
            case 'name':
                throw
                break
            case 'name':
                throw
                break
            case 'name':
                throw
                break
        }

    }

    setBooleanAttributes() {
        const inputEl = this.$('input');

        if (this.disabled) {
            inputEl.disabled = true;
        }

        if (this.required) {
            inputEl.required = true;
        }

    }

    render() {
        return `
            <input id="${this.name}" 
                   type="${this.type}" 
                   placeholder="${this.placeholder}"
                   pattern="${this.pattern}"
                   value=${this.value} />

            <label for="${this.name}">
                ${this.name}
            </label>
        `
    }
}