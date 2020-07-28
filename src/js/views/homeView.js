import { elements } from './../views/base';

export const renderHome = () => {
    const markup = `
    <h1 class="home__heading heading--1">
        Test <span class="heading--highlight">your</span> typing speed <br />
        with <span class="heading--highlight">your</span> favorite songs
    </h1>
    <div class="action">
        <form id="s-home" class="search-bar search-bar--action action__search-bar">
            <input type="text" class="search-bar__input search-bar__input--action" placeholder="Search for your song...">
            <button class="search-bar__button">
                <svg class="search-bar__icon">
                    <use xlink:href="./assets/img/_sprite.svg#icon-search"></use>
                </svg>
            </button>
        </form>
        <span class="action__or">
            or
        </span>
        <button class="action__cta cta cta--dark" id="getTopTracks">
            <svg class="cta__icon">
                <use xlink:href="./assets/img/_sprite.svg#icon-random"></use>
            </svg>
            <p class="cta__text">Get top songs in US</p>
        </button>
    </div>
    <figure class="container__background">
        <img src="assets/img/keyboard.png" alt="keyboard" class="container__image">
    </figure>
    `;

    return markup;
}