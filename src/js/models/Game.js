export default class Game {
    constructor(id, title, artist, lyrics) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.lyrics = lyrics;
        this.index = [0, 0];

        this.letters = this.lyrics.split('');
    }
}   