{
    const __pressedKey = {};
    window.addEventListener('keydown', e => __pressedKey[key['key' + e.keyCode]] = true);
    window.addEventListener('keyup', e => __pressedKey[key['key' + e.keyCode]] = false);
    mainLoop.add(() => {
        for (const key of Object.keys(pressedKey)) {
            if (__pressedKey[key]) {
                pressedKey[key]++;
            } else {
                pressedKey[key] = 0;
            }
        }
    })
}