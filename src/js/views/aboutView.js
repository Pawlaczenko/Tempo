import { elements } from './../views/base';

export const renderAbout = () => {
    const markup = `
    <h1 class="about__heading heading--1">
        About <span class="heading--highlight">Tempo</span>
    </h1>
    <section class="about__text">
        <p class="about__paragraph">Tempo is a website, where you can test your typing speed
            using your favorite songs. Just search for a song,
            artist, or album and you'll get the results.
        </p>
        <p class="about__paragraph">
            Type the lyrics as fast as you can and see how
            well did you do. <b>Five keystrokes</b> are counted as equivalent to <b>one word</b>.
            <b>One error</b> is one misspelled character. Your final <b>wpm</b>(words per minute) score is calculated
            by the following equation:

        </p>            
        <figure class="about__equation">
            <img class="about__equation__img" src="src/img/equation.png" alt="(no. of words - no. of errors)/time">
        </figure>
        <p class="about__paragraph">
            Due to the nature of a typing speed test, you will be unable to perform the test on your mobile device. Try this app on a device with a keyboard.
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

    `;

    return markup;
}