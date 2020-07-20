import BaseComponent from '$/components/1BaseComponent/BaseComponent';
import BezierEasing from 'bezier-easing';

//assets
import video from '$/assets/videos/main_page_bg.mp4'

let animId;
const easing = BezierEasing(0.85, 0, 0.15, 1);

function returnAnimateFunction(destination) {
    let startAnimTime = null;
    const animDuration = 1200;

    return function animate(time) {
        if (!startAnimTime) startAnimTime = time; 

        const runtime = time - startAnimTime;
        const progress = runtime / animDuration;
        const dest = destination * easing(progress);

        window.scrollBy(0, dest);

        if (document.documentElement.scrollTop === destination) {
            cancelAnimationFrame(animId);
            return
        }

        requestAnimationFrame(animate);
    }
}

export default class MainPage extends BaseComponent {
    static nodeName = 'main-page';

    constructor() {
        super();
        this.video = video;
        this.startAnimTime = null;

        this.innerHTML = this.render();

        this.destination = this.clientHeight / 2;
        this.animId = null;

        this.$('[data-anim-btn]').addEventListener('click', () => {
            animId = requestAnimationFrame(returnAnimateFunction(this.destination))
        });
    }

    connectedCallback() {
    }

    render() {
        return `
            <main class="main-page">
                <video class="main-page__bg" autoplay muted loop>
                    <source src="${this.video}" type="video/mp4"></source>
                </video>

                <section class="main-page__content">
                    <custom-title class="main-page__title" lvl="1" value="EveryDayMovie"></custom-title>

                    <p class="main-page__text">
                        Get info about random movie every day!
                    </p>

                    <div class="main-page__action-block">
                        To have access you have to:

                        <custom-button data-anim-btn tag="button" value="Sign up" color-class="first"></custom-button>

                        or

                        <custom-button tag="a" value="Sign in" color-class="second" url="/signin"></custom-button>
                    </div>
                </section>

                <section class="main-page__content">
                    <sign-up-form></sign-up-form>
                </section>
            </main>
        `
    }
}
