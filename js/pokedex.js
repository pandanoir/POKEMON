import draw from './draw/drawPokedex.js';
import {SCEEN, pokemonList, pressedKey, pokedex, lineHeight, canvasHeight} from './definitions.js';
import {changeSceen} from './sceen.js';

let movesCursor = 0;
const out = {};
out[SCEEN.POKEDEX.DETAIL] = () => {
    draw[SCEEN.POKEDEX.DETAIL](pokedex.detailID);
    if (pressedKey.space === 1 || pressedKey.B === 1) {
        changeSceen(SCEEN.POKEDEX.INDEX);
    }
};
out[SCEEN.POKEDEX.INDEX] = () => {
    draw[SCEEN.POKEDEX.INDEX]();
    if ((pressedKey.up === 1 || pressedKey.up > 10)
        && movesCursor === 0 && pokedex.cursor.y - 1 >= 0) {
        pokedex.cursor.y--;
        if (pokedex.cursor.y - pokedex.pageYOffset <= 5 && pokedex.pageYOffset - 1 >= 0) {
            pokedex.pageYOffset--;
        }
        movesCursor = 1;
    }
    if ((pressedKey.down === 1 || pressedKey.down > 10)
        && movesCursor === 0 && pokemonList.length > pokedex.cursor.y + 1) {
        pokedex.cursor.y++;
        if (pokedex.cursor.y - pokedex.pageYOffset >= 25 && (pokemonList.length - (pokedex.pageYOffset)) * lineHeight >= canvasHeight) {
            pokedex.pageYOffset++;
        }
        movesCursor = 1;
    }
    if (pressedKey.space === 1) {
        pokedex.detailID = pokedex.cursor.y;
        changeSceen(SCEEN.POKEDEX.DETAIL);
    }
    if (pressedKey.B === 1) {
        changeSceen(SCEEN.MENU);
    }
    if (movesCursor !== 0) {
        movesCursor++;
    }
    if (movesCursor === 3) {
        movesCursor = 0;
    }
};
export default out;