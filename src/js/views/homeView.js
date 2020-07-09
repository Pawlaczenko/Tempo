import { elements } from './../views/base';

export const renderHome = () => {
    const markup = `
    <h1 class="home__heading heading--1">
        Try <span class="heading--highlight">your</span> typing speed <br />
        with <span class="heading--highlight">your</span> favorite songs
    </h1>
    <div class="action">
        <form class="search-bar search-bar--action action__search-bar" action="#search">
            <input type="text" class="search-bar__input" placeholder="Search for your song...">
            <button class="search-bar__button">
                <svg class="search-bar__icon">
                    <use xlink:href="./assets/img/_sprite.svg#icon-search"></use>
                </svg>
            </button>
        </form>
        <span class="action__or">
            or
        </span>
        <button class="action__cta cta cta--dark">
            <svg class="cta__icon">
                <use xlink:href="./assets/img/_sprite.svg#icon-random"></use>
            </svg>
            <p class="cta__text">Pick a random song</p>
        </button>
    </div>
    <figure class="container__background">
        <img src="src/img/keyboard.png" alt="keyboard" class="container__image">
    </figure>
    `;

    return markup;
}