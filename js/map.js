import draw, {walk} from './drawMap.js';
import {player, pressedKey, cursor, _dx, _dy, frontObjects, SCEEN} from './definitions.js';
import {changeSceen} from './sceen.js';

export default () => {
    if (player.walking === 0 && player.dash === 0) {
        for (let d = 0, dir = ['left', 'up', 'right', 'down']; d < 4; d++) {
            if (pressedKey[dir[d]] > 0) {
                player.direction = dir[d];
                if (player.canMove(dir[d])) {
                    if (pressedKey.shift > 0) {
                        player.dash = 1;
                    } else {
                        player.walking = 1;
                    }
                }
                break;
            }
        }
    }
    if (pressedKey.M === 1) {
        cursor.y = 0;
        changeSceen(SCEEN.MENU);
    }
    if (pressedKey.space === 1) {
        const dx = _dx[player.direction];
        const dy = _dy[player.direction];
        for (let i = 0, _i = frontObjects.length; i < _i; i = 0 | i + 1) {
            if (frontObjects[i][1] === player.x + dx && frontObjects[i][2] === player.y + dy) {
                if (frontObjects[i][3]) frontObjects[i][3](); // cause action. read sign, talk with clerk or open treasure box!
            }
        }
    }
    draw();
    walk();
};