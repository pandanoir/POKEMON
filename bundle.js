const sceen = {
    BATTLE: {
        MAIN: 'BATTLE_MAIN',
        ITEM: 'BATTLE_ITEM',
        MOVE: 'BATTLE_MOVE',
        CHANGE_POKEMON: 'BATTLE_CHANGE_POKEMON',
        ATTACK: 'BATTLE_ATTACK'
    },
    MAP: 'MAP',
    MENU: 'MENU',
    MESSAGE: 'MESSAGE',
    POKEDEX: {
        INDEX: 'POKEDEX_INDEX',
        DETAIL: 'POKEDEX_DETAIL'
    },
    LOADING: 'LOADING'
};
sceen.START = sceen.MAP;

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
let _key;
for (_key of Object.keys(key$1)) {
    key$1['key' + key$1[_key]] = _key; // c.f: key['key16'] = 'shift';
    pressedKey[_key] = 0;
}

const UGroup = Unitary.Group;
const UImage = Unitary.Image;
const ULine = Unitary.Line;
const UPoint = Unitary.Point;
const URect = Unitary.Rect;
const USegment = Unitary.Segment;
const UText = Unitary.Text;

const mapSrc = './map/shops.gif';
const mapImage = new UImage(mapSrc, new UPoint(0, 0));
const tiles = {
        grass: new UPoint(0, 256),
        grass2: new UPoint(96, 256),
        grass3: new UPoint(6 * 32, 0),
        sign: new UPoint(928, 64),

        roof1: new UPoint(800, 96),
        roof2: new UPoint(800 + 32, 96),
        roof3: new UPoint(800 + 64, 96),
        roof4: new UPoint(800 + 96, 96),
        roof5: new UPoint(800 + 128, 96),

        roof6: new UPoint(384, 384 - 32),
        roof7: new UPoint(384 + 32, 384 - 32),
        roof8: new UPoint(384 + 64, 384 - 32),
        roof9: new UPoint(384 + 96, 384 - 32),
        roof10: new UPoint(384 + 128, 384 - 32),

        roof11: new UPoint(384, 384),
        roof12: new UPoint(384 + 32, 384),
        roof13: new UPoint(384 + 64, 384),
        roof14: new UPoint(384 + 96, 384),
        roof15: new UPoint(384 + 128, 384)
    };
const tileSize = 32;
let key$2;
for (key$2 of Object.keys(tiles)) {
    tiles[key$2] = mapImage.trim(tiles[key$2], tileSize, tileSize);
}
Canvas.preload(mapSrc);

const characterImage = {
    left: './chara1/left.png',
    left1: './chara1/left1.png',
    left2: './chara1/left2.png',

    up: './chara1/back.png',
    up1: './chara1/back1.png',
    up2: './chara1/back2.png',

    right: './chara1/right.png',
    right1: './chara1/right1.png',
    right2: './chara1/right2.png',

    down: './chara1/front.png',
    down1: './chara1/front1.png',
    down2: './chara1/front2.png'
};
Canvas.preload(...Object.keys(characterImage).map(key => characterImage[key]));
let key$3;
for (key$3 of Object.keys(characterImage)) {
    characterImage[key$3] = new UImage(characterImage[key$3], new UPoint(0, 0));
}

let sceen$1 = sceen.START;
function changeSceen(name) {
    mainLoop.addOnce(() => sceen$1 = name); // sceen = name causes message skip
}
function sceenEquals(name) {
    return name === sceen$1;
}

var pokemonList$1 = [
    {"name": "アクサワー", "src": "akusawa.png"},
    {"name": "ビビン", "src": "bibin.png"},
    {"name": "ボボヌザウルス", "src": "bobonuzaurusu.png"},
    {"name": "ブベツ", "src": "bubetu.png"},
    {"name": "ブロロウ", "src": "burorou.png"},
    {"name": "ビョロボロ", "src": "byoroboro.png"},
    {"name": "ヂヴァザン", "src": "divazan.png"},
    {"name": "ドドロノゴメス", "src": "dodoronogomesu.png"},
    {"name": "ドフ", "src": "dohu.png"},
    {"name": "フェイク", "src": "feiku.png"},
    {"name": "フォッド", "src": "foddo.png"},
    {"name": "ごんざれす", "src": "gonzaresu.png"},
    {"name": "ハンシー", "src": "hanshi.png"},
    {"name": "ヘィローセ", "src": "heirose.png"},
    {"name": "ヒネリ", "src": "hineri.png"},
    {"name": "ホッソクァス", "src": "hossoqasu.png"},
    {"name": "イパサスコ", "src": "ipasasuko.png"},
    {"name": "ジャネン", "src": "janen.png"},
    {"name": "コムシ", "src": "komushi.png"},
    {"name": "コロゾウ", "src": "korozou.png"},
    {"name": "マクジョウ", "src": "makujou.png"},
    {"name": "マムー", "src": "mamu-.png"},
    {"name": "まさる", "src": "masaru2.png"},
    {"name": "モシモ", "src": "moshimo.png"},
    {"name": "ンバジョー", "src": "nbajo.png"},
    {"name": "ピサンチョー", "src": "pisantyo.png"},
    {"name": "ラストダンケ", "src": "rasutodanke.png"},
    {"name": "サイコ", "src": "saiko.png"},
    {"name": "サーフェイズ", "src": "sa-feizu.png"},
    {"name": "スサイミ", "src": "susaimi.png"},
    {"name": "テカイン", "src": "tekain.png"},
    {"name": "テラオン", "src": "teraon.png"},
    {"name": "チュパンディ", "src": "tyupandhi.png"},
    {"name": "ウラミ", "src": "urami.png"},
    {"name": "ハットゥ", "src": "hatto.png"},
    {"name": "ドンブゥディー", "src": "donbudhi.png"},
    {"name": "ピャーラン", "src": "pyaran.png"},
    {"name": "闇", "src": "yami.png"},
    {"name": "ギャンキュー", "src": "gyankyu.png"},
    {"name": "undefined", "src": "BSL5LWDCMAEyLb5.png"},
    {"name": "undefined", "src": "BSL9shmCAAAMDM8.png"},
    {"name": "undefined", "src": "BSMtg9xCcAEci2e.png"}
]
;

const FPS = 32;
const DEFAULT_FONT = '13px san-self';
const _dx = {left: -1, up: 0, right: 1, down: 0};
const _dy = {left: 0, up: -1, right: 0, down: 1};
const canvasWidth = tileSize * 10;
const canvasHeight = canvasWidth;
const menuList = ['pokemon', 'pokedex', 'status', 'setting', 'save'];
const cursor = {
        y: 0
    };
const battle$1 = {
        enemy: null,
        friend: null,
        enemyTrainer: null
    };
const player = new class Player {
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
            if (0 > nextX || nextX > mapWidth$1 - 1 ||
                0 > nextY || nextY > mapHeight - 1) {
                return false;
            }
            if (obstacles.includes(map$1[nextX + nextY * mapWidth$1])) {
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
const dictionary = [];

// GRASSなどCONSTSを動的に生成
const CONSTS = Object.keys(tiles).map(item => item.toUpperCase());

// GRASS = 0; dictionary[0] = grass; などを動的に生成
for (let i = 0, _i = CONSTS.length; i < _i; i++) {
    window[CONSTS[i]] = i;
    dictionary[i] = tiles[CONSTS[i].toLowerCase()];
}

// 1次元配列でマップを表現
const mapWidth$1 = 12;
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
const map$1 = [
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
let message = {};
const backObjects = [
    ];
const frontObjects = [
        [SIGN, 1, 0, () => {
            message = {text: 'ここは はじまりの むら', next: () => changeSceen(sceen.MAP)}
            changeSceen(sceen.MESSAGE);
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
let buffer;
let lineHeight;

window.addEventListener('load', () => {
    canvas = new Canvas('canvas');
    canvas.mode = 'normal';

    buffer = new Canvas('buffer');
    buffer.mode = 'normal';
    
    lineHeight = canvas.canvas.measureText('あ').width;
});
function setupCanvas() {
    buffer.clear();
    buffer.removeAllObjects();
};
function drawCanvas() {
    buffer.draw().then(() => {
        canvas.canvas.putImageData(
            buffer.canvas.getImageData(
                0, 0, canvasWidth, canvasHeight
            ), 0, 0
        );
    });
}

const mainLoop = new class MainLoop {
    constructor() {
        this.list = [];
        this.listOnce = [];
    }
    fire() {
        let func;
        for (func of this.list) {
            func();
        }
        for (func of this.listOnce) {
            func();
        }
        this.listOnce = [];
    }
    add(f) {
        this.list[this.list.length] = f;
    }
    addOnce(f) {
        this.listOnce[this.listOnce.length] = f;
    }
    start() {
        setInterval(this.fire.bind(this), 1000 / FPS);
    }
}

var draw$1 = () => {
    const boardHeight = 70;
    const board = new UGroup(
        new URect(new UPoint(0, canvasHeight - boardHeight), new UPoint(canvasWidth, canvasHeight)).setFillColor('#000')
    );
    const messageText = newUText(battle$1.enemy.name + ' が あらわれた！', new UPoint(9, canvasHeight - boardHeight + 9));
    const commands = new UGroup(
            new URect(new UPoint(180 - 9, canvasHeight - boardHeight + 9), new UPoint(canvasWidth - 9, canvasHeight - 9)).setStrokeColor('#fff'),
            newUText('たたかう', new UPoint(200, canvasHeight - boardHeight + 9 + 5)),
            newUText('どうぐ', new UPoint(270, canvasHeight - boardHeight + 9 + 5)),
            newUText('ポケモン', new UPoint(200, canvasHeight - boardHeight + 9 + 5 + lineHeight)),
            newUText('にげる', new UPoint(270, canvasHeight - boardHeight + 9 + 5 + lineHeight))
        );
    const cursorText = newUText('>', new UPoint(190 + cursor.x * 70, canvasHeight - boardHeight + 9 + 5 + lineHeight * cursor.y));

    const enemyImage = new UImage('./pokemon/' + battle$1.enemy.src, new UPoint(0, 0));

    function newUText(string, point) {
        return new UText(string, point).setFillColor('#fff').setBaseline('top').setFont(DEFAULT_FONT);
    };
    buffer.add(enemyImage);
    buffer.add(board);
    buffer.add(messageText);
    buffer.add(commands);
    buffer.add(cursorText);
};

const commands = [['battle', 'item'], ['pokemon', 'escape']];
var battle$2 = () => {
    draw$1();
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
            changeSceen(sceen.BATTLE.MOVE);
        }
        if (command === 'item') {
            changeSceen(sceen.BATTLE.ITEM);
        }
        if (command === 'pokemon') {
            changeSceen(sceen.BATTLE.CHANGE_POKEMON);
        }
        if (command === 'escape') {
            changeSceen(sceen.MAP);
        }
    }
};

var draw$2 = () => {
    buffer.add(new UText('loading...', new UPoint(canvasWidth / 2, canvasHeight / 2)).setAlign('center').setBaseline('middle').setFont(DEFAULT_FONT));
};

var loading = () => {
    draw$2();
};

const walkingStep$1 = 0 | FPS / 5;
var drawMap = () => {
    let dx = 0,
        dy = 0;

    const walking = 0 | player.walking / (walkingStep$1 / 4);
    const dash = 0 | player.dash / (walkingStep$1 / 4);
    if (player.direction === 'left')
        dx = walking * 8 + dash * 16; // if dash !== 0, walking is always 0.
    if (player.direction === 'up')
        dy = walking * 8 + dash * 16;
    if (player.direction === 'right')
        dx = - walking * 8 - dash * 16;
    if (player.direction === 'down')
        dy = - walking * 8 - dash * 16;

    // drawing map
    buffer.add(new URect(new UPoint(0, 0), new UPoint(canvasWidth, canvasHeight)).setFillColor('#000'));
    for (let x = 0; x < mapWidth$1; x++) {
        for (let y = 0; y < mapHeight; y++) {
            const X = (x - player.x + 5) * tileSize + dx, // add 5 to center character
                Y = (y - player.y + 5) * tileSize + dy;
            if (X >= canvasWidth || -tileSize >= X ||
                Y >= canvasHeight || -tileSize >= Y) continue; // over canvas
            buffer.add(
                dictionary[map$1[x + y * mapWidth$1]]
                .move(X, Y)
            );
        }
    }

    // drawing back object
    for (let i = 0, _i = backObjects.length; i < _i; i = 0 | i + 1) {
        const x = backObjects[i][1], y = backObjects[i][2];
        buffer.add(
            dictionary[backObjects[i][0]]
            .move(
                (x - player.x + 5) * tileSize + dx, // add 5 to center character
                (y - player.y + 5) * tileSize + dy
            )
        );
    }

    // drawing character
    if (walking === 0 && dash === 0) {
        buffer.add(
            characterImage[player.direction]
            .move(5 * tileSize, 5 * tileSize)
        );
    } else {
        buffer.add(
            characterImage[player.direction + ((walking + dash) % 2 + 1)]
            .move(5 * tileSize, 5 * tileSize)
        );
    }

    // drawing front object
    for (let i = 0, _i = frontObjects.length; i < _i; i = 0 | i + 1) {
        // add 5 to center character
        const x = frontObjects[i][1], y = frontObjects[i][2];
        buffer.add(
            dictionary[frontObjects[i][0]].move(
                (x - player.x + 5) * tileSize + dx,
                (y - player.y + 5) * tileSize + dy
            )
        );
    }
}

var map$2 = () => {
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
        changeSceen(sceen.MENU);
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
    drawMap();
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
            changeSceen(sceen.BATTLE.MAIN);
        }
    }
}

var draw$3 = () => {
    const titleHeight = 16;
    const title = newUText('Menu', new UPoint(0, 0)).setFont('16px san-self');
    const board = new UGroup(
        new URect(new UPoint(0, 0), new UPoint(80, canvasHeight)).setFillColor('#000'),
        new ULine(new UPoint(76, 0), new UPoint(76,320)).setStrokeColor('#fff')
    );
    const cursorText = newUText('>', new UPoint(0, cursor.y * lineHeight + titleHeight));

    buffer.add(board);
    buffer.add(title);
    buffer.add(cursorText);
    for (let i = 0, _i = menuList.length; i < _i; i++) {
        buffer.add(newUText(menuList[i], new UPoint(lineHeight, i * lineHeight + titleHeight)));
    }
    function newUText(string, point) {
        return new UText(string, point).setFillColor('#fff').setBaseline('top').setFont(DEFAULT_FONT);
    };
};

let movesCursor = 0;
var menu = () => {
    drawMap();
    draw$3();
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
            changeSceen(sceen.POKEDEX.INDEX);
        } else {
            changeSceen(sceen.MAP);
        }
    }
    if (pressedKey.M === 1 || pressedKey.B === 1) {
        changeSceen(sceen.MAP);
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

var message$1 = () => {
    drawMap();
    draw$4();
    if (pressedKey.space === 1) {
        message.next();
    }
};

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

mainLoop.add(keyEvent);

const sceenFunc = {};
sceenFunc[sceen.BATTLE.MAIN] = battle$2;
sceenFunc[sceen.LOADING] = loading;
sceenFunc[sceen.MAP] = map$2;
sceenFunc[sceen.MENU] = menu;
sceenFunc[sceen.MESSAGE] = message$1;
sceenFunc[sceen.POKEDEX.INDEX] = pokedexIndex;
sceenFunc[sceen.POKEDEX.DETAIL] = pokedexDetail;
let key;
for (key of Object.keys(sceenFunc)) {
    const SCEEN = key, func = sceenFunc[key];
    mainLoop.add(() => {
        if (sceenEquals(SCEEN)) { // SCEEN_LOADING, SCEEN_MAP, etc...
            setupCanvas();
            func(); // loading(), map(), etc...
            drawCanvas();
        }
    });
}

new Promise((resolve, reject) => {
    window.addEventListener('load', resolve);
})
.then(() => {
    changeSceen(sceen.LOADING);
    const pokemonImage = pokemonList$1.map(_ => './pokemon/' + _.src);
    Canvas.preload(...pokemonImage).then(() => {
        changeSceen(sceen.START);
    });
    mainLoop.start();
})
.catch(e => console.log(e));