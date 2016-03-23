function drawMap() {
    var dx = 0,
        dy = 0;

    var walking = 0 | player.walking / 5;
    var dash = 0 | player.dash / 5;
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
            // add 5 to center character
            buffer.add(
                dictionary[map[x + y * mapWidth]]
                .move(
                    (x - player.x + 5) * tileSize + dx,
                    (y - player.y + 5) * tileSize + dy
                )
            );
        }
    }

    // drawing back object
    for (var i = 0, _i = backObjects.length; i < _i; i++) {
        // add 5 to center character
        var x = backObjects[i][1], y = backObjects[i][2];
        buffer.add(
            dictionary[backObjects[i][0]]
            .move(
                (x - player.x + 5) * tileSize + dx,
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
    if (player.walking === 20 + 1 || player.dash === 10 + 1) {
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
    }
};
