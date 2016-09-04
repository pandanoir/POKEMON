import draw from './drawMenu.js';
import drawMap from './drawMap.js';
import {SCEEN_MAP, SCEEN_POKEDEX_INDEX, pressedKey, cursor, menuList, changeSceen} from './definitions.js';

let movesCursor = 0;
export default () => {
    drawMap();
    draw();
    if (pressedKey.up > 0 && movesCursor === 0 && cursor.y - 1 >= 0) {
        cursor.y--;
        movesCursor = 1;
    }
    if (pressedKey.down > 0 && movesCursor === 0 && cursor.y + 1 <= menuList.length - 1) {
        cursor.y++;
        movesCursor = 1;
    }
    if (movesCursor !== 0) {
        movesCursor++;
    }
    if (movesCursor === 11) {
        movesCursor = 0;
    }
    if (pressedKey.space === 1) {
        if (menuList[cursor.y] === 'pokedex') {
            changeSceen(SCEEN_POKEDEX_INDEX);
        } else {
            changeSceen(SCEEN_MAP);
        }
    }
    if (pressedKey.M === 1 || pressedKey.B === 1) {
        changeSceen(SCEEN_MAP);
    }
};