import BaseComponent from '$/components/1BaseComponent/BaseComponent';
import { isEmpty } from 'util';

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
        this.form = null;
        this.label = '';
    }

    static get observedAttributes() {
        return ['name', 'type', 'placeholder', 'form', 'disabled', 'pattern', 'required', 'value', 'error-text', 'label']
    }

    connectedCallback() {
        super.connectedCallback();
        this.setBooleanAttributes();
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        switch(attrName) {
            case 'name':
                this.name = newVal;
                break;
            case 'type':
                this.type = newVal;
                break;
            case 'placeholder':
                this.placeholder = newVal;
                break;
            case 'required':
                this.required = true;
                break;
            case 'value':
                this.value = newVal;
                break;
            case 'form':
                this.form = newVal;
                break;
            case 'error-text':
                this.errorText = newVal;
                break;
            case 'label':
                this.label = newVal;
                break;
        }
    }

    set errorText(newVal) {
        const errorContainer = this.$('.js-error-text');
        errorContainer.innerHTML = '';
        errorContainer.append(newVal);
    }

    get errorText() {
        const errorContainer = this.$('js-error-text');
        return errorContainer.innerHTML;
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
                   class="custom-input__input" 
                   name="${this.name}"
                   type="${this.type}" 
                   placeholder="${this.placeholder}"
                   pattern="${this.pattern}"
                   value="${this.value}"
                   form="${this.form}" />
            
            <span class="custom-input__error-text js-error-text"></span>

            <label class="custom-input__label" for="${this.name}">
                ${this.label}
            </label>
        `
    }
}