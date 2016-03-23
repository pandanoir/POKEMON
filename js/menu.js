window.addEventListener('load', function() {
    var movesCursor = 0;
    setupCanvas();
    drawMenu();
    drawMap();
    drawCanvas();
    setInterval(function() {
        if (sceen === 'MENU') {
            setupCanvas();
            drawMap();
            drawMenu();
            drawCanvas();
            if (pressedKey.up === true && movesCursor === 0 && cursor.y - 1 >= 0) {
                cursor.y--;
                movesCursor = 1;
            }
            if (pressedKey.down === true && movesCursor === 0 ) {
                cursor.y++;
                movesCursor = 1;
            }
            if (movesCursor !== 0) {
                movesCursor++;
            }
            if (movesCursor === 11) {
                movesCursor = 0;
            }
            if (pressedKey.space === true) {
                sceen = 'MAP';
            }
        }
    }, 10);
});
