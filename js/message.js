mainLoop.add(() => {
    if (sceen === SCEEN_MESSAGE) {
        setupCanvas();
        draw[SCEEN_MAP]();
        draw[sceen]();
        drawCanvas();
        if (pressedKey.space === 1) {
            message.next();
        }
    }
});
