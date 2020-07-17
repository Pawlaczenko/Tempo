import gsap from 'gsap';

export const elements = {
    searchForm: document.querySelector('.search-bar--header'),
    searchBar: document.querySelector('.search-bar__input--header'),
    main: document.querySelector('.main'),
    results: document.querySelector('.search__results'),
    header: document.querySelector('.header'),
    container: document.querySelector('.container')
}

export const clearMain = () => {
    //Clear main container
    elements.main.innerHTML = '';
    //Clear all classes except main
    elements.main.className = 'main';
}

const toggleActiveLink = view => {
    if (document.querySelector('.nav__list-item--active')) document.querySelector('.nav__list-item--active').classList.remove('nav__list-item--active');
    if (document.querySelector(`.nav__list-item--${view}`)) document.querySelector(`.nav__list-item--${view}`).classList.add('nav__list-item--active');
}

export const renderView = (view, markup) => {
    console.log(elements.main.classList);
    elements.main.classList.add(view);
    console.log(elements.main.classList);
    toggleActiveLink(view);

    elements.main.insertAdjacentHTML('afterbegin', markup);
}

export const renderLoader = (parent) => {
    console.log('render');
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