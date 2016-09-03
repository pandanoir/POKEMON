mainLoop.add(() => {
    if (sceen === SCEEN_MESSAGE) {
        setupCanvas();
        drawMap();
        drawMessage();
        drawCanvas();
        if (pressedKey.space === 1) {
            message.next();
        }
    }
});
