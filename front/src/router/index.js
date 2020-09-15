import Router from './Router';
import MainPage from '@/pages/MainPage';
import NotFoundPage from '@/pages/NotFoundPage';
import SignInPage from '@/pages/SignInPage'

const routes = [
    {
        name: 'MainPage',
        path: '/',
        component: MainPage,
    },
    {
        name: 'SignInPage',
        path: '/signin',
        component: SignInPage,
    },
    {
        name: '404',
        component: NotFoundPage,
    }
];


export const router = new Router({
    root: '/',
    routes,
}).listen();

export default {
    router
};

