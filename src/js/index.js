import './../sass/main.scss';
import Search from './models/Search';
import Game from './models/Game';
import * as searchView from './views/searchView';
import * as homeView from './views/homeView';
import * as aboutView from './views/aboutView';
import * as gameView from './views/gameView';
import * as common from './views/base';

const state = {};
window.state = state;

/**
 * CONTROL SEARCH
 */

const controlSearch = id => {
    //Get query from input
    const query = searchView.getInput(id);

    if (query) {
        //Set current Page
        window.location.hash = `search?q=${query}&page=${1}`;

        //onHashChange will do the rest
    }
}

const searchHandler = async (query, page) => {
    //Create search state
    state.search = new Search(query);
    //Prepere UI for results
    common.clearMain();
    common.renderLoader(common.elements.main);
    try {
        //Get search results
        await state.search.getResults(page);
        //Get number of sites
        state.search.calcSites();
        console.log(state.search.results);

        //Prepare the UI
        common.deleteLoader();
        searchView.clearInput();
        if (state.page.includes('search')) {
            //Render search views
            common.renderView('search', searchView.renderResults(state.search.results, state.search.query, page, state.search.sitesQnt));
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

/**
 * Game Controller
 */

const gameHandler = (e) => {
    //Get pressed key
    let key = e.key;
    //Check if key is not ignored
    if (state.game.ignore(key)) {
        if (key === 'Enter' && state.game.checkForEnter()) {
            //Color green
            gameView.colorLetter(state.game.index, 1);
            //change index
            state.game.changeIndex(1);
        } else if (key === 'Backspace') {
            //Change index
            state.game.changeIndex(-1);
            //Set cursor
            gameView.activateLetter(state.game.index);
            //Delete letter
            gameView.deleteLetter(state.game.index);

            //If letter is pressed
        } else {
            if (state.game.checkLetter(key)) {
                gameView.colorLetter(state.game.index, 1);
                state.game.changeIndex(1);
            } else {
                gameView.colorLetter(state.game.index, 0);
                state.game.changeIndex(1);
            }
        }
        //Set cursor
        gameView.activateLetter(state.game.index);
    }
}

const gameControl = async song => {
    console.log(song);
    window.location.hash = 'game';
    //Create new game object
    state.game = new Game(song.track_id, song.track_name, song.artist_name);

    //Prepare the UI
    common.clearMain();
    common.renderLoader(common.elements.main);
    try {
        //Get Lyrics
        await state.game.getLyrics();
        //Render View
        common.deleteLoader();
        common.renderView('game', gameView.renderGame(state.game));
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
 * NAVIGATION CONTROL
 */

const navigationControl = () => {
    //Get hash
    state.page = window.location.hash.replace('#', '');

    //Clear timer and events if needed
    if (state.timer) window.clearInterval(state.timer);
    if (state.page !== 'game') window.removeEventListener('keydown', gameHandler);

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
            let query = params.get('q');
            let page = (params.get('page')) ? parseInt(params.get('page'), 10) : 1;

            //Call Search Handler
            if (query) searchHandler(query, page);
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