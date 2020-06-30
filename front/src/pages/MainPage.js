import BaseComponent from '$/components/1BaseComponent/BaseComponent';

//assets
import video from '$/assets/videos/main_page_bg.mp4'

export default class MainPage extends BaseComponent {
    static nodeName = 'main-page';

    constructor() {
        super();
        this.video = video;
    }

    connectedCallback() {
        this.innerHTML = this.render();
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

                        <custom-button tag="button" value="Sign up" colorClass="first"></custom-button>

                        or

                        <custom-button tag="a" value="Sign in" colorClass="second" url="/signin"></custom-button>
                    </div>
                </section>
            </main>
        `
    }
}
