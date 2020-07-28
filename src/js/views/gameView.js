import { elements } from './base.js';

const formatLyrics = lyrics => {
    let markup = '';
    let wordB = '<span class="word">';
    let wordE = '</span>';
    lyrics.forEach((e, i) => {
        let letter = e;
        if (letter === ' ') {
            letter = '&nbsp;'
        }
        if (!lyrics[i + 1] || lyrics[i + 1] === ' ' || lyrics[i + 1] === '\n') {
            wordE = '</span>'
        } else {
            wordE = '';
        }
        if (!lyrics[i - 1] || lyrics[i - 1] === ' ' || lyrics[i - 1] === '\n') {
            wordB = '<span class="word">'
        } else {
            wordB = '';
        }
        letter = (e === '\n') ? `<span class="enter letter" data-index='${i}'>&crarr;</span><br />` : `${wordB}<span class='letter' data-index='${i}'>${letter}</span>${wordE}`;
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
    <div class="game__progressBar"></div>
    <div class="game__lyrics">
        ${formatLyrics(song.letters)}
    </div>
    <div class="game__progressBar"></div>
    <div class="game__copyright">${song.copyright}</div>
    <img src="${song.tracking}" style="width:0px; height: 0px;">
    `;
    return markup;
};

export const renderError = () => {
    const markup = `
        <div class="gameError">
        <p class="gameError__text">Sorry, something went wrong. It's probably server's fault. Try again later.</p>
            <figure class="gameError__emoji">
                <img src="./assets/img/sad_face.png" class="gameError__img">
            </figure>
        </div>
    `;

    return markup;
}

export const colorLetter = (index, state) => {
    const cssClass = (state) ? 'letter--correct' : 'letter--incorrect';
    const letter = document.querySelector(`[data-index="${index}"]`);
    if (letter) {
        letter.classList.add(cssClass);
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

export const updateProgressBar = (percentage) => {
    const bar = document.querySelectorAll('.game__progressBar');
    for (let b of bar) {
        b.style.backgroundImage = `linear-gradient(
        90deg,
        rgba(240, 138, 92, 1) 0%,
        rgba(240, 138, 92, 1) ${percentage}%,
        rgba(90, 103, 125, 0.21) ${percentage}%)`;
    }

}

export const scrollGame = () => {
    document.querySelector('.letter--active').scrollIntoView({
        behavior: 'smooth',
        block: "center",
        inline: "nearest"
    });

}
