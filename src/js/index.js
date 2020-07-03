import axios from 'axios';

const test = async id => {
    try {
        const res = await axios({
            "method": "GET",
            "url": "https://cors-anywhere.herokuapp.com/https://api.ksoft.si/lyrics/search?q=bieber",
            "headers": {
                'Authorization': 'Bearer '
            }
        })
        console.log(res);
    } catch (error) {
        console.log(error);
    }

}

test();