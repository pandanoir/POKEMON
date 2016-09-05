import draw from './draw/drawBattle.js';
import {pressedKey, cursor, SCEEN} from './definitions.js';
import {changeSceen} from './sceen.js';

const commands = [['battle', 'item'], ['pokemon', 'escape']];
export default () => {
    draw();
    if (pressedKey.down === 1 && cursor.maxY >= cursor.y + 1) {
        cursor.y++;
    }
    if (pressedKey.up === 1 && cursor.y - 1 >= 0) {
        cursor.y--;
    }
    if (pressedKey.right === 1 && cursor.maxX >= cursor.x + 1) {
        cursor.x++;
    }
    if (pressedKey.left === 1 && cursor.x - 1 >= 0) {
        cursor.x--;
    }
    if (pressedKey.space === 1) {
        if (commands[cursor.y][cursor.x] === 'escape') {
            changeSceen(SCEEN.MAP);
        }
    }
};