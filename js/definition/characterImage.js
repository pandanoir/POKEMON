import {UImage, UPoint} from './unitary.js';
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
let key;
for (key of Object.keys(characterImage)) {
    characterImage[key] = new UImage(characterImage[key], new UPoint(0, 0));
}
export default characterImage;