{
    const menuList = ['pokemon', 'pokedex', 'status', 'setting', 'save'];
    const movesCursor = 0;
    mainLoop.add(() => {
        if (sceen === 'MENU') {
            setupCanvas();
            drawMap();
            drawMenu();
            drawCanvas();
            if (pressedKey.up > 0 && movesCursor === 0 && cursor.y - 1 >= 0) {
                cursor.y--;
                movesCursor = 1;
            }
            if (pressedKey.down > 0 && movesCursor === 0 && cursor.y + 1 <= menuList.length - 1) {
                cursor.y++;
                movesCursor = 1;
            }
            if (movesCursor !== 0) {
                movesCursor++;
            }
            if (movesCursor === 11) {
                movesCursor = 0;
            }
            if (pressedKey.space === 1) {
                if (menuList[cursor.y] === 'pokedex') {
                    changeSceen('POKEDEX_INDEX');
                } else {
                    changeSceen('MAP');
                }
            }
            if (pressedKey.M === 1 || pressedKey.B === 1) {
                changeSceen('MAP');
            }
        }
    });
}