import PubSub from './lib/pubsub';

export default class Store {
    // static STATUSES = 
    constructor({ mutations = {}, actions = {}, state = {} }) {
        this.status = 'resting';
        this.mutations = mutations;
        this.actions = actions;
        this.events = new PubSub();
        this.state = new Proxy(state, {
            set: (state, key, value) => {
                state[key] = value;

                console.log(`stateChange: ${key}: ${value}`);

                this.events.publish('stateChange', this.state);

                if (this.status !== 'mutation') {
                    console.warn(`You should use mutation to set ${key}`);
                }

                this.status = 'resting';

                return true;
            } 
        })
    }

    dispatch(actKey, payload) {
        if (typeof this.actions[actKey] !== 'fucntion') {
            console.error(`Action ${actKey} doesnt exist`);
            return false;
        }

        console.groupCollapsed(`ACTION ${actKey}`);

        this.status = 'action'

        this.actions[actKey](this, payload);

        console.groupEnd();

        return true;
    }

    commit(mutKey, payload) {
        if (typeof this.mutations[mutKey] !== 'function') {
            console.error(`Mutation ${actKey} doesnt exist`);
            return false;
        }

        this.status = 'mutation';

        let newState = this.mutations[mutKey](this.state, payload);

        this.state = Object.assign(this.state, newState);

        return true;
    }
}