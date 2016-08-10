mainLoop.add(function() {
    if (sceen === 'BATTLE') {
        setupCanvas();
        drawBattle();
        drawCanvas();
        if (pressedKey.M === 1) {
            cursor.y = 0;
            changeSceen('MENU');
        }
        if (pressedKey.space === 1) {
        }
    }
});