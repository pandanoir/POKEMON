import draw from './draw/drawBattle.js';
import {pressedKey, cursor, SCEEN} from './definitions.js';
import {changeSceen} from './sceen.js';

const commands = [['battle', 'item'], ['pokemon', 'escape']];
const out = {};
out[SCEEN.BATTLE.MAIN] = () => {
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
        const command = commands[cursor.y][cursor.x];
        if (command === 'battle') {
            changeSceen(SCEEN.BATTLE.MOVE);
        }
        if (command === 'item') {
            changeSceen(SCEEN.BATTLE.ITEM);
        }
        if (command === 'pokemon') {
            changeSceen(SCEEN.BATTLE.CHANGE_POKEMON);
        }
        if (command === 'escape') {
            changeSceen(SCEEN.MAP);
        }
    }
};
out[SCEEN.BATTLE.ITEM] = () => {};
out[SCEEN.BATTLE.MOVE] = () => {};
out[SCEEN.BATTLE.CHANGE_POKEMON] = () => {};
out[SCEEN.BATTLE.ATTACK] = () => {};

export default out;