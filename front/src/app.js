//styles
import '@/scss/style.scss';
// Router
// import { router } from '@/router';
//globals
// window.router = router;

// components and pages
import listOfComponents from '@/components';
import listOfPages from '@/pages'

for (const elem of [...listOfComponents, ...listOfPages]) {
    customElements.define(elem.is, elem);
}

