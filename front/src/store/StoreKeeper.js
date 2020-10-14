import AES from 'crypto-js/aes';
import EncUtf8 from 'crypto-js/enc-utf8'

const SECRET_KEY = process.env.SECRET_KEY;
const STORAGE_KEY = process.env.STORAGE_KEY;

export default class StoreKeeper {
    constructor(storeObj) {
        this.cryptoStore = '';
    }

    saveStateToStorage() {
        window.localStorage.setItem(STORAGE_KEY, this.cryptoStore);
    }

    getStateFromStorage() {
        return window.localStorage.getItem(STORAGE_KEY) || {};
    }

    encryptStore(state) {
        this.cryptoStore = AES.encrypt(JSON.stringify(state), SECRET_KEY).toString();

        return this;
    }

    decryptStore(str) {
        return JSON.parse(AES.decrypt(str, SECRET_KEY).toString(EncUtf8));
    }
}