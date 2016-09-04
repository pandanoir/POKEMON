import SCEEN from './definition/sceen.js';
import {pressedKey, key} from './definition/key.js';
import {tiles, tileSize} from './definition/mapImage.js';
import characterImage from './definition/characterImage.js';
import {UCircularSector, UGroup, UImage, ULine, UPoint, URect, USegment, UText} from './definition/unitary.js';
import {changeSceen} from './sceen.js';
import pokemonList from './pokemon.json';

export {SCEEN};
export {pressedKey,key};
export {tiles, tileSize};
export {characterImage};
export {UCircularSector, UGroup, UImage, ULine, UPoint, URect, USegment, UText};
export {pokemonList};
export const FPS = 32;
export const DEFAULT_FONT = '13px san-self',
    _dx = {left: -1, up: 0, right: 1, down: 0}, _dy = {left: 0, up: -1, right: 0, down: 1},
    canvasWidth = tileSize * 10, // canvas要素の幅
    canvasHeight = canvasWidth, // canvas要素の高さ
    menuList = ['pokemon', 'pokedex', 'status', 'setting', 'save'];
export const draw = {};
export const cursor = {
        y: 0
    },
    pokedex = {
        cursor: {
            y: 0
        },
        pageYOffset: 0 // pageYOffset is not pixel. this contains the number of line.
    },
    battle = {
        enemy: null,
        friend: null,
        enemyTrainer: null
    },
    player = new class Player {
        constructor() {
            this.x = 0;
            this.y = 0;
            this.walking = 0;
            this.dash = 0;
            this.direction = 'down';
            this.pokemons = [];
        }
        canMove(direction) {
            const dx = _dx[direction], dy = _dy[direction];
            const nextX = this.x + dx, nextY = this.y + dy;
            if (0 > nextX || nextX > mapWidth - 1 ||
                0 > nextY || nextY > mapHeight - 1) {
                return false;
            }
            if (obstacles.includes(map[nextX + nextY * mapWidth])) {
                return false;
            }
            let frontObject;
            for (frontObject of frontObjects) {
                if (obstacles.includes(frontObject[0]) &&
                    frontObject[1] === nextX &&
                    frontObject[2] === nextY) {
                    return false;
                }
            }
            return true;
        }
    };

export const dictionary = [];

// GRASSなどCONSTSを動的に生成
const CONSTS = Object.keys(tiles).map(item => item.toUpperCase());

// GRASS = 0; dictionary[0] = grass; などを動的に生成
for (let i = 0, _i = CONSTS.length; i < _i; i++) {
    window[CONSTS[i]] = i;
    dictionary[i] = tiles[CONSTS[i].toLowerCase()];
}

// 1次元配列でマップを表現
export const mapWidth = 12, // 下のmapの横幅
    mapHeight = 10; // 下のmapの縦の長さ
/*const map = [
    GRASS, GRASS, GRASS, GRASS, GRASS, GRASS, GRASS, GRASS,
GRASS, GRASS2, GRASS, GRASS,
    GRASS3, GRASS, GRASS, GRASS, GRASS, GRASS, GRASS, GRASS,
GRASS, GRASS, GRASS, GRASS,
    GRASS, GRASS, GRASS, GRASS, GRASS, GRASS, GRASS, GRASS,
GRASS, GRASS, GRASS, GRASS,
    GRASS, GRASS, GRASS, GRASS, GRASS, GRASS, GRASS, GRASS,
GRASS, GRASS, GRASS, GRASS,
    GRASS, GRASS, GRASS, GRASS, GRASS, GRASS, GRASS, GRASS,
GRASS, GRASS, GRASS, GRASS,
    GRASS, GRASS, GRASS, GRASS, GRASS, GRASS, GRASS, GRASS,
GRASS, GRASS, GRASS, GRASS,
    GRASS, GRASS, GRASS, GRASS, GRASS, GRASS, GRASS, GRASS,
GRASS, GRASS, GRASS, GRASS,
    GRASS, GRASS, GRASS, GRASS, GRASS, GRASS, GRASS, GRASS,
GRASS, GRASS, GRASS, GRASS,
    GRASS, GRASS, GRASS, GRASS, GRASS, GRASS, GRASS, GRASS,
GRASS, GRASS, GRASS, GRASS,
    GRASS, GRASS, GRASS, GRASS, GRASS, GRASS, GRASS, GRASS,
GRASS, GRASS, GRASS, GRASS
];*/
export const map = [
    GRASS2, GRASS2, GRASS2, GRASS2, GRASS2, GRASS2, GRASS2, GRASS2,
GRASS2, GRASS2, GRASS2, GRASS2,
    GRASS2, GRASS2, GRASS2, GRASS2, GRASS2, GRASS2, GRASS2, GRASS2,
GRASS2, GRASS2, GRASS2, GRASS2,
    GRASS2, GRASS2, GRASS2, GRASS2, GRASS2, GRASS2, GRASS2, GRASS2,
GRASS2, GRASS2, GRASS2, GRASS2,
    GRASS2, GRASS2, GRASS2, GRASS2, GRASS2, GRASS2, GRASS2, GRASS2,
GRASS2, GRASS2, GRASS2, GRASS2,
    GRASS2, GRASS2, GRASS2, GRASS2, GRASS2, GRASS2, GRASS2, GRASS2,
GRASS2, GRASS2, GRASS2, GRASS2,
    GRASS2, GRASS2, GRASS2, GRASS2, GRASS2, GRASS2, GRASS2, GRASS2,
GRASS2, GRASS2, GRASS2, GRASS2,
    GRASS2, GRASS2, GRASS2, GRASS2, GRASS2, GRASS2, GRASS2, GRASS2,
GRASS2, GRASS2, GRASS2, GRASS2,
    GRASS2, GRASS2, GRASS2, GRASS2, GRASS2, GRASS2, GRASS2, GRASS2,
GRASS2, GRASS2, GRASS2, GRASS2,
    GRASS2, GRASS2, GRASS2, GRASS2, GRASS2, GRASS2, GRASS2, GRASS2,
GRASS2, GRASS2, GRASS2, GRASS2,
    GRASS2, GRASS2, GRASS2, GRASS2, GRASS2, GRASS2, GRASS2, GRASS2,
GRASS2, GRASS2, GRASS2, GRASS2
];

// アイテムが重なることを考慮してmap形式ではなく、[object, x, y]という配列でfrontObjectsを保持
// objectはタイルのID(CONSTS)を入れる
export let message = {};
export const backObjects = [
    ],
    frontObjects = [
        [SIGN, 1, 0, () => {
            message = {text: 'ここは はじまりの むら', next: () => changeSceen(SCEEN.MAP)}
            changeSceen(SCEEN.MESSAGE);
        }],

        [ROOF1, 2, 0],
        [ROOF2, 3, 0],
        [ROOF3, 4, 0],
        [ROOF4, 5, 0],
        [ROOF5, 6, 0],

        [ROOF6, 2, 1],
        [ROOF7, 3, 1],
        [ROOF8, 4, 1],
        [ROOF9, 5, 1],
        [ROOF10, 6, 1],

        [ROOF11, 2, 2],
        [ROOF12, 3, 2],
        [ROOF13, 4, 2],
        [ROOF14, 5, 2],
        [ROOF15, 6, 2]
    ],
    obstacles = [
        SIGN,
        ROOF3,

        ROOF6,
        ROOF7,
        ROOF8,
        ROOF9,
        ROOF10,

        ROOF11,
        ROOF12,
        ROOF13,
        ROOF14,
        ROOF15
    ];
export let canvas, buffer;
export let lineHeight;

window.addEventListener('load', () => {
    canvas = new Canvas('canvas');
    canvas.mode = 'normal';

    buffer = new Canvas('buffer');
    buffer.mode = 'normal';
    
    lineHeight = canvas.canvas.measureText('あ').width;
});
export function setupCanvas() {
    buffer.clear();
    buffer.removeAllObjects();
};
export function drawCanvas() {
    buffer.draw().then(() => {
        canvas.canvas.putImageData(
            buffer.canvas.getImageData(
                0, 0, canvasWidth, canvasHeight
            ), 0, 0
        );
    });
}
export function zerofill(n, m) {
    return '0'.repeat(m - ('' + n).length) + n;
}