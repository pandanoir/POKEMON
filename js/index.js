import mainLoop from './mainLoop.js';
import battle from './battle.js';
import loading from './loading.js';
import map from './map.js';
import menu from './menu.js';
import message from './message.js';
import pokedexDetail from './pokedexDetail.js';
import pokedexIndex from './pokedexIndex.js';
import keyEvent from './keyEvent.js';
import {SCEEN, pokemonList, setupCanvas, drawCanvas} from './definitions.js';
import {sceenEquals, changeSceen} from './sceen.js';

mainLoop.add(keyEvent);

const sceenFunc = {};
sceenFunc[SCEEN.BATTLE.MAIN] = battle;
sceenFunc[SCEEN.LOADING] = loading;
sceenFunc[SCEEN.MAP] = map;
sceenFunc[SCEEN.MENU] = menu;
sceenFunc[SCEEN.MESSAGE] = message;
sceenFunc[SCEEN.POKEDEX.INDEX] = pokedexIndex;
sceenFunc[SCEEN.POKEDEX.DETAIL] = pokedexDetail;
let key;
for (key of Object.keys(sceenFunc)) {
    const SCEEN = key, func = sceenFunc[key];
    mainLoop.add(() => {
        if (sceenEquals(SCEEN)) { // SCEEN_LOADING, SCEEN_MAP, etc...
            setupCanvas();
            func(); // loading(), map(), etc...
            drawCanvas();
        }
    });
}

new Promise((resolve, reject) => {
    window.addEventListener('load', resolve);
})
.then(() => {
    changeSceen(SCEEN.LOADING);
    const pokemonImage = pokemonList.map(_ => './pokemon/' + _.src);
    Canvas.preload(...pokemonImage).then(() => {
        changeSceen(SCEEN.START);
    });
    mainLoop.start();
})
.catch(e => console.log(e));