mainLoop.add(() => {
    if (sceen === 'MESSAGE') {
        setupCanvas();
        drawMap();
        drawMessage();
        drawCanvas();
        if (pressedKey.space === 1) {
            message.next();
        }
    }
});
