import { clearSlashes } from 'utils';
import Route from './Route';

export default class Router {
    constructor({ routes = [], root = '/', appSelector = 'app' }) {
        this.routes = routes.map(route => new Route(route));
        this.root = root; 
        this.current = null;
        this.app = document.getElementById(appSelector);
    }

    go(n) {
        window.history.go(n)
        return this;
    }

    navigateTo(route) {
        const {name, params} = route;
        const index = [...this.routes].map(route => route.name).indexOf(name);

        if (index < 0) {
            this._show404Page();
        }

        const path = this.routes[index].path;

        if (params) {
            for (let [key, val] of Object.entries(params)) {
                path = path.replace(`:${key}`, val);
            }
        }

        history.pushState({}, null, this.root + clearSlashes(path));
        this.go(0);
        this.current = { ...this.routes[index] }
        return this;
    }


    listen() {
        window.addEventListener('popstate', () => {
            this._enter();
        });
        this._enter();
        return this;
    }

    _enter() {
        const route = this.routes.find(route => {
            const location = window.location.pathname;

            if (!route.path) return false;

            const regExp = new RegExp(`^${route.path}$`);

            return !!location.match(regExp)
        });

        if (route) {
            this._renderRoute(route.node);
        } else {
            this._show404Page();
        }
    }

    _renderRoute(node) {
        this.app.innerHTML = '';
        this.app.append(node);
    }

    _show404Page() {
        const page404 = this.routes.find(item => item.name === '404')
        this._renderRoute(page404.node);
    }
};
