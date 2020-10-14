import store from '@/store';

export default class BaseComponent extends HTMLElement {
    constructor() {
        super();
        this.rendered = false;
        this.$store = store;
        // this.$router = router;
        // this.eventList = {};
    }

    static get is() {
        return this.nodeName;
    }

    $(selector) {
        return this.querySelector(selector);
    }

    $$(selector) {
        return this.querySelectorAll(selector);
    }

    connectedCallback() {
        if (!this.rendered) {
            this.innerHTML = this.render();
            this.rendered = true;
        }
    }

    // fireEvent(eventKey) {
    //     if (this.eventList.hasOwnProperty(eventKey)) {
    //         this.dispatchEvent(this.eventList[eventKey]);
    //         return;
    //     }

    //     this.dispatchEvent(new Event(eventKey));
    // }

    // set events(newEventObj) {
    //     const {name, key = false, bubbles = true, detail = {}} = newEventObj;
    //     const eventKey = key || name;

    //     if (this.eventList.hasOwnProperty(eventKey)) {
    //         console.error('There is such event');
    //         return;
    //     }

    //     this.eventList[eventKey] = new CustomEvent(name, {bubbles, detail});
    // }
    render() {
        return ``;
    }
}
