// const test = async id => {
//     try {
//         //76a84f6bc199d7279cd3d04bd79f5c9f
//         let q = 'redbone'
//         const res = await axios(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=76a84f6bc199d7279cd3d04bd79f5c9f&track_id=15953433`);
//         // const res = await axios(`https://api.genius.com/search?access_token=6A_LOpZ4CJ3BJTu-qHhhd_-DQw-Q_sGHCF8BhsHH-3BVDCr6X1_JzH6PXrcUqvPZ&q=redbone`);
//         // const res = await axios(`https://api.genius.com/songs/2905167?access_token=6A_LOpZ4CJ3BJTu-qHhhd_-DQw-Q_sGHCF8BhsHH-3BVDCr6X1_JzH6PXrcUqvPZ`);
//         console.log(res);
//     } catch (error) {
//         console.log(error);
//     }

// }

// test();
// // api: https://api.genius.com/search;
// // Client_id:oO_nPR-cg9bH6alM2dBnFVeoWXXm_TzgsyPd82pSnBVqywypdvyhjegQUgU6GpYQ
// // Client secret: qWINHLPAMWEkIxPmSEMwZKecGTbIhZ9AO0Q9hxrSAgqQ5xmkrWhnatl2YY-KcZUcvLdKJI3LLvzyEjfr7wfHYg
// // Token: 6A_LOpZ4CJ3BJTu-qHhhd_-DQw-Q_sGHCF8BhsHH-3BVDCr6X1_JzH6PXrcUqvPZ

import Chart from 'chart.js';

// // let ctx = document.querySelector("#wpmChart").getContext('2d');
// // export const myChart = new Chart(ctx, {
// //     type: 'bar',
// //     backgroundColor: 'white',
// //     data: {
// //         labels: [1, 2, 3, 4],
// //         datasets: [{
// //             label: 'words typed in a minute',
// //             data: [45, 52, 45, 12],
// //             backgroundColor: 'rgba(239, 131, 84,1)',
// //         }]
// //     },
// //     options: {
// //         scales: {
// //             yAxes: [{
// //                 ticks: {
// //                     beginAtZero: true
// //                 }
// //             }]
// //         },
// //         legend: {
// //             defaultFontColor: 'black',
// //             labels: {
// //                 // This more specific font property overrides the global property
// //                 fontColor: 'black'
// //             }
// //         }
// //     }
// // });
// // Chart.defaults.global.defaultFontColor = 'black';