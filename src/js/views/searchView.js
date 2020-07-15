import { elements } from './base';

export const getInput = id => {
    return (id === 'home') ? document.querySelector('.search-bar__input--action').value : elements.searchBar.value;
};
export const clearInput = () => { elements.searchBar.value = '' };

const countWords = lyrics => {
    lyrics = lyrics.replace(/\n/ig, ' ');
    lyrics = lyrics.replace(/(^\s*)|(\s*$)/gi, "");
    lyrics = lyrics.replace(/[ ]{2,}/gi, " ");

    return lyrics.split(' ').length;
}

const limitString = (title, limit = 16) => {
    const newTitle = [];
    if (title.length >= limit) {
        title = title.split(' ');
        if (title[0].length > 11) {
            return `${title[0].slice(0, 10)}...`;
        }
        title.reduce((acc, curr) => {
            if (acc + curr.length <= limit) {
                newTitle.push(curr);
            }
            return acc + curr.length;
        }, 0);
        return `${newTitle.join(' ')}...`;
    }
    return title;
}

const checkImage = (img) => {
    if (!img) return 'src/img/favico.png';
    return img;
}

const isExplicit = bool => {
    return (bool) ? `<img src="src/img/explicit.png" alt="explicit language" class="song__warning">` : '';
}

const renderSong = song => {
    const markup = `
    <div class="song ${(song.has_lyrics) ? '' : 'song--disabled'}" data-goto="${song.track_id}">
        <figure class="song__album-cover">
            <img src="${checkImage(song.album_img)}" alt="${song.track_name}" class="song__img">
            <svg class="song__icon">
                <use xlink:href="./assets/img/_sprite.svg#icon-play"></use>
            </svg>
        </figure>
        <div class="song__info">
            <p class="song__title">${limitString(song.track_name)}</p>
            <p class="song__artist">by ${limitString(song.artist_name, 20)}</p>
        </div>
        <figure class="song__explicit">
            ${isExplicit(song.explicit)}
        </figure>
    </div>
    `;
    return markup;
}

// const renderSong = song => {
//     const markup = `
//     <div class="song" data-goto="${song.id}">
//         <figure class="song__album-cover">
//             <img src="${checkImage(song.album_art)}" alt="Redbone" class="song__img">
//             <svg class="song__icon">
//                 <use xlink:href="./assets/img/_sprite.svg#icon-play"></use>
//             </svg>
//         </figure>
//         <div class="song__info">
//             <p class="song__title">${limitTitle(song.name)}</p>
//             <p class="song__artist">by ${song.artist}</p>
//             <p class="song__words">${countWords(song.lyrics)} words</p>
//         </div>
//     </div>
//     `;
//     return markup;
// }

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
    // const markup = `
    //     <li class="pagination__item pagination__item--current"><a href="${url}${currentPage - 2}">${currentPage - 2}</a></li>
    //     <li class="pagination__item pagination__item--current"><a href="${url}${currentPage - 1}">${currentPage - 1}</a></li>
    //     <li class="pagination__item pagination__item--current"><a href="${url}${currentPage}">${currentPage}</a></li>
    //     <li class="pagination__item pagination__item--current"><a href="${url}${currentPage + 1}">${currentPage + 1}</a></li>
    //     <li class="pagination__item pagination__item--current"><a href="${url}${currentPage + 2}">${currentPage + 2}</a></li>
    // `;
    return markup;
}

const renderPagination = (currentPage = 1, pagesQnt, query) => {
    const url = `search?q=${query}&page=`;
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

export const renderResults = (data, query, page, pagesQnt) => {
    const markup = `
        <h2 class="search__heading heading--2">
            Results for <span class="heading--highlight heading--underline">${query}</span>:
        </h2>
        <section class="search__results">
            ${renderAllSongs(data)}
        </section>
        <div class="search__pagination">
            <ul class="pagination">
                ${renderPagination(page, pagesQnt, query)}
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

