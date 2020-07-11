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

const controlSearch = async (id) => {
    console.log(id);
    const query = searchView.getInput(id);
    if (query) {
        const site = window.location.hash = 'search';
        state.page = 'search';

        //Create search state
        state.search = new Search(query);
        //Prepere UI for results
        common.clearMain();
        common.renderLoader(common.elements.main);
        try {
            await state.search.getResults();
            common.deleteLoader();
            searchView.clearInput();
            if (state.page === 'search') {
                common.renderView('search', searchView.renderResults(state.search.results, state.search.query));
                addQueries();
            }
        } catch (error) {
            searchView.renderError(state.search.query);
        }
    }
}

window.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch(e.target.id.substr(2));
})

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

const gameHandler = e => {
    let key = e.key;
    if (state.game.ignore(key)) {
        if (key === 'Enter' && state.game.checkForEnter()) {
            gameView.colorLetter(state.game.index, 1);
            state.game.changeIndex(1);
        } else if (key === 'Backspace') {
            console.log('backhello');
            state.game.changeIndex(-1);
            gameView.activateLetter(state.game.index);
            gameView.deleteLetter(state.game.index);
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
    }
}

const gameControl = song => {
    state.hash = 'game';
    window.location.hash = state.hash;
    state.game = new Game(song.id, song.name, song.artist, song.lyrics);

    // let w = song.lyrics;
    // w = w.replace(/\n/ig, ' &crarr; ');
    // w = w.replace(/(^\s*)|(\s*$)/gi, "");
    // w = w.replace(/[ ]{2,}/gi, " ");

    // console.log(w.split(' '));

    //Render View
    common.clearMain();
    common.renderView('game', gameView.renderGame(state.game));
    gameView.activateLetter(0);
    window.addEventListener('keydown', gameHandler);
    window.addEventListener('keypress', intitGame, { once: true });
}

const intitGame = () => {
    gameView.deleteAlert();
    state.timer = window.setInterval(() => {
        gameView.updateTime(state.game.timer());
    }, 1000);
}


const addQueries = () => {
    document.querySelector('.search__results').addEventListener('click', e => {
        const target = e.target.closest('.song');
        if (target) {
            const id = target.dataset.goto;
            const chosen = state.search.results.find(e => {
                return e.id === id;
            });
            gameControl(chosen);
        }
    });
}


// common.elements.header.addEventListener('click', e => {
//     navigationControl(e.target);
// });