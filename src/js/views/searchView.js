import { elements } from './base';

export const getInput = id => {
    let val = '';
    if (id === 'home') {
        val = document.querySelector('.search-bar__input--action').value;
    } else {
        val = elements.searchBar.value;
        elements.searchBar.blur();
    }

    return val;
};
export const clearInput = () => { elements.searchBar.value = '' };

const countWords = lyrics => {
    lyrics = lyrics.replace(/\n/ig, ' ');
    lyrics = lyrics.replace(/(^\s*)|(\s*$)/gi, "");
    lyrics = lyrics.replace(/[ ]{2,}/gi, " ");

    return lyrics.split(' ').length;
}

const checkImage = (img) => {
    if (!img) return './assets/img/favico.png';
    return img;
}

const isExplicit = bool => {
    return (bool) ? `! explicit content` : '';
}

export const songImage = (songs) => {

    songs.forEach((e, i) => {
        let img = document.querySelector(`[data-goto="${e.track.track_id}"]`).querySelector('.song__img');
        let loader = document.querySelector(`[data-goto="${e.track.track_id}"]`).querySelector('.song__album-cover');
        img.src = checkImage(e.track.album_img);
        loader.removeChild(document.querySelector('.loader'));
    });
}

const renderSong = song => {
    const markup = `
    <div class="song ${(song.has_lyrics) ? '' : 'song--disabled'}" data-goto="${song.track_id}">
        <figure class="song__album-cover">
            <img src="./assets/img/favico-opace.png" alt="${song.track_name}" class="song__img">
            <figure class='loader'></figure>
            <svg class="song__icon">
                <use xlink:href="./assets/img/_sprite.svg#icon-play"></use>
            </svg>
        </figure>
        <div class="song__info">
            <p class="song__title">${song.track_name}</p>
            <p class="song__artist">by ${song.artist_name}</p>
            <p class="song__explicit">
                ${isExplicit(song.explicit)}
            </p>
        </div>
    </div>
    `;
    return markup;
}

const renderAllSongs = data => {
    let songs = '';
    data.forEach(element => {
        songs += renderSong(element.track);
    });
    return songs;
}

const renderPages = (url, currentPage, pagesQnt, pgsInPagin = 5) => {
    let markup = '';
    let itStart = currentPage - 2;
    let itEnd = currentPage + 2;
    if (itStart <= 0) {
        itStart = 1;
        itEnd = 5;
    }
    if (itEnd > pagesQnt) {
        itEnd = pagesQnt;
    }
    for (let i = itStart; i <= itEnd; i++) {
        markup += `<li class="pagination__item ${i === currentPage ? 'pagination__item--current' : ''}"><a href="#${url}${i}">${i}</a></li>`
    }
    return markup;
}

const renderPagination = (currentPage = 1, pagesQnt, query, type) => {
    const url = (type === 'q') ? `search?q=${query}&page=` : `search?t=topUS&page=`;
    const markup = `
    <li class="pagination__item pagination__item--left">
        <a href='#${url}${currentPage > 1 ? currentPage - 1 : 1}'>
            <svg class="pagination__icon">
                <use xlink:href="./assets/img/_sprite.svg#icon-left"></use>
            </svg>
        </a>
    </li>
    <li class="pagination__item pagination__item--first"><a href='#${url}1'>&mldr;</a></li>
    ${renderPages(url, currentPage, pagesQnt)}
    <li class="pagination__item pagination__item--last"><a href='#${url}${pagesQnt}'>&mldr;</a></li>
    <li class="pagination__item pagination__item--right">
        <a href='#${url}${currentPage < pagesQnt ? currentPage + 1 : currentPage}'>    
            <svg class="pagination__icon">
                    <use xlink:href="./assets/img/_sprite.svg#icon-right"></use>
            </svg>
        </a>
    </li>
    `;

    return markup;
}

export const renderNotFound = () => {
    document.querySelector('.search__heading').insertAdjacentHTML('afterend', '<figure class="notfound"><img src="./assets/img/notfound.png" class="notfound__img" alt="Results not found"></figure>');
}

export const renderResults = (data, query, page, pagesQnt, type) => {
    let markup = '';
    markup = `
        <h2 class="search__heading heading--2">
            Results for <span class="heading--highlight heading--underline">${query}</span>:
        </h2>
        <section class="search__results">
            ${data ? renderAllSongs(data) : ''}
        </section>
        <div class="search__pagination">
            <ul class="pagination">
                ${(type === 't' || !data) ? '' : renderPagination(page, pagesQnt, query, type)}
            </ul>
        </div>
    `;

    return markup;
}

export const renderError = (query) => {
    const markup = `
        <span class="error">No results found for ${query}</span>
    `;

    return markup;
}

