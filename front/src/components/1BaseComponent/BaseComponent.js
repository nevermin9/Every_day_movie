export default class BaseComponents extends HTMLElement {
    constructor() {
        super();
        this.rendered = false;
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
}