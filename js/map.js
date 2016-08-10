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
            if (pressedKey.space === 1) {
                var dx = {left: -1, up: 0, right: 1, down: 0}[player.direction];
                var dy = {left: 0, up: -1, right: 0, down: 1}[player.direction];
                for (var i = 0, _i = frontObjects.length; i < _i; i++) {
                    if (frontObjects[i][1] === player.x + dx && frontObjects[i][2] === player.y + dy) {
                        if (frontObjects[i][3]) frontObjects[i][3](); // cause action. read sign, talk with clerk or open treasure box!
                    }
                }
            }
            setupCanvas();
            drawMap();
            drawCanvas();
            walk();
        }
    });
});
