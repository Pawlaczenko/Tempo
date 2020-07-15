export default class Summary {
    constructor(obj) {
        this.title = obj.title;
        this.artist = obj.artist;
        this.time = obj.time[0] + Number((obj.time[1] / 60).toFixed(2));
        this.errors = obj.errors;
        this.charactersQnt = obj.letters.length;
        this.wordsTyped = Math.round(obj.letters.length / 5);
    }

    calculateWMP() {

    }
}