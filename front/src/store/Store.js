import PubSub from './PubSub';
import StoreKeeper from './StoreKeeper';

const STORAGE_KEY = process.env.STORAGE_KEY;

export default class Store {
    // static STATUSES = 
    // static events name
    constructor({ mutations = {}, actions = {}, state = {} }) {
        this.status = 'resting';
        this.mutations = mutations;
        this.actions = actions;
        this.storeKeeper = new StoreKeeper();
        this.events = new PubSub();
        this.state = null;

        this._init(state);
    }

    _init(state) {
        this._writeState(state, this.storeKeeper.getStateFromStorage());

        this.storeKeeper.encryptStore(this.state);

        this.events.subscribe('stateChange', this.storeKeeper.encryptStore);

        window.addEventListener('load', this.storeKeeper.saveStateToStorage);

        window.addEventListener('beforeunload', this.storeKeeper.getStateFromStorage);
    }

    dispatch(actKey, payload) {
        console.log("dispatch -> actKey", actKey)

        console.log("dispatch -> typeof this.actions[actKey]", typeof this.actions[actKey])
        if (typeof this.actions[actKey] !== 'function') {
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

    _writeState(initState, stateFromStorage) {
        this.state = new Proxy({...initState, ...stateFromStorage}, {
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
        });
    }

}