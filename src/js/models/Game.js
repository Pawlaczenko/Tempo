import axios from 'axios';

export default class Game {
    constructor(id, title, artist) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.index = 0;
        this.time = [0, 0];
    }

    async getLyrics() {
        try {
            console.log('game lyrics async in module')
            const apiKey = '76a84f6bc199d7279cd3d04bd79f5c9f';
            const res = await axios(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=${apiKey}&track_id=${this.id}`);
            console.log(res);
            this.lyrics = res.data.message.body.lyrics.lyrics_body;
            this.tracking = res.data.message.body.lyrics.pixel_tracking_url;
            this.copyright = res.data.message.body.lyrics.lyrics_copyright;
            this.letters = this.lyrics.split('');
            console.log(this.lyrics);
        } catch (error) {
            console.log(error);
            return -1;
        }
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