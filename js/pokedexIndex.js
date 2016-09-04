import draw from './drawPokedexIndex.js';
import {SCEEN_MENU, SCEEN_POKEDEX_DETAIL, changeSceen, pokemonList, pressedKey, pokedex, lineHeight, canvasHeight} from './definitions.js';

let movesCursor = 0;
export default () => {
    draw();
    if ((pressedKey.up === 1 || pressedKey.up > 20)
        && movesCursor === 0 && pokedex.cursor.y - 1 >= 0) {
        pokedex.cursor.y--;
        if (pokedex.cursor.y - pokedex.pageYOffset <= 5 && pokedex.pageYOffset - 1 >= 0) {
            pokedex.pageYOffset--;
        }
        movesCursor = 1;
    }
    if ((pressedKey.down === 1 || pressedKey.down > 20)
        && movesCursor === 0) {
        pokedex.cursor.y++;
        if (pokedex.cursor.y - pokedex.pageYOffset >= 25 && (pokemonList.length - (pokedex.pageYOffset)) * lineHeight >= canvasHeight) {
            pokedex.pageYOffset++;
        }
        movesCursor = 1;
    }
    if (pressedKey.space === 1) {
        pokedex.detailID = pokedex.cursor.y;
        changeSceen(SCEEN_POKEDEX_DETAIL);
    }
    if (pressedKey.B === 1) {
        changeSceen(SCEEN_MENU);
    }
    if (movesCursor !== 0) {
        movesCursor++;
    }
    if (movesCursor === 11) {
        movesCursor = 0;
    }
}