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
            if (state.page === 'search') common.renderView('search', searchView.renderResults(state.search.results, state.search.query));
        } catch (error) {
            console.log(error);
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
// common.elements.header.addEventListener('click', e => {
//     navigationControl(e.target);
// });