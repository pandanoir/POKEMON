import {FPS} from './definitions.js';

const mainLoop = new class MainLoop {
    constructor() {
        this.list = [];
        this.listOnce = [];
    }
    fire() {
        let func;
        for (func of this.list) {
            func();
        }
        for (func of this.listOnce) {
            func();
        }
        this.listOnce = [];
    }
    add(f) {
        this.list[this.list.length] = f;
    }
    addOnce(f) {
        this.listOnce[this.listOnce.length] = f;
    }
    start() {
        setInterval(this.fire.bind(this), 1000 / FPS);
    }
}
export default mainLoop;