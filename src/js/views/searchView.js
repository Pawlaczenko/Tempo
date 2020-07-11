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

const limitTitle = (title, limit = 16) => {
    const newTitle = [];
    if (title.length >= limit) {
        title = title.split(' ');
        console.log(title[0]);
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
    if (img === "https://cdn.ksoft.si/images/Logo1024%20-%20W.png") return 'src/img/favico.png';
    return img;
}

const renderSong = song => {
    const markup = `
    <div class="song" data-goto="${song.id}">
        <figure class="song__album-cover">
            <img src="${checkImage(song.album_art)}" alt="Redbone" class="song__img">
            <svg class="song__icon">
                <use xlink:href="./assets/img/_sprite.svg#icon-play"></use>
            </svg>
        </figure>
        <div class="song__info">
            <p class="song__title">${limitTitle(song.name)}</p>
            <p class="song__artist">by ${song.artist}</p>
            <p class="song__words">${countWords(song.lyrics)} words</p>
        </div>
    </div>
    `;
    return markup;
}

const renderAllSongs = data => {
    let songs = '';
    data.forEach(element => {
        songs += renderSong(element);
    });
    return songs;
}

export const renderResults = (data, query) => {
    const markup = `
        <h2 class="search__heading heading--2">
            Results for <span class="heading--highlight heading--underline">${query}</span>:
        </h2>
        <section class="search__results">
            ${renderAllSongs(data)}
        </section>
    `;
    return markup;
}

export const renderError = (query) => {
    const markup = `
        <span class="error">No results found for ${query}</span>
    `;

    return markup;
}

