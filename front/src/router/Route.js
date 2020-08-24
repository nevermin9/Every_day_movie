export default class Route {
    constructor({name, path, component}) {
        this.name = name;
        this.path = path;
        this.component = component;
        this.node = null;
        this.query = null;
        this.params = null;

        this.createParamsObject().createNode();
    }

    createParamsObject() {
        if (this.path && this.path.includes(':')) {
            let paramsArr = this.path.match(/\/:\w+/g).map(item => item.split('/:').filter(item => item)).flat();
            
            for (let param of paramsArr) {
                this.params[param] = null;
            }
        } 

        return this;
    }

    createNode() {
        this.node = document.createElement(this.component.is);
        return this;
    }
}
