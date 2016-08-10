var walkingStep = 0 | FPS / 5;
var ENCOUNTER_RATE = 8;
function drawMap() {
    var dx = 0,
        dy = 0;

    var walking = 0 | player.walking / (walkingStep / 4);
    var dash = 0 | player.dash / (walkingStep / 4);
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
    for (var x = 0; x < mapWidth; x++) {
        for (var y = 0; y < mapHeight; y++) {
            buffer.add(
                dictionary[map[x + y * mapWidth]]
                .move(
                    (x - player.x + 5) * tileSize + dx, // add 5 to center character
                    (y - player.y + 5) * tileSize + dy
                )
            );
        }
    }

    // drawing back object
    for (var i = 0, _i = backObjects.length; i < _i; i++) {
        var x = backObjects[i][1], y = backObjects[i][2];
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
    for (var i = 0, _i = frontObjects.length; i < _i; i++) {
        // add 5 to center character
        var x = frontObjects[i][1], y = frontObjects[i][2];
        buffer.add(
            dictionary[frontObjects[i][0]].move(
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
            battle.enemy = pokemonList[Math.random() * pokemonList.length | 0];
            battle.friend = player.pokemons[0];
            battle.enemyTrainer = null;
            changeSceen('BATTLE');
        }
    }
}