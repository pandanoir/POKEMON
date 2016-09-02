const mainLoop = {
    list: [],
    listOnce: []
};
mainLoop.fire = function() {
    for (let i = 0, _i = this.list.length; i < _i; i++) {
        this.list[i]();
    }
    for (let i = 0, _i = this.listOnce.length; i < _i; i++) {
        this.listOnce[i]();
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