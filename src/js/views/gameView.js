import { elements } from './base.js';

const formatLyrics = lyrics => {
    lyrics = lyrics.slice(0, -75);
    let markup = '';
    lyrics.forEach((e, i) => {
        let letter = e;
        if (letter === ' ') letter = '&nbsp;'
        letter = (e === '\n') ? `<span class="enter letter" data-index='${i}'>&crarr;</span><br />` : `<span class='letter' data-index='${i}'>${letter}</span>`;
        markup += letter;
    });
    return markup;
};

export const renderGame = song => {
    const markup = `
    <div class="game__header">
        <div class="game__title">${song.title} - ${song.artist}</div>
        <p class="game__alert">START TYPING</p>
        <time class="game__timer" data-time='00:00'>00:00</time>
    </div>
    <div class="game__lyrics">
        ${formatLyrics(song.letters)}
    </div>
    <div class="game__copyright">${song.copyright}</div>
    <script src="${song.tracking}"></script>
    `;

    return markup;
};

export const colorLetter = (index, state) => {
    const cssClass = (state) ? 'letter--correct' : 'letter--incorrect';
    const letter = document.querySelector(`[data-index="${index}"]`);
    if (letter) {
        letter.classList.add(cssClass);
    } else {
        console.log("Letter not found");
    }
}

export const deleteLetter = (index) => {
    const letter = document.querySelector(`[data-index="${index}"]`);
    const nextLetter = document.querySelector(`[data-index="${index + 1}"]`);
    const cssClass = `letter ${(letter.classList.contains('enter') ? 'enter' : '')}`;
    letter.classList = cssClass;
    nextLetter.classList.remove('letter--active');
}

export const activateLetter = index => {
    const letter = document.querySelector(`[data-index="${index}"]`);
    if (index > 0) {
        const prevLetter = document.querySelector(`[data-index="${index - 1}"]`);
        prevLetter.classList.remove('letter--active');
    }
    letter.classList.add('letter--active');
    scrollGame();
}

export const deleteAlert = () => {
    document.querySelector('.game__alert').style.display = 'none';
}

export const updateTime = (time) => {
    let clock = `${(time[0] < 10) ? '0' : ''}${time[0]}:${(time[1] < 10) ? '0' : ''}${time[1]}`;
    document.querySelector('.game__timer').innerHTML = clock;
}

const scrollGame = (line = 0, lineHeight = 33) => {
    // const scrollOptions = {
    //     left: 0,
    //     top: lineHeight * line,
    //     behavior: 'smooth'
    // }
    document.querySelector('.letter--active').scrollIntoView({
        behavior: 'smooth',
        block: "center",
        inline: "nearest"
    });

}
