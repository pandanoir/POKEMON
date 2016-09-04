import draw from './drawPokedexDetail.js';
import {SCEEN_POKEDEX_INDEX, changeSceen, pressedKey, pokedex} from './definitions.js';

let movesCursor = 0;
export default () => {
    draw(pokedex.detailID);
    if (pressedKey.space === 1 || pressedKey.B === 1) {
        changeSceen(SCEEN_POKEDEX_INDEX);
    }
}