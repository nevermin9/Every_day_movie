import AES from 'crypto-js/aes';
import EncUtf8 from 'crypto-js/enc-utf8'

const SECRET_KEY = process.env.SECRET_KEY;
const STORAGE_KEY = process.env.STORAGE_KEY;

export default class StoreKeeper {
    constructor() {
        this.cryptoStore = '';
    }

    getStateFromStorage() {
        const encryptedStore = window.localStorage.getItem(STORAGE_KEY);
        if (encryptedStore && encryptedStore !== 'undefined') {
            return this._decryptStore(encryptedStore);
        } else {
            return {};
        }
    }

    encryptStore(state) {
        console.log("StoreKeeper -> encryptStore -> state", state)
        this.cryptoStore = AES.encrypt(JSON.stringify(state), SECRET_KEY).toString();
        this._saveStateToStorage();

        return this;
    }

    _saveStateToStorage() {
        window.localStorage.setItem(STORAGE_KEY, this.cryptoStore);
    }

    _decryptStore(str) {
        return JSON.parse(AES.decrypt(str, SECRET_KEY).toString(EncUtf8));
    }
}
