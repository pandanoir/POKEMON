import {UImage, UPoint} from './unitary.js';
// trimは元画像から切り出す処理
const mapSrc = './map/shops.gif',
    mapImage = new UImage(mapSrc, new UPoint(0, 0)),
    tiles = {
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
    },
    tileSize = 32;
let key;
for (key of Object.keys(tiles)) {
    tiles[key] = mapImage.trim(tiles[key], tileSize, tileSize);
}
Canvas.preload(mapSrc);
export {tiles, tileSize};