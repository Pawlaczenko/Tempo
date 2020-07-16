

import Chart from 'chart.js';

let ctx = document.querySelector("#wpmChart").getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    backgroundColor: 'white',
    data: {
        labels: ['1st min.', `2nd min.`, '3rd min.', '4th min.'],
        datasets: [{
            label: 'Uncorrected Errors',
            data: [5, 2, 6, 9],
            backgroundColor: '#6A7588',
        }, {
            label: 'Corrected Errors',
            data: [1, 2, 3, 0],
            backgroundColor: 'rgba(239, 131, 84,1)',
        }]
    },
    options: {
        scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true
            }]
        },
        legend: {
            defaultFontColor: 'black',
            labels: {
                // This more specific font property overrides the global property
                fontColor: 'black'
            }
        }
    }
});
Chart.defaults.global.defaultFontColor = 'black';







// axios.defaults.headers.common = { 'Authorization': `Bearer 8cbb37b29f1a3cfc2aebe9b12baa48ca340f5f76` }

// const test = async id => {
//     try {
//         let q = 'Bednarek'
//         const res = await axios(`https://cors-anywhere.herokuapp.com/https://api.ksoft.si/lyrics/search?q=${q}`);
//         // const res = await axios(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=76a84f6bc199d7279cd3d04bd79f5c9f&track_id=15953433`);
//         console.log(res);
//     } catch (error) {
//         console.log(error);
//     }

// }

// test();
