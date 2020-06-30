//styles
import '$/scss/style.scss';
// Router
import { router } from '$/router';
//globals
window.router = router;

// components and pages
import componentsAndPages from '$/componentsAndPages';
console.log("componentsAndPages", componentsAndPages)

for (const elem of componentsAndPages) {
    customElements.define(elem.is, elem);
}

