export default class PubSub {
    constructor() {
        this.events = {};
    }

    subscribe(event, cb) {
        if (!this.events.hasOwnProperty(event)) {
            this.events[event] = [];
        }

        return this.events[event].push(cb);
    }

    publish(event, data = {}) {
        console.log("PubSub -> publish -> event", event)
        console.log("PubSub -> publish -> this.events", this.events)
        console.log(Object.keys(this.events).includes(event))
        console.log(Object.keys(this.events).indexOf(event))
        if (!this.events.hasOwnProperty(event)) {
            console.log('there is no such event')
            return [];
        }

        console.log("PubSub -> publish -> this.events", this.events)
        return this.events[event].map(cb => cb(data));
    }
}
