(function() {
    var __pressedKey = {};
    window.addEventListener('keydown', function(e) {
        __pressedKey[key['key' + e.keyCode]] = true;
    });
    window.addEventListener('keyup', function(e) {
        __pressedKey[key['key' + e.keyCode]] = false;
    });
    mainLoop.add(function() {
        for (var key in pressedKey) {
            if (__pressedKey[key]) {
                pressedKey[key]++;
            } else {
                pressedKey[key] = 0;
            }
        }
    })
})();
