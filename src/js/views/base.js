export const elements = {
    searchForm: document.querySelector('.search-bar--header'),
    searchBar: document.querySelector('.search-bar__input--header'),
    main: document.querySelector('.main'),
    results: document.querySelector('.search__results'),
    header: document.querySelector('.header')
}

export const clearMain = () => {
    //Clear main container
    elements.main.innerHTML = '';
    //Clear all classes except main
    elements.main.className = 'main';
}

export const renderView = (view, markup) => {
    elements.main.classList.add(view);
    if (document.querySelector('.nav__list-item--active')) document.querySelector('.nav__list-item--active').classList.remove('nav__list-item--active');
    if (document.querySelector(`.nav__list-item--${view}`)) document.querySelector(`.nav__list-item--${view}`).classList.add('nav__list-item--active');

    elements.main.insertAdjacentHTML('afterbegin', markup);
}

export const renderLoader = (parent) => {
    const markup = `
        <figure class='loader'>
        </figure>
    `;

    parent.insertAdjacentHTML('afterbegin', markup);
}

export const deleteLoader = () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.parentElement.removeChild(loader);
    }

}