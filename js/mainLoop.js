const mainLoop = {
    list: [],
    listOnce: []
};
mainLoop.fire = function() {
    for (var func of this.list) {
        func();
    }
    for (var func of this.listOnce) {
        func();
    }
    this.listOnce = [];
};
mainLoop.add = function(f) {
    this.list[this.list.length] = f;
}
mainLoop.addOnce = function(f) {
    this.listOnce[this.listOnce.length] = f;
}
setInterval(mainLoop.fire.bind(mainLoop), 1000 / FPS);