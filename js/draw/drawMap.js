import {player, URect, UPoint, buffer, canvasWidth, canvasHeight, map, mapWidth, mapHeight, dictionary, backObjects, characterImage, frontObjects, tileSize, SCEEN, walkingStep} from '../definitions.js';
import {changeSceen} from '../sceen.js';

export default () => {
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
    buffer.add(new URect(new UPoint(0, 0), new UPoint(canvasWidth, canvasHeight)).setFillColor('#000'));
    for (let x = 0; x < mapWidth; x++) {
        for (let y = 0; y < mapHeight; y++) {
            const X = (x - player.x + 5) * tileSize + dx, // add 5 to center character
                Y = (y - player.y + 5) * tileSize + dy;
            if (X >= canvasWidth || -tileSize >= X ||
                Y >= canvasHeight || -tileSize >= Y) continue; // over canvas
            buffer.add(
                dictionary[map[x + y * mapWidth]]
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