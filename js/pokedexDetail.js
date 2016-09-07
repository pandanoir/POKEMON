import draw from './draw/drawPokedexDetail.js';
import {SCEEN, pressedKey, pokedex} from './definitions.js';
import {changeSceen} from './sceen.js';

let movesCursor = 0;
export default () => {
    draw(pokedex.detailID);
    if (pressedKey.space === 1 || pressedKey.B === 1) {
        changeSceen(SCEEN.POKEDEX.INDEX);
    }
}