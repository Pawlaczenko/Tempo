import Chart from 'chart.js';

const formatTime = time => {
    return `${(time[0] < 10) ? '0' : ''}${time[0]}:${(time[1] < 10) ? '0' : ''}${time[1]}`;
}

const calcErr = (obj, t) => {
    return obj.filter(e => e.state === t).length;
}

export const renderSummary = (obj) => {
    const markup = `
        <h3 class="heading--3 summary__heading">
            Summary:
        </h3>
        <p class="summary__artist">
            ${obj.title} - ${obj.artist}
        </p>
        <div class="summary__container">
            <div class="summary__content">
                <table class="summary__table">
                    <tr>
                        <td>Typed words:</td>
                        <td>${Math.round(obj.typedWords)}</td>
                    </tr>
                    <tr>
                        <td>Typed characters:</td>
                        <td>${obj.charactersQnt}</td>
                    </tr>
                    <tr>
                        <td>Time:</td>
                        <td>${formatTime(obj.timeArr)}</td>
                    </tr>
                    <tr>
                        <td>Accuracy</td>
                        <td>${obj.accuracy}%</td>
                    </tr>
                    <tr>
                        <td>Corrected Errors:</td>
                        <td>${calcErr(obj.errors, 'corrected')}</td>
                    </tr>
                    <tr>
                        <td>Uncorrected errors:</td>
                        <td>${calcErr(obj.errors, 'uncorrected')}</td>
                    </tr>
                </table>
                <p class="summary__score">
                    Words per minute:
                    <span class="summary_wpm">${obj.wpm}</span>
                </p>
            </div>
            <div class="summary__chart">
                <canvas id="wpmChart" class="summary__canvas" role="img"></canvas>
            </div>
            <div class="summary__buttons">
                <a class="cta cta--dark summary__cta" href="#game">
                    <svg class="cta__icon">
                        <use xlink:href="./assets/img/_sprite.svg#icon-enter"></use>
                    </svg>
                    <p class="cta__text">Try again</p>
                </a>
                <a class="cta cta--light" href="#home">
                    <svg class="cta__icon">
                        <use xlink:href="./assets/img/_sprite.svg#icon-home"></use>
                    </svg>
                    <p class="cta__text">Home</p>
                </a>
            </div>
        </div>
    `;
    console.log(markup);
    return markup;
}

export const renderChart = (data) => {
    let ctx = document.querySelector("#wpmChart").getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        backgroundColor: 'white',
        data: data,
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
}