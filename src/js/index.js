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
    // console.log(id);
    const query = searchView.getInput(id);
    if (query) {
        state.page = `search?q=${query}&page=${1}`;
        window.location.hash = state.page;
    }
}

const searchHandler = async (query, page) => {
    //Create search state
    state.search = new Search(query);
    //Prepere UI for results
    common.clearMain();
    common.renderLoader(common.elements.main);
    try {
        await state.search.getResults(page);
        state.search.calcSites();
        console.log(state.search.results);
        common.deleteLoader();
        searchView.clearInput();
        if (state.page.includes('search')) {
            common.renderView('search', searchView.renderResults(state.search.results, state.search.query, page, state.search.sitesQnt));
            addQueries();
        }
    } catch (error) {
        searchView.renderError(state.search.query);
    }
}

window.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch(e.target.id.substr(2));
});

// [common.elements.searchForm, common.elements.searchFormA].forEach(item => {
//     console.log(item.classList);
//     // item.addEventListener('submit',controlSearch());
// });


/**
 * NAVIGATION CONTROL
 */

const navigationControl = () => {
    const site = window.location.hash.replace('#', '');
    if (state.timer) window.clearInterval(state.timer);
    if (site !== 'game') window.removeEventListener('keydown', gameHandler);

    if (site && (site === 'home' || site === 'about')) {
        common.clearMain();

        switch (site) {
            case 'home': {
                state.page = 'home';
                common.renderView(site, homeView.renderHome());
                break;
            }
            case 'about': {
                state.page = 'about';
                common.renderView(site, aboutView.renderAbout());
                break;
            }
        }
    } else if (site.includes('search')) {
        let query = site.substring(site.indexOf('?q=') + 3, site.lastIndexOf('&page='));
        query = query.replace('%20', ' ');
        let page = parseInt(site.substring(site.lastIndexOf('&page=') + 6));
        searchHandler(query, page);
    } else if (site === '') {
        state.page = 'home';
        common.clearMain();
        common.elements.main.classList.add('home');
        common.renderView('home', homeView.renderHome());
    }
}

const resetPage = () => {
    state.page = 'home';
    window.location.hash = 'home';
    common.clearMain();
    common.elements.main.classList.add('home');
    common.renderView('home', homeView.renderHome());
}

window.addEventListener('hashchange', navigationControl);
window.addEventListener('load', resetPage);


/**
 * Game Controller
 */

const gameHandler = (e) => {
    // e.preventDefault();
    let key = e.key;
    if (state.game.ignore(key)) {
        // if (state.game.checkForEnter() && key !== 'Backspace') {
        //     state.line++;
        // }
        if (key === 'Enter' && state.game.checkForEnter()) {
            gameView.colorLetter(state.game.index, 1);
            state.game.changeIndex(1);
        } else if (key === 'Backspace') {
            console.log('backhello');
            state.game.changeIndex(-1);
            gameView.activateLetter(state.game.index);
            gameView.deleteLetter(state.game.index);
            // if (state.game.checkForEnter()) {
            //     state.line--;
            // }
        } else {
            if (state.game.checkLetter(key)) {
                gameView.colorLetter(state.game.index, 1);
                state.game.changeIndex(1);
            } else {
                gameView.colorLetter(state.game.index, 0);
                state.game.changeIndex(1);
            }
        }
        gameView.activateLetter(state.game.index);
        // gameView.scrollGame(state.line);
    }
}

const gameControl = async song => {
    console.log(song);
    state.hash = 'game';
    window.location.hash = state.hash;
    state.game = new Game(song.track_id, song.track_name, song.artist_name);
    common.clearMain();
    common.renderLoader(common.elements.main);
    try {
        console.log('tutaj w try');
        await state.game.getLyrics();
        //Render View
        common.deleteLoader();
        common.renderView('game', gameView.renderGame(state.game));
        gameView.activateLetter(0);
        state.line = 0;
        window.addEventListener('keypress', intitGame, { once: true });
        window.addEventListener('keydown', gameHandler);
    } catch (error) {
        console.log('pumperni' + error);
    }
}

const intitGame = (e) => {
    // e.preventDefault();
    gameView.deleteAlert();
    state.timer = window.setInterval(() => {
        gameView.updateTime(state.game.timer());
    }, 1000);
}


const addQueries = () => {
    document.querySelector('.search__results').addEventListener('click', e => {
        const target = e.target.closest('.song');
        if (target && !target.classList.contains('song--disabled')) {
            const id = target.dataset.goto;
            console.log(id);
            const chosen = state.search.results.find(e => {
                return e.track.track_id === parseInt(id, 10);
            });
            gameControl(chosen.track);
        }
    });
}


// common.elements.header.addEventListener('click', e => {
//     navigationControl(e.target);
// });