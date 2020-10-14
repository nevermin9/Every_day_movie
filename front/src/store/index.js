import { signUpUser } from 'api';
import Store from './Store';


const store = {
    state: {
        userToken: '',
    },
    mutations: {
        setUserToken(state, { data }) {
            state.userToken = data.token;
            console.log('from mutation', state)
        },
    },
    actions: {
        signUpUser(context, { name, email, password }) {
            return signUpUser({ data: { name, email, password, } }).then(response => {
                console.log("signUpUser -> response", response)
                if (response.status === 'success') {
                    context.commit('setUserToken', { data: response.data });
                } 
            }).catch(err => {
                console.log('SignUp error: ', err);
            });
        }
    }
}

export default new Store(store);