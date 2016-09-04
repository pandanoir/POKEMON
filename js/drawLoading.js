import {UText, UPoint, canvasWidth, canvasHeight, DEFAULT_FONT, buffer} from './definitions.js';
export default () => {
    buffer.add(new UText('loading...', new UPoint(canvasWidth / 2, canvasHeight / 2)).setAlign('center').setBaseline('middle').setFont(DEFAULT_FONT));
};