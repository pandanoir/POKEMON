var FPS = 32;
var UCircularSector = Unitary.CircularSector;
var UGroup = Unitary.Group;
var UImage = Unitary.Image;
var ULine = Unitary.Line;
var UPoint = Unitary.Point;
var URect = Unitary.Rect;
var USegment = Unitary.Segment;
var UText = Unitary.Text;
var mapSrc = './map/shops.gif';
window.addEventListener('load', function() {
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
    ).then(function() {
        //d;
    });
});
var sceen = 'MAP';
var DEFAULT_FONT = '13px san-self';
var tileSize = 32;
var canvasWidth = tileSize * 10; // canvas要素の幅
var canvasHeight = canvasWidth; // canvas要素の高さ
var pressedKey = {
};
var key = {
    shift: 16,
    space: 32,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    B: 66,
    M: 77
};
for (var _key in key) {
    key['key' + key[_key]] = _key; // c.f: key['key16'] = 'shift';
    pressedKey[_key] = 0;
}
var cursor = {
    y: 0
};
var battle = {
    enemy: null,
    friend: null,
    enemyTrainer: null
};

var player = {
    x: 0,
    y: 0,
    walking: 0,
    dash: 0,
    direction: 'down',
    pokemons: [],
    canMove: function(direction) {
        var nextX = this.x, nextY = this.y;
        if (direction === 'left') {
            nextX--;
        } else if (direction === 'up') {
            nextY--;
        } else if (direction === 'right') {
            nextX++;
        } else if (direction === 'down') {
            nextY++;
        }
        if (0 > nextX || nextX > mapWidth - 1 ||
            0 > nextY || nextY > mapHeight - 1) {
            return false;
        }
        if (obstacles.includes(map[nextX + nextY * mapWidth])) {
            return false;
        }
        for (var i = 0, _i = frontObjects.length; i < _i; i++) {
            if (obstacles.includes(frontObjects[i][0]) &&
                frontObjects[i][1] === nextX &&
                frontObjects[i][2] === nextY) {
                return false;
            }
        }
        return true;
    }
};
var walking = 0, dash = 0;

// trimは元画像から切り出す処理
var mapImage = new UImage(mapSrc, new UPoint(0, 0));
var tiles = {
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

var characterImage = {
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
var CONSTS = Object.keys(tiles).map(function(item) {return item.toUpperCase()});
var dictionary = [];

// GRASS = 0; dictionary[0] = grass; などを動的に生成
for (var i = 0, _i = CONSTS.length; i < _i; i++) {
    window[CONSTS[i]] = i;
    dictionary[i] = tiles[CONSTS[i].toLowerCase()];
}

// 1次元配列でマップを表現
var mapWidth = 12; // 下のmapの横幅
var mapHeight = 10; // 下のmapの縦の長さ
/*var map = [
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
var map = [
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
var backObjects = [
];
var frontObjects = [
    [SIGN, 1, 0, function() {
        message = {text: 'ここは はじまりの むら', next: function() {changeSceen('MAP')}}
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
var obstacles = [
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
var canvas, buffer;
var lineHeight;
window.addEventListener('load', function() {
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
    buffer.draw().then(function() {
        canvas.canvas.putImageData(
            buffer.canvas.getImageData(
                0, 0, canvasWidth, canvasHeight
            ), 0, 0
        );
    });
}
function changeSceen(name) {
    mainLoop.addOnce(function() {
        sceen = name;
    });
}
function zerofill(n, m) {
    var zero = '0';
    for (var i = 1; i < m; i *= 2) {
        zero = zero + zero;
    }
    return (zero + n).slice(-m);
}
