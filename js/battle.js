{
    const commands = [['battle', 'item'], ['pokemon', 'escape']];
    mainLoop.add(() => {
        if (sceen === 'BATTLE') {
            setupCanvas();
            drawBattle();
            drawCanvas();
            if (pressedKey.down === 1 && cursor.maxY >= cursor.y + 1) {
                cursor.y++;
            }
            if (pressedKey.up === 1 && cursor.y - 1 >= 0) {
                cursor.y--;
            }
            if (pressedKey.right === 1 && cursor.maxX >= cursor.x + 1) {
                cursor.x++;
            }
            if (pressedKey.left === 1 && cursor.x - 1 >= 0) {
                cursor.x--;
            }
            if (pressedKey.M === 1) {
                cursor.y = 0;
                changeSceen('MENU');
            }
            if (pressedKey.space === 1) {
                if (commands[cursor.y][cursor.x] === 'escape') {
                    changeSceen('MAP');
                }
            }
        }
    });
}
