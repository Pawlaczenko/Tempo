const formatTime = time => {
    return `${(time[0] < 10) ? '0' : ''}${time[0]}:${(time[1] < 10) ? '0' : ''}${time[1]}`;
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
                        <td>321</td>
                    </tr>
                    <tr>
                        <td>Typed characters:</td>
                        <td>3211</td>
                    </tr>
                    <tr>
                        <td>Time:</td>
                        <td>${formatTime(obj.time)}</td>
                    </tr>
                    <tr>
                        <td>Accuracy</td>
                        <td>87%</td>
                    </tr>
                    <tr>
                        <td>Corrected Errors:</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <td>Uncorrected errors:</td>
                        <td>4</td>
                    </tr>
                </table>
                <p class="summary__score">
                    Words per minute:
                    <span class="summary_wpm">46</span>
                </p>
            </div>
            <div class="summary__chart">
                <canvas id="wpmChart" class="summary__canvas" role="img"></canvas>
            </div>
            <div class="summary__buttons">
                <a class="cta cta--dark summary__cta">
                    <svg class="cta__icon">
                        <use xlink:href="./assets/img/_sprite.svg#icon-enter"></use>
                    </svg>
                    <p class="cta__text">Try again</p>
                </a>
                <a class="cta cta--light">
                    <svg class="cta__icon">
                        <use xlink:href="./assets/img/_sprite.svg#icon-home"></use>
                    </svg>
                    <p class="cta__text">Home</p>
                </a>
            </div>
        </div>
        <figure class="container__background">
            <img src="./img/keyboard.png" alt="keyboard" class="container__image">
        </figure>
    `;

    return markup;
}