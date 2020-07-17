import { elements } from './../views/base';

export const renderAbout = () => {
    const markup = `
    <h1 class="about__heading heading--1">
        About <span class="heading--highlight">Tempo</span>
    </h1>
    <section class="about__text">
        <p class="about__paragraph">Tempo is a typing game, where you can test your typing speed
            using your favorite songs. Just search for a song,
            artist, or album and you'll get the results.
        </p>
        <p class="about__paragraph">
            Type the lyrics as fast as you can and see how
            well did you do. Your score depends on how
            many words per minute you type, and the
            number of errors you make.
        </p>
    </section>
    <div class="about__cta">
        <span class="regular-text">
            Start right now:
        </span>
        <button class="cta cta--dark" id="getTopTracks">
            <svg class="cta__icon">
                <use xlink:href="./assets/img/_sprite.svg#icon-random"></use>
            </svg>
            <p class="cta__text">Get top songs in US</p>
        </button>
    </div>
    <figure class="container__background">
        <img src="src/img/keyboard.png" alt="keyboard" class="container__image">
    </figure>
    `;

    return markup;
}