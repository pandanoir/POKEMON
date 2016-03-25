window.addEventListener('load', function() {
    setupCanvas();
    drawMap();
    drawCanvas();
    walk();

    mainLoop.add(function() {
        if (sceen === 'MAP') {
            if (player.walking === 0 && player.dash === 0) {
                for (var d = 0, dir = ['left', 'up', 'right', 'down']; d < 4; d++) {
                    if (pressedKey[dir[d]] > 0) {
                        player.direction = dir[d];
                        if (player.canMove(dir[d])) {
                            if (pressedKey.shift > 0) {
                                player.dash = 1;
                            } else {
                                player.walking = 1;
                            }
                        }
                        break;
                    }
                }
            }
            if (pressedKey.M === 1) {
                cursor.y = 0;
                changeSceen('MENU');
            }
            setupCanvas();
            drawMap();
            drawCanvas();
            walk();
        }
    });
});
