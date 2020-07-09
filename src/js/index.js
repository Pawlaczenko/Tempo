import './../sass/main.scss';
import Search from './models/Search';
import * as searchView from './views/searchView';
import * as homeView from './views/homeView';
import * as aboutView from './views/aboutView';
import * as common from './views/base';

const state = {};
window.state = state;

/**
 * CONTROL SEARCH
 */
const controlSearch = async () => {
    const query = searchView.getInput();
    if (query) {
        const site = window.location.hash = 'search';

        //Create search state
        state.search = new Search(query);
        //Prepere UI for results
        common.clearMain();
        common.renderLoader(common.elements.main);
        try {
            await state.search.getResults();
            common.deleteLoader();
            searchView.clearInput();
            common.renderView('search', searchView.renderResults(state.search.results, state.search.query));
        } catch (error) {
            console.log(error);
        }

    }
}

common.elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

/**
 * NAVIGATION CONTROL
 */

const navigationControl = () => {
    const site = window.location.hash.replace('#', '');

    if (site && (site === 'home' || site === 'about')) {
        common.clearMain();

        switch (site) {
            case 'home': {
                common.renderView(site, homeView.renderHome());
                break;
            }
            case 'about': {
                common.renderView(site, aboutView.renderAbout());
                break;
            }
        }
    } else if (site === '') {
        common.clearMain();
        common.elements.main.classList.add('home');
        common.renderView('home', homeView.renderHome());
    }
}

const resetPage = () => {
    window.location.hash = 'home';
    common.clearMain();
    common.elements.main.classList.add('home');
    common.renderView('home', homeView.renderHome());
}

window.addEventListener('hashchange', navigationControl);
window.addEventListener('load', resetPage);
// common.elements.header.addEventListener('click', e => {
//     navigationControl(e.target);
// });