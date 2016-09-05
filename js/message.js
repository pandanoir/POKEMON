import draw from './draw/drawMessage.js';
import drawMap from './draw/drawMap.js';
import {pressedKey, message} from './definitions.js';

export default () => {
    drawMap();
    draw();
    if (pressedKey.space === 1) {
        message.next();
    }
};