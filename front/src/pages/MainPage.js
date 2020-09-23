import BaseComponent from '@/components/1BaseComponent/BaseComponent';

//assets
import video from '@/assets/videos/main_page_bg.mp4'

let animId;

function returnAnimateFunction(destination) {
    // window.scrollTo with options doesnt work correctly in some browsers
    // so I decided to use custom animation

    let startAnimTime = null;
    const DURATION = 1200;

    return function animate(time) {
        if (!startAnimTime) startAnimTime = time; 

        const currentTime = time - startAnimTime;
        const scrollBy = (destination / DURATION) * currentTime;

        window.scrollBy(0, scrollBy);

        if ((destination > 0 && document.documentElement.scrollTop === destination) 
            || (destination < 0 && document.documentElement.scrollTop === 0)) {
            cancelAnimationFrame(animId);
            return;
        }

        requestAnimationFrame(animate);
    }
}

export default class MainPage extends BaseComponent {
    static nodeName = 'main-page';

    constructor() {
        super();
        this.video = video;
        this.destination = null;
    }

    connectedCallback() {
        if (!this.rendered) {
            this.innerHTML = this.render();
            this.destination = this.clientHeight / 2;
            this.addRemoveBodyClass();
        }

        this.$('[data-anim-btn]').addEventListener('click', () => {
            animId = requestAnimationFrame(returnAnimateFunction(this.destination))
        });

        this.$('[data-anim-btn-back]').addEventListener('click', () => {
            animId = requestAnimationFrame(returnAnimateFunction(-this.destination))
        });
    }

    disconnectedCallback() {
        this.addRemoveBodyClass(false);
    }

    addRemoveBodyClass(add = true) {
        if (add) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }

    render() {
        return `
            <main class="main-page">
                <video class="main-page__bg" autoplay muted loop>
                    <source src="${this.video}" type="video/mp4"></source>
                </video>

                <section class="main-page__content container">
                    <custom-title class="main-page__title" lvl="1" value="EveryDayMovie" decore></custom-title>

                    <p class="main-page__text">
                        Get info about random movie every day!
                    </p>

                    <div class="main-page__action-block">
                        <span class="main-page__action-block-text">
                            To have access you have to:
                        </span>

                        <custom-button class="main-page__action-block-btn" data-anim-btn tag="button" value="Sign up" color-class="first"></custom-button>

                        <span class="main-page__action-block-text">
                            or
                        </span>

                        <custom-button class="main-page__action-block-btn" tag="a" value="Sign in" color-class="second" url="/signin"></custom-button>
                    </div>
                </section>

                <section class="main-page__content container">
                    <sign-up-form></sign-up-form>

                    <custom-button class="main-page__action-block-btn" data-anim-btn-back tag="button" value="Back" color-class="first"></custom-button>
                </section>
            </main>
        `
    }
}
