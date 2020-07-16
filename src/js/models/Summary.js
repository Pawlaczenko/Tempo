export default class Summary {
    constructor(obj) {
        this.title = obj.title;
        this.artist = obj.artist;
        this.time = obj.time[0] + Number((obj.time[1] / 60).toFixed(2));
        this.timeArr = obj.time;
        this.errors = obj.errors;
        this.charactersQnt = obj.letters.length;
        this.typedWords = this.charactersQnt / 5;
    }

    calculateGrossWPM() {
        return this.gWMP = (this.charactersQnt / 5) / this.time;
    }

    getErrorRate() {
        let err = this.errors.filter(e => e.state === 'uncorrected');
        return err.length / this.time;
    }

    calculateNetWPM() {
        let wpm = Math.round(this.calculateGrossWPM() - this.getErrorRate());
        if (wpm < 0) wpm = 0;
        this.wpm = wpm;
    }

    calculateAccuracy() {
        let correct = Math.abs(this.charactersQnt - this.errors.length);
        this.accuracy = ((correct / this.charactersQnt) * 100).toFixed(2);
    }

    calcErrors(type) {
        let errors = this.errors.filter(e => e.state === type);
        let arr = [];
        for (let i = 0; i < this.timeArr[0] + 1; i++) {
            let val = errors.filter(e => e.time === i);
            arr.push(val.length);
        }

        return arr;
    }

    ordinal_suffix_of(i) {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
    }

    createChartData() {

        let uncArray = this.calcErrors('uncorrected');
        let corArray = this.calcErrors('corrected');
        let labels = [];
        for (let i = 1; i <= this.timeArr[0] + 1; i++) {
            labels.push(`${this.ordinal_suffix_of(i)} min.`);
        }

        this.chartData = {
            labels: labels,
            datasets: [{
                label: 'Uncorrected Errors',
                data: uncArray,
                backgroundColor: '#6A7588',
            }, {
                label: 'Corrected Errors',
                data: corArray,
                backgroundColor: 'rgba(239, 131, 84,1)',
            }]
        }
    }
}