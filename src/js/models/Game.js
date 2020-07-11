export default class Game {
    constructor(id, title, artist, lyrics) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.lyrics = lyrics;
        this.index = 0;
        this.time = [0, 0];

        this.letters = this.lyrics.split('');
    }

    changeIndex(n) {
        if ((n === 1 && this.index < this.letters.length) || (n === -1 && this.index > 0)) {
            this.index += n;
        }
    }

    checkLetter(letter) {
        return (letter === this.letters[this.index]);
    }

    checkForEnter() {
        return (this.letters[this.index] === '\n');
    }

    ignore(letter) {
        return !(letter === 'Shift' || letter === 'Control' || letter === 'CapsLock' || letter === 'Alt' || letter === 'AltGraph');
    }

    timer() {
        this.time[1] += 1;
        if (this.time[1] >= 60) {
            this.time[0] += 1;
            this.time[1] = 0;
        }

        return this.time;
    }
}   