class MyElement extends HTMLElement {
    constructor() {
        // for listeners and init state
        // we have no access to children and attributes
        super();
        this.redered = false;
        console.log('from constructor')
    }

    render() {
        let date = new Date();
        this.innerHTML = new Intl.DateTimeFormat("default", {
            year: this.getAttribute('year') || undefined,
            month: this.getAttribute('month') || undefined,
            day: this.getAttribute('day') || undefined,
            hour: this.getAttribute('hour') || undefined,
            minute: this.getAttribute('minute') || undefined,
            second: this.getAttribute('second') || undefined,
            timeZoneName: this.getAttribute('time-zone-name') || undefined,
        }).format(date);
    }

    static get attributes() {
        return {
            enabled: 'enabled',
        }
    }

    connectedCallback() {
        //rendering and fetching resources
        //set attributes, fetch resources, run set up code or render templates.
        console.log('from connected')
        if (!this.redered) {
            this.render();
            this.redered = true;
        }
    }

    disconnectedCallback() {
        console.log('i am disconnected');
    }

    static get observedAttributes() {
        return ['time'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        console.log('from attribute observer')
        this.render();
    }

    adoptedCallback() {
        return;
    }

    //... and more
}

customElements.define('my-element', MyElement);
// setInterval(() => {
//     const myElement = document.querySelector('.my-element');
//     myElement.setAttribute('time', new Date());
// }, 1000);
