import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            axios.defaults.headers.common = { 'Authorization': `Bearer 8cbb37b29f1a3cfc2aebe9b12baa48ca340f5f76` }
            const res = await axios(`https://cors-anywhere.herokuapp.com/https://api.ksoft.si/lyrics/search?q=${this.query}&limit=20`);
            this.results = res.data.data;
            console.log(this.results);
        } catch (error) {
            console.log(error);
        }
    }
}