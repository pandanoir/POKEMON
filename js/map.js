import draw from './draw/drawMap.js';
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
function walk() {
    if (player.walking !== 0) {
        player.walking++;
    }
    if (player.dash !== 0) {
        player.dash++;
    }
    if (player.walking === walkingStep + 1 || player.dash === walkingStep / 2 + 1) {
        player.walking = 0;
        player.dash = 0;
        if (player.direction === 'left') {
            player.x--;
        } else if (player.direction === 'up') {
            player.y--;
        } else if (player.direction === 'right') {
            player.x++;
        } else if (player.direction === 'down') {
            player.y++;
        }
        encount();
    }
}
function encount() {
    if (map[player.x + player.y * mapWidth] === GRASS2) {
        if (ENCOUNTER_RATE >= Math.random() * 100 | 0) {
            battle.enemy = pokemonList[Math.random() * pokemonList.length | 0];
            battle.friend = player.pokemons[0];
            battle.enemyTraimaxXner = null;
            cursor.x = 0;
            cursor.y = 0;
            cursor.maxX = 1;
            cursor.maxY = 1;
            changeSceen(SCEEN.BATTLE.MAIN);
        }
    }
}