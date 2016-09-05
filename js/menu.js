import draw from './draw/drawMenu.js';
import drawMap from './draw/drawMap.js';
import {SCEEN, pressedKey, cursor, menuList} from './definitions.js';
import {changeSceen} from './sceen.js';

let movesCursor = 0;
export default () => {
    drawMap();
    draw();
    if ((pressedKey.up === 1 || pressedKey.up > 10) && movesCursor === 0 && cursor.y - 1 >= 0) {
        cursor.y--;
        movesCursor = 1;
    }
    if ((pressedKey.down === 1 || pressedKey.down > 10) && movesCursor === 0 && cursor.y + 1 <= menuList.length - 1) {
        cursor.y++;
        movesCursor = 1;
    }
    if (movesCursor !== 0) {
        movesCursor++;
    }
    if (movesCursor === 3) {
        movesCursor = 0;
    }
    if (pressedKey.space === 1) {
        if (menuList[cursor.y] === 'pokedex') {
            changeSceen(SCEEN.POKEDEX_INDEX);
        } else {
            changeSceen(SCEEN.MAP);
        }
    }
    if (pressedKey.M === 1 || pressedKey.B === 1) {
        changeSceen(SCEEN.MAP);
    }
};