import { elements } from './base.js';

const formatLyrics = lyrics => {
    // lyrics = lyrics.replace(/\n/ig, ' <span class="enter">&crarr;</span><br /> ');
    let markup = '';
    lyrics.forEach((e, i) => {
        let letter = e;
        letter = (e === '\n') ? `<span class="enter letter" data-index='${i}'>&crarr;</span><br />` : `<span class='letter' data-index='${i}'>${e}</span>`;
        markup += letter;
    });
    return markup;
};

export const renderGame = song => {
    const markup = `
    <div class="game__header">
        <div class="game__title">${song.title} - ${song.artist}</div>
        <p class="game__alert">START TYPING</p>
        <time class="game__timer">00:00</time>
    </div>
    <div class="game__lyrics">
        ${formatLyrics(song.letters)}
    </div>
    `;

    return markup;
};