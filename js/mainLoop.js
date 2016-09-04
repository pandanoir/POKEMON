import battle from './battle.js';
import loading from './loading.js';
import map from './map.js';
import menu from './menu.js';
import message from './message.js';
import pokedexDetail from './pokedexDetail.js';
import pokedexIndex from './pokedexIndex.js';
import keyEvent from './keyEvent.js';
import {UPoint, preloadPokemonImage, changeSceen, SCEEN_LOADING, SCEEN_START, SCEEN_MAP, SCEEN_MENU, SCEEN_MESSAGE, sceen, pokemonList, FPS} from './definitions.js';

const mainLoop = {
    list: [],
    listOnce: []
};
mainLoop.fire = function() {
    for (var func of this.list) {
        func();
    }
    for (var func of this.listOnce) {
        func();
    }
    this.listOnce = [];
};
mainLoop.add = function(f) {
    this.list[this.list.length] = f;
};
mainLoop.addOnce = function(f) {
    this.listOnce[this.listOnce.length] = f;
};
mainLoop.start = function() {
    setInterval(this.fire.bind(this), 1000 / FPS);
};

mainLoop.add(keyEvent);

const sceenFunc = {
    SCEEN_BATTLE: battle,
    SCEEN_LOADING: loading,
    SCEEN_MAP: map,
    SCEEN_MENU: menu,
    SCEEN_MESSAGE: message,
    SCEEN_POKEDEX_INDEX: pokedexIndex,
    SCEEN_POKEDEX_DETAIL: pokedexDetail
};
let key;
for (key of Object.keys(sceenFunc)) {
    const SCEEN = key, func = sceenFunc[key];
    mainLoop.add(() => {
        if (sceen === SCEEN) { // SCEEN_LOADING, SCEEN_MAP, etc...
            setupCanvas();
            func(); // loading(), map(), etc...
            drawCanvas();
        }
    });
}

const windowLoad = new Promise((resolve, reject) => {
    window.addEventListener('load', resolve);
});
Promise.all([preloadPokemonImage, windowLoad]).then(() => {
    changeSceen(SCEEN_LOADING);
    const pokemonImage = pokemonList.map(_ => './pokemon/' + _.src);
    Canvas.preload(...pokemonImage).then(() => {
        changeSceen(SCEEN_START);
    });
}).catch(e => console.log(e));

windowLoad.then(mainLoop.start.bind(mainLoop));