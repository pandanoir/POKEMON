import mainLoop from './mainLoop.js';
import {SCEEN} from './definitions.js';

let sceen = SCEEN.START;
export function changeSceen(name) {
    mainLoop.addOnce(() => sceen = name); // sceen = name causes message skip
}
export function sceenEquals(name) {
    return name === sceen;
}