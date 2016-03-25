var mainLoop = {
    list: [],
    listOnce: []
};
mainLoop.fire = function() {
    for (var i = 0, _i = this.list.length; i < _i; i++) {
        this.list[i]();
    }
    for (var i = 0, _i = this.listOnce.length; i < _i; i++) {
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
setInterval(function() {
    mainLoop.fire();
}, 10);
