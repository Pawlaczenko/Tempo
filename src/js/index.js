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


const state = {};
window.state = state;

/**
 * CONTROL SEARCH
 */

const controlSearch = id => {
    let hash = '';
    //Get query from input
    if (id === 'getTopTracks') {
        window.location.hash = `search?t=topUS&page=${1}`;
    } else {
        const query = searchView.getInput(id);
        if (query) {
            hash = `search?q=${query}&page=${1}`;
            window.location.hash = `search?q=${query}&page=${1}`;
        }
    }
}

const searchHandler = async (obj, page) => {
    console.log(obj.type);
    //Create search state
    state.search = new Search(obj.query);
    //Prepere UI for results
    common.clearMain();
    common.renderLoader(common.elements.main);
    try {
        //Get search results
        await state.search.getResults(page, obj.type);
        await state.search.getAlbumArts();
        //Get number of sites
        state.search.calcSites();
        console.log(state.search.results);

        //Prepare the UI
        common.deleteLoader();
        searchView.clearInput();
        if (state.page.includes('search')) {
            //Render search views
            common.renderView('search', searchView.renderResults(state.search.results, state.search.query, page, state.search.sitesQnt, obj.type));
            //Add Event Listeners
            addSearchListeners();
        }
    } catch (error) {
        console.log(error);
        // searchView.renderError(state.search.query);
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

common.elements.main.addEventListener('click', e => {
    if (e.target && e.target.id === 'getTopTracks') {
        controlSearch(e.target.id);
    }
});

/**
 * Game Controller
 */

const gameHandler = (e) => {
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
            state.game.typed++;
        }

        gameView.updateProgressBar(state.game.getPercentage());

        if (state.game.finish()) {
            window.clearInterval(state.timer);
            window.location.hash = 'summary';
        } else {
            //Set cursor
            gameView.activateLetter(state.game.index);
        }
    }
}

const gameControl = async song => {
    console.log(song);
    window.location.hash = 'game';
    //Create new game object
    state.game = new Game(song.track_id, song.track_name, song.artist_name);

    //Prepare the UI
    common.clearMain();
    common.renderLoader(common.elements.container);
    try {
        //Get Lyrics
        await state.game.getLyrics();
        //Render View

        common.renderView('game', gameView.renderGame(state.game));
        common.deleteLoader();
        //Render cursor
        gameView.activateLetter(0);
        //Add event listeners
        window.addEventListener('keypress', intitGame, { once: true });
        window.addEventListener('keydown', gameHandler);
    } catch (error) {
        console.log(error);
    }
}

const intitGame = (e) => {
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
    common.deleteLoader();

}


/**
 * NAVIGATION CONTROL
 */

const navigationControl = () => {
    //Get hash
    state.page = window.location.hash.replace('#', '');

    //Clear timer and events if needed
    if (state.timer) window.clearInterval(state.timer);
    if (state.page !== 'game') {
        window.removeEventListener('keydown', gameHandler);
    }

    //Render Pages
    if (state.page) {
        common.clearMain();

        if (state.page === 'home') {
            // Render View
            common.renderView(state.page, homeView.renderHome());
        } else if (state.page === 'about') {
            // Render View
            common.renderView(state.page, aboutView.renderAbout());
        } else if (state.page.includes('search')) {
            //Get parameters
            let params = new URLSearchParams(state.page.replace('search', ''));

            let parameters = {
                query: (params.get('q')) ? params.get('q') : params.get('t'),
                type: (params.get('q')) ? 'q' : 't'
            }
            console.log(parameters);

            let page = (params.get('page')) ? parseInt(params.get('page'), 10) : 1;

            //Call Search Handler
            if (parameters.query) searchHandler(parameters, page);
        } else if (state.page === 'summary') {
            summaryController();
        }
    }
}

const resetPage = () => {
    state.page = 'home';
    window.location.hash = 'home';
    common.clearMain();
    common.renderView('home', homeView.renderHome());
}

window.addEventListener('hashchange', navigationControl);
window.addEventListener('load', resetPage);