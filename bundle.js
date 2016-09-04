const FPS = 32;
const UGroup$1 = Unitary.Group;
const UImage$1 = Unitary.Image;
const ULine = Unitary.Line;
const UPoint$1 = Unitary.Point;
const URect$1 = Unitary.Rect;
const UText$1 = Unitary.Text;
const SCEEN_BATTLE = 'BATTLE';
const SCEEN_MAP = 'MAP';
const SCEEN_MENU$1 = 'MENU';
const SCEEN_MESSAGE = 'MESSAGE';
const SCEEN_POKEDEX_INDEX = 'POKEDEX_INDEX';
const SCEEN_POKEDEX_DETAIL = 'POKEDEX_DETAIL';
const SCEEN_LOADING = 'LOADING';
const SCEEN_START = SCEEN_MAP;
const mapSrc = './map/shops.gif';
window.addEventListener('load', () => {
    Canvas.preload(
        mapSrc,
        './chara1/left.png',
        './chara1/left1.png',
        './chara1/left2.png',
        './chara1/back.png',
        './chara1/back1.png',
        './chara1/back2.png',
        './chara1/right.png',
        './chara1/right1.png',
        './chara1/right2.png',
        './chara1/front.png',
        './chara1/front1.png',
        './chara1/front2.png'
    ).then(() => {
        //d;
    });
});
let sceen = SCEEN_START;
const DEFAULT_FONT$1 = '13px san-self';
const _dx = {left: -1, up: 0, right: 1, down: 0};
const _dy = {left: 0, up: -1, right: 0, down: 1};
const tileSize = 32;
const canvasWidth$1 = tileSize * 10;
const canvasHeight$1 = canvasWidth$1;
const pressedKey = {
    };
const key$1 = {
        shift: 16,
        space: 32,
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        B: 66,
        M: 77
    };
const menuList = ['pokemon', 'pokedex', 'status', 'setting', 'save'];
for (var _key of Object.keys(key$1)) {
    key$1['key' + key$1[_key]] = _key; // c.f: key['key16'] = 'shift';
    pressedKey[_key] = 0;
}
const cursor = {
        y: 0
    };
const pokedex = {
        cursor: {
            y: 0
        },
        pageYOffset: 0 // pageYOffset is not pixel. this contains the number of line.
    };
const battle$1 = {
        enemy: null,
        friend: null,
        enemyTrainer: null
    };
const player = {
        x: 0,
        y: 0,
        walking: 0,
        dash: 0,
        direction: 'down',
        pokemons: [],
        canMove: function(direction) {
            const dx = _dx[direction], dy = _dy[direction];
            const nextX = this.x + dx, nextY = this.y + dy;
            if (0 > nextX || nextX > mapWidth - 1 ||
                0 > nextY || nextY > mapHeight - 1) {
                return false;
            }
            if (obstacles.includes(map[nextX + nextY * mapWidth])) {
                return false;
            }
            for (var frontObject of frontObjects) {
                if (obstacles.includes(frontObject[0]) &&
                    frontObject[1] === nextX &&
                    frontObject[2] === nextY) {
                    return false;
                }
            }
            return true;
        }
    };
const mapImage = new UImage$1(mapSrc, new UPoint$1(0, 0));
const tiles = {
        grass: new UPoint$1(0, 256),
        grass2: new UPoint$1(96, 256),
        grass3: new UPoint$1(6 * 32, 0),
        sign: new UPoint$1(928, 64),

        roof1: new UPoint$1(800, 96),
        roof2: new UPoint$1(800 + 32, 96),
        roof3: new UPoint$1(800 + 64, 96),
        roof4: new UPoint$1(800 + 96, 96),
        roof5: new UPoint$1(800 + 128, 96),

        roof6: new UPoint$1(384, 384 - 32),
        roof7: new UPoint$1(384 + 32, 384 - 32),
        roof8: new UPoint$1(384 + 64, 384 - 32),
        roof9: new UPoint$1(384 + 96, 384 - 32),
        roof10: new UPoint$1(384 + 128, 384 - 32),

        roof11: new UPoint$1(384, 384),
        roof12: new UPoint$1(384 + 32, 384),
        roof13: new UPoint$1(384 + 64, 384),
        roof14: new UPoint$1(384 + 96, 384),
        roof15: new UPoint$1(384 + 128, 384)
    };
{
    let key;
    for (key of Object.keys(tiles)) {
        tiles[key] = mapImage.trim(tiles[key], tileSize, tileSize);
    }
}
const characterImage = {
        left: new UImage$1('./chara1/left.png', new UPoint$1(0, 0)),
        left1: new UImage$1('./chara1/left1.png', new UPoint$1(0, 0)),
        left2: new UImage$1('./chara1/left2.png', new UPoint$1(0, 0)),

        up: new UImage$1('./chara1/back.png', new UPoint$1(0, 0)),
        up1: new UImage$1('./chara1/back1.png', new UPoint$1(0, 0)),
        up2: new UImage$1('./chara1/back2.png', new UPoint$1(0, 0)),

        right: new UImage$1('./chara1/right.png', new UPoint$1(0, 0)),
        right1: new UImage$1('./chara1/right1.png', new UPoint$1(0, 0)),
        right2: new UImage$1('./chara1/right2.png', new UPoint$1(0, 0)),

        down: new UImage$1('./chara1/front.png', new UPoint$1(0, 0)),
        down1: new UImage$1('./chara1/front1.png', new UPoint$1(0, 0)),
        down2: new UImage$1('./chara1/front2.png', new UPoint$1(0, 0))
    };
const dictionary = [];
// GRASSなどCONSTSを動的に生成
const CONSTS = Object.keys(tiles).map(item => item.toUpperCase());

// GRASS = 0; dictionary[0] = grass; などを動的に生成
for (let i = 0, _i = CONSTS.length; i < _i; i++) {
    window[CONSTS[i]] = i;
    dictionary[i] = tiles[CONSTS[i].toLowerCase()];
}

// 1次元配列でマップを表現
const mapWidth = 12;
const mapHeight = 10;
// 下のmapの縦の長さ
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
const map = [
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
let message$1 = {};
const backObjects = [
    ];
const frontObjects = [
        [SIGN, 1, 0, () => {
            message$1 = {text: 'ここは はじまりの むら', next: () => changeSceen(SCEEN_MAP)}
            changeSceen(SCEEN_MESSAGE);
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
    ];
const obstacles = [
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
let canvas;
let buffer$1;
let lineHeight;
let pokemonList;
const preloadPokemonImage = new Promise(function(resolve, reject) {
        const xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200 || this.responseURL.slice(0, 8) === 'file:///') {
                    if (this.response) {
                        pokemonList = this.response;
                        resolve();
                    }
                } else {
                    reject();
                }
            }
        };
        xmlHttpRequest.open('GET', './js/pokemon.json', true);
        xmlHttpRequest.responseType = 'json';
        xmlHttpRequest.send(null);
    }).catch(e => console.log(e));

window.addEventListener('load', () => {
    canvas = new Canvas('canvas');
    canvas.mode = 'normal';

    buffer$1 = new Canvas('buffer');
    buffer$1.mode = 'normal';
    
    lineHeight = canvas.canvas.measureText('あ').width;
});
function changeSceen(name) {
    sceen = name;
}

var draw = () => {
    const boardHeight = 70;
    const board = new UGroup$1(
        new URect$1(new UPoint$1(0, canvasHeight$1 - boardHeight), new UPoint$1(canvasWidth$1, canvasHeight$1)).setFillColor('#000')
    );
    const messageText = newUText(battle$1.enemy.name + ' が あらわれた！', new UPoint$1(9, canvasHeight$1 - boardHeight + 9));
    const commands = new UGroup$1(
            new URect$1(new UPoint$1(180 - 9, canvasHeight$1 - boardHeight + 9), new UPoint$1(canvasWidth$1 - 9, canvasHeight$1 - 9)).setStrokeColor('#fff'),
            newUText('たたかう', new UPoint$1(200, canvasHeight$1 - boardHeight + 9 + 5)),
            newUText('どうぐ', new UPoint$1(270, canvasHeight$1 - boardHeight + 9 + 5)),
            newUText('ポケモン', new UPoint$1(200, canvasHeight$1 - boardHeight + 9 + 5 + lineHeight)),
            newUText('にげる', new UPoint$1(270, canvasHeight$1 - boardHeight + 9 + 5 + lineHeight))
        );
    const cursorText = newUText('>', new UPoint$1(190 + cursor.x * 70, canvasHeight$1 - boardHeight + 9 + 5 + lineHeight * cursor.y));

    const enemyImage = new UImage$1('./pokemon/' + battle$1.enemy.src, new UPoint$1(0, 0));

    function newUText(string, point) {
        return new UText$1(string, point).setFillColor('#fff').setBaseline('top').setFont(DEFAULT_FONT$1);
    };
    buffer.add(enemyImage);
    buffer.add(board);
    buffer.add(messageText);
    buffer.add(commands);
    buffer.add(cursorText);
};

const commands = [['battle', 'item'], ['pokemon', 'escape']];
var battle = () => {
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
    if (pressedKey.M === 1) {
        cursor.y = 0;
        changeSceen(SCEEN_MENU$1);
    }
    if (pressedKey.space === 1) {
        if (commands[cursor.y][cursor.x] === 'escape') {
            changeSceen(SCEEN_MAP);
        }
    }
};

var draw$2 = () => {
    buffer.add(new UText('loading...', new UPoint(canvasWidth / 2, canvasHeight / 2)).setAlign('center').setBaseline('middle').setFont(DEFAULT_FONT));
};

var loading = () => {
    draw$2();
};

const walkingStep = 0 | FPS / 5;
const ENCOUNTER_RATE = 8;
var drawMap = () => {
    let dx = 0,
        dy = 0;

    const walking = 0 | player.walking / (walkingStep / 4);
    const dash = 0 | player.dash / (walkingStep / 4);
    if (player.direction === 'left')
        dx = walking * 8 + dash * 16; // if dash !== 0, walking is always 0.
    if (player.direction === 'up')
        dy = walking * 8 + dash * 16;
    if (player.direction === 'right')
        dx = - walking * 8 - dash * 16;
    if (player.direction === 'down')
        dy = - walking * 8 - dash * 16;

    // drawing map
    buffer$1.add(new URect$1(new UPoint$1(0, 0), new UPoint$1(canvasWidth$1, canvasHeight$1)).setFillColor('#000'));
    for (let x = 0; x < mapWidth; x++) {
        for (let y = 0; y < mapHeight; y++) {
            buffer$1.add(
                dictionary[map[x + y * mapWidth]]
                .move(
                    (x - player.x + 5) * tileSize + dx, // add 5 to center character
                    (y - player.y + 5) * tileSize + dy
                )
            );
        }
    }

    // drawing back object
    for (var backObject of backObjects) {
        const x = backObject[1], y = backObject[2];
        buffer$1.add(
            dictionary[backObject[0]]
            .move(
                (x - player.x + 5) * tileSize + dx, // add 5 to center character
                (y - player.y + 5) * tileSize + dy
            )
        );
    }

    // drawing character
    if (walking === 0 && dash === 0) {
        buffer$1.add(
            characterImage[player.direction]
            .move(5 * tileSize, 5 * tileSize)
        );
    } else {
        buffer$1.add(
            characterImage[player.direction + ((walking + dash) % 2 + 1)]
            .move(5 * tileSize, 5 * tileSize)
        );
    }

    // drawing front object
    for (var frontObject of frontObjects) {
        // add 5 to center character
        const x = frontObject[1], y = frontObject[2];
        buffer$1.add(
            dictionary[frontObject[0]].move(
                (x - player.x + 5) * tileSize + dx,
                (y - player.y + 5) * tileSize + dy
            )
        );
    }
}
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
            battle$1.enemy = pokemonList[Math.random() * pokemonList.length | 0];
            battle$1.friend = player.pokemons[0];
            battle$1.enemyTraimaxXner = null;
            cursor.x = 0;
            cursor.y = 0;
            cursor.maxX = 1;
            cursor.maxY = 1;
            changeSceen(SCEEN_BATTLE);
        }
    }
}

var map$1 = () => {
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
        changeSceen(SCEEN_MENU);
    }
    if (pressedKey.space === 1) {
        const dx = _dx[player.direction];
        const dy = _dy[player.direction];
        for (var frontObject of frontObjects) {
            if (frontObject[1] === player.x + dx && frontObject[2] === player.y + dy) {
                if (frontObject[3]) frontObject[3](); // cause action. read sign, talk with clerk or open treasure box!
            }
        }
    }
    drawMap();
    walk();
};

var draw$3 = () => {
    const titleHeight = 16;
    const title = newUText('Menu', new UPoint$1(0, 0)).setFont('16px san-self');
    const board = new UGroup$1(
        new URect$1(new UPoint$1(0, 0), new UPoint$1(80, canvasHeight)).setFillColor('#000'),
        new ULine(new UPoint$1(76, 0), new UPoint$1(76,320)).setStrokeColor('#fff')
    );
    const cursorText = newUText('>', new UPoint$1(0, cursor.y * lineHeight + titleHeight));

    buffer$1.add(board);
    buffer$1.add(title);
    buffer$1.add(cursorText);
    for (let i = 0, _i = menuList.length; i < _i; i++) {
        buffer$1.add(newUText(menuList[i], new UPoint$1(lineHeight, i * lineHeight + titleHeight)));
    }
    function newUText(string, point) {
        return new UText$1(string, point).setFillColor('#fff').setBaseline('top').setFont(DEFAULT_FONT$1);
    };
};

let movesCursor = 0;
var menu = () => {
    drawMap();
    draw$3();
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

var draw$4 = () => {
    const boardHeight = 100;
    const messageBoard = new UGroup(
        new URect(new UPoint(0, canvasHeight - boardHeight), new UPoint(canvasWidth, canvasHeight)).setFillColor('#000'),
        new USegment(new UPoint(5, canvasHeight - boardHeight + 5), new UPoint(canvasWidth - 5, canvasHeight - boardHeight + 5)).setStrokeColor('#fff'),
        new USegment(new UPoint(5, canvasHeight - boardHeight + 5), new UPoint(5, canvasHeight - 5)).setStrokeColor('#fff'),
        new USegment(new UPoint(5, canvasHeight - 5), new UPoint(canvasWidth - 5, canvasHeight - 5)).setStrokeColor('#fff'),
        new USegment(new UPoint(canvasWidth - 5, canvasHeight - boardHeight + 5), new UPoint(canvasWidth - 5, canvasHeight - 5)).setStrokeColor('#fff')
    );
    const messageText = newUText(message.text, new UPoint(9, canvasHeight - boardHeight + 9));

    buffer.add(messageBoard);
    buffer.add(messageText);
    function newUText(string, point) {
        return new UText(string, point).setFillColor('#fff').setBaseline('top').setFont(DEFAULT_FONT);
    };
};

var message$2 = () => {
    drawMap();
    draw$4();
    if (pressedKey.space === 1) {
        message$1.next();
    }
};

var draw$5 = (id) => {
    const name = new UGroup$1(
        new URect$1(new UPoint$1(0, 0), new UPoint$1(150, 24)).setFillColor('#fff'),
        new URect$1(new UPoint$1(0, 0), new UPoint$1(150, 24)),
        newUText('No ' + zerofill(id + 1, 3) + ' ' +pokemonList[id].name, new UPoint$1(3, 2))
    );

    buffer$1.add(new UImage('./pokemon/' + pokemonList[id].src, new UPoint$1(0, 0)));
    buffer$1.add(name);

    function newUText(string, point) {
        return new UText$1(string, point).setFillColor('#555').setBaseline('top').setFont(DEFAULT_FONT$1);
    };
};

var pokedexDetail = () => {
    draw$5(pokedex.detailID);
    if (pressedKey.space === 1 || pressedKey.B === 1) {
        changeSceen(SCEEN_POKEDEX_INDEX);
    }
}

var draw$6 = () => {
    const cursorText = newUText('>', new UPoint$1(0, (pokedex.cursor.y - pokedex.pageYOffset) * lineHeight));

    buffer$1.add(cursorText);
    for (let i = 0, _i = pokemonList.length; i < _i; i++) {
        buffer$1.add(newUText('No ' + zerofill(i + 1, 3), new UPoint$1(lineHeight, (i - pokedex.pageYOffset) * lineHeight)));
        buffer$1.add(newUText(pokemonList[i].name, new UPoint$1(lineHeight * 6, (i - pokedex.pageYOffset) * lineHeight)));
    }
    function newUText(string, point) {
        return new UText$1(string, point).setFillColor('#555').setBaseline('top').setFont('13px san-self');
    };
};

let movesCursor$2 = 0;
var pokedexIndex = () => {
    draw$6();
    if ((pressedKey.up === 1 || pressedKey.up > 20)
        && movesCursor$2 === 0 && pokedex.cursor.y - 1 >= 0) {
        pokedex.cursor.y--;
        if (pokedex.cursor.y - pokedex.pageYOffset <= 5 && pokedex.pageYOffset - 1 >= 0) {
            pokedex.pageYOffset--;
        }
        movesCursor$2 = 1;
    }
    if ((pressedKey.down === 1 || pressedKey.down > 20)
        && movesCursor$2 === 0) {
        pokedex.cursor.y++;
        if (pokedex.cursor.y - pokedex.pageYOffset >= 25 && (pokemonList.length - (pokedex.pageYOffset)) * lineHeight >= canvasHeight$1) {
            pokedex.pageYOffset++;
        }
        movesCursor$2 = 1;
    }
    if (pressedKey.space === 1) {
        pokedex.detailID = pokedex.cursor.y;
        changeSceen(SCEEN_POKEDEX_DETAIL);
    }
    if (pressedKey.B === 1) {
        changeSceen(SCEEN_MENU$1);
    }
    if (movesCursor$2 !== 0) {
        movesCursor$2++;
    }
    if (movesCursor$2 === 11) {
        movesCursor$2 = 0;
    }
}

const __pressedKey = {};
window.addEventListener('keydown', e => __pressedKey[key$1['key' + e.keyCode]] = true);
window.addEventListener('keyup', e => __pressedKey[key$1['key' + e.keyCode]] = false);
var keyEvent = () => {
    let key;
    for (key of Object.keys(pressedKey)) {
        if (__pressedKey[key]) {
            pressedKey[key]++;
        } else {
            pressedKey[key] = 0;
        }
    }
};

const mainLoop = {
    list: [],
    listOnce: []
};
mainLoop.fire = function() {
    for (var func of this.list) {
        func();
    }
    for (var func of this.listOnce) {
        func();
    }
    this.listOnce = [];
};
mainLoop.add = function(f) {
    this.list[this.list.length] = f;
};
mainLoop.addOnce = function(f) {
    this.listOnce[this.listOnce.length] = f;
};
mainLoop.start = function() {
    setInterval(this.fire.bind(this), 1000 / FPS);
};

mainLoop.add(keyEvent);

const sceenFunc = {
    SCEEN_BATTLE: battle,
    SCEEN_LOADING: loading,
    SCEEN_MAP: map$1,
    SCEEN_MENU: menu,
    SCEEN_MESSAGE: message$2,
    SCEEN_POKEDEX_INDEX: pokedexIndex,
    SCEEN_POKEDEX_DETAIL: pokedexDetail
};
let key;
for (key of Object.keys(sceenFunc)) {
    const SCEEN = key, func = sceenFunc[key];
    mainLoop.add(() => {
        if (sceen === SCEEN) { // SCEEN_LOADING, SCEEN_MAP, etc...
            setupCanvas();
            func(); // loading(), map(), etc...
            drawCanvas();
        }
    });
}

const windowLoad = new Promise((resolve, reject) => {
    window.addEventListener('load', resolve);
});
Promise.all([preloadPokemonImage, windowLoad]).then(() => {
    changeSceen(SCEEN_LOADING);
    const pokemonImage = pokemonList.map(_ => './pokemon/' + _.src);
    Canvas.preload(...pokemonImage).then(() => {
        changeSceen(SCEEN_START);
    });
}).catch(e => console.log(e));

windowLoad.then(mainLoop.start.bind(mainLoop));