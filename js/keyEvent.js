window.addEventListener('keydown', function(e) {
    if (pressedKey[key['key' + e.keyCode]] === false) {
        pressedKey[key['key' + e.keyCode]] = true;
    }
});
window.addEventListener('keyup', function(e) {
    if (pressedKey[key['key' + e.keyCode]] === true) {
        pressedKey[key['key' + e.keyCode]] = false;
    }
});
