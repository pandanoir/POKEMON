const FPS = 32;
const UCircularSector = Unitary.CircularSector;
const UGroup = Unitary.Group;
const UImage = Unitary.Image;
const ULine = Unitary.Line;
const UPoint = Unitary.Point;
const URect = Unitary.Rect;
const USegment = Unitary.Segment;
const UText = Unitary.Text;
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
const sceen = 'MAP';
const DEFAULT_FONT = '13px san-self';
const tileSize = 32;
const canvasWidth = tileSize * 10; // canvas要素の幅
const canvasHeight = canvasWidth; // canvas要素の高さ
const pressedKey = {
};
const key = {
    shift: 16,
    space: 32,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    B: 66,
    M: 77
};
for (var _key of Object.keys(key)) {
    key['key' + key[_key]] = _key; // c.f: key['key16'] = 'shift';
    pressedKey[_key] = 0;
}
const cursor = {
    y: 0
};
const battle = {
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
    canMove: direction => {
        const dx = {left: -1, up: 0, right: 1, down: 0}, dy = {left: 0, up: -1, right: 0, down: 1};
        const nextX = this.x + dx[direction], nextY = this.y + dy[direction];
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
const walking = 0, dash = 0;

// trimは元画像から切り出す処理
const mapImage = new UImage(mapSrc, new UPoint(0, 0));
const tiles = {
    grass: mapImage.trim(new UPoint(0, 256), tileSize, tileSize),
    grass2: mapImage.trim(new UPoint(96, 256), tileSize, tileSize),
    grass3: mapImage.trim(new UPoint(6 * 32, 0), tileSize, tileSize),
    sign: mapImage.trim(new UPoint(928, 64), tileSize, tileSize),

    roof1: mapImage.trim(new UPoint(800, 96), tileSize, tileSize),
    roof2: mapImage.trim(new UPoint(800 + 32, 96), tileSize, tileSize),
    roof3: mapImage.trim(new UPoint(800 + 64, 96), tileSize, tileSize),
    roof4: mapImage.trim(new UPoint(800 + 96, 96), tileSize, tileSize),
    roof5: mapImage.trim(new UPoint(800 + 128, 96), tileSize, tileSize),

    roof6: mapImage.trim(new UPoint(384, 384 - 32), tileSize, tileSize),
    roof7: mapImage.trim(new UPoint(384 + 32, 384 - 32), tileSize, tileSize),
    roof8: mapImage.trim(new UPoint(384 + 64, 384 - 32), tileSize, tileSize),
    roof9: mapImage.trim(new UPoint(384 + 96, 384 - 32), tileSize, tileSize),
    roof10: mapImage.trim(new UPoint(384 + 128, 384 - 32), tileSize, tileSize),

    roof11: mapImage.trim(new UPoint(384, 384), tileSize, tileSize),
    roof12: mapImage.trim(new UPoint(384 + 32, 384), tileSize, tileSize),
    roof13: mapImage.trim(new UPoint(384 + 64, 384), tileSize, tileSize),
    roof14: mapImage.trim(new UPoint(384 + 96, 384), tileSize, tileSize),
    roof15: mapImage.trim(new UPoint(384 + 128, 384), tileSize, tileSize)
};

const characterImage = {
    left: new UImage('./chara1/left.png', new UPoint(0, 0)),
    left1: new UImage('./chara1/left1.png', new UPoint(0, 0)),
    left2: new UImage('./chara1/left2.png', new UPoint(0, 0)),

    up: new UImage('./chara1/back.png', new UPoint(0, 0)),
    up1: new UImage('./chara1/back1.png', new UPoint(0, 0)),
    up2: new UImage('./chara1/back2.png', new UPoint(0, 0)),

    right: new UImage('./chara1/right.png', new UPoint(0, 0)),
    right1: new UImage('./chara1/right1.png', new UPoint(0, 0)),
    right2: new UImage('./chara1/right2.png', new UPoint(0, 0)),

    down: new UImage('./chara1/front.png', new UPoint(0, 0)),
    down1: new UImage('./chara1/front1.png', new UPoint(0, 0)),
    down2: new UImage('./chara1/front2.png', new UPoint(0, 0))
};

// GRASSなどCONSTSを動的に生成
const CONSTS = Object.keys(tiles).map(item => item.toUpperCase());
const dictionary = [];

// GRASS = 0; dictionary[0] = grass; などを動的に生成
for (let i = 0, _i = CONSTS.length; i < _i; i++) {
    window[CONSTS[i]] = i;
    dictionary[i] = tiles[CONSTS[i].toLowerCase()];
}

// 1次元配列でマップを表現
const mapWidth = 12; // 下のmapの横幅
const mapHeight = 10; // 下のmapの縦の長さ
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
const backObjects = [
];
const frontObjects = [
    [SIGN, 1, 0, () => {
        message = {text: 'ここは はじまりの むら', next: () => changeSceen('MAP')}
        changeSceen('MESSAGE');
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
let canvas, buffer;
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
function changeSceen(name) {
    mainLoop.addOnce(() => sceen = name);
}
function zerofill(n, m) {
    const zero = '00000';
    for (let i = 5; i < m; i *= 2) {
        zero = zero + zero;
    }
    return (zero + n).slice(-m);
}