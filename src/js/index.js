import './../sass/main.scss';
import Search from './models/Search';
import Game from './models/Game';
import Summary from './models/Summary';
import * as searchView from './views/searchView';
import * as homeView from './views/homeView';
import * as aboutView from './views/aboutView';
import * as gameView from './views/gameView';
import * as summaryView from './views/summaryView';
import * as common from './views/base';

import '../img/_sprite.svg';

const state = {};
window.state = state;

/**
 * CONTROL SEARCH
 */

const controlSearch = id => {
    let hash = '';
    //Get query from input
    if (id === 'getTopTracks') {
        window.location.hash = `search?t=Top%20track%20in%20US`;
    } else {
        const query = searchView.getInput(id);
        if (query) {
            hash = `search?q=${query}&page=${1}`;
            window.location.hash = `search?q=${query}&page=${1}`;
        }
    }
}

const searchHandler = async (obj, page) => {
    //Create search state
    state.search = new Search(obj.query);
    //Prepere UI for results
    common.clearMain();
    common.renderLoader(common.elements.main);
    try {
        //Get search results
        let res = await state.search.getResults(page, obj.type)

        //Get number of sites
        state.search.calcSites();

        //Prepare the UI
        common.deleteLoader();
        searchView.clearInput();
        if (state.page.includes('search')) {
            //Render search views
            common.renderView('search', searchView.renderResults(state.search.results, state.search.query, page, state.search.sitesQnt, obj.type));
            if (res !== -1) {
                addSearchListeners();
                await state.search.getAlbumArts();
                searchView.songImage(state.search.results);
            } else {
                searchView.renderNotFound();
            }

        }
    } catch (error) {
    }
}

const addSearchListeners = () => {
    document.querySelector('.search__results').addEventListener('click', e => {
        //Get Target
        const target = e.target.closest('.song');
        //Check if song can be played
        if (target && !target.classList.contains('song--disabled')) {
            //Get track id
            const id = target.dataset.goto;
            //Find the track object
            const chosen = state.search.results.find(e => {
                return e.track.track_id === parseInt(id, 10);
            });
            //Open game
            gameControl(chosen.track);
        }
    });
}

window.addEventListener('submit', e => {
    e.preventDefault();
    //Get Input ID
    const id = e.target.id.substr(2);
    //Call Controller
    controlSearch(id);
});



/**
 * Game Controller
 */

const gameHandler = (e) => {
    if (!e.target.classList.contains('search-bar__input')) {
        e.preventDefault();
    }

    if (!state.init) {
        intitGame();
    };

    //Get pressed key
    let key = e.key;
    //Check if key is not ignored
    if (state.game.ignore(key)) {
        if (key === 'Backspace') {
            //Change index

            state.game.changeIndex(-1);
            //Set cursor
            //Delete letter
            gameView.deleteLetter(state.game.index);

            //If letter is pressed
        } else {
            if (key === 'Enter' && state.game.checkForEnter()) {
                //Color green
                gameView.colorLetter(state.game.index, 1);
                state.game.popError();
                //change index
                state.game.changeIndex(1);
            } else if (state.game.checkLetter(key)) {
                gameView.colorLetter(state.game.index, 1);
                state.game.popError();
                state.game.changeIndex(1);
            } else {
                gameView.colorLetter(state.game.index, 0);
                state.game.putError();
                state.game.changeIndex(1);
            }
        }

        gameView.updateProgressBar(state.game.getPercentage());

        if (state.game.finish()) {
            window.clearInterval(state.timer);
            window.removeEventListener('resize', gameView.scrollGame);
            state.init = 0;
            window.location.hash = 'summary';
        } else {
            //Set cursor
            gameView.activateLetter(state.game.index);
        }
    }
}

const gameControl = async song => {
    window.location.hash = 'game';
    //Create new game object
    state.game = new Game(song.track_id, song.track_name, song.artist_name);
    state.init = 0;

    //Prepare the UI
    common.clearMain();
    common.renderLoader(common.elements.container);
    try {
        //Get Lyrics
        await state.game.getLyrics();
        //Render View

        common.renderView('game', gameView.renderGame(state.game));
        common.deleteLoader();
        if (state.game.letters.length !== 0) {
            gameView.activateLetter(0);
            //Add event listeners
            window.addEventListener('keydown', gameHandler);
        }
        //Render cursor

    } catch (error) {
        common.renderView('game', gameView.renderError());
        common.deleteLoader();
    }
}

const intitGame = (e) => {
    state.init = 1;
    window.addEventListener('resize', gameView.scrollGame);
    gameView.deleteAlert();
    state.timer = window.setInterval(() => {
        gameView.updateTime(state.game.timer());
    }, 1000);
}

/**
 * SUMMARY CONTROL
 */

const summaryController = () => {

    common.renderLoader(common.elements.container);
    state.summary = new Summary(state.game);
    state.summary.calculateNetWPM();
    state.summary.calculateAccuracy();
    state.summary.createChartData();

    common.renderView(state.page, summaryView.renderSummary(state.summary));
    summaryView.renderChart(state.summary.chartData);
    document.querySelector('#tryAgain').addEventListener('click', e => {
        window.location.hash = 'game';
        common.clearMain();
        common.renderLoader(common.elements.container);
        state.game.restart();
        common.renderView('game', gameView.renderGame(state.game));
        common.deleteLoader();
        //Render cursor
        gameView.activateLetter(0);
        //Add event listeners
        window.addEventListener('keydown', gameHandler);
    });
    common.deleteLoader();

}


/**
 * NAVIGATION CONTROL
 */

const navigationControl = () => {
    //Get hash
    state.page = window.location.hash.replace('#', '');
    let checkbox = document.querySelector('.header__checkbox');
    if (checkbox.checked) {
        checkbox.checked = false;
    }

    //Clear timer and events if needed
    if (state.timer) window.clearInterval(state.timer);
    if (state.page !== 'game') {
        window.removeEventListener('keydown', gameHandler);
    }

    //Render Pages
    if (state.page && state.page !== 'game') {
        common.clearMain();
        if (state.page === 'home') {
            // Render View
            common.renderView(state.page, homeView.renderHome());
            common.elements.main.addEventListener('click', e => {
                if (e.target && e.target.id === 'getTopTracks') {
                    controlSearch(e.target.id);
                }
            });
        } else if (state.page === 'about') {
            // Render View
            common.renderView(state.page, aboutView.renderAbout());
            common.elements.main.addEventListener('click', e => {
                if (e.target && e.target.id === 'getTopTracks') {
                    controlSearch(e.target.id);
                }
            });
        } else if (state.page.includes('search')) {
            //Get parameters
            let params = new URLSearchParams(state.page.replace('search', ''));

            let parameters = {
                query: (params.get('q')) ? params.get('q') : params.get('t'),
                type: (params.get('q')) ? 'q' : 't'
            }

            let page = (params.get('page')) ? parseInt(params.get('page'), 10) : 1;

            //Call Search Handler
            if (parameters.query) searchHandler(parameters, page);
        } else if (state.page === 'summary') {
            summaryController();
        } else {
            resetPage();
        }
    }
}

const resetPage = () => {
    state.page = 'home';
    window.location.hash = 'home';
    common.clearMain();
    common.renderView('home', homeView.renderHome());

    common.elements.main.addEventListener('click', e => {
        if (e.target && e.target.id === 'getTopTracks') {
            controlSearch(e.target.id);
        }
    });

}

window.addEventListener('hashchange', navigationControl);
window.addEventListener('load', e => {
    resetPage();
});
window.mobileAndTabletCheck = function () {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

var menuButton = document.getElementById('menuButton');
menuButton.addEventListener('click', function (e) {
    menuButton.classList.toggle('is-active');
    // e.preventDefault();
});