mainLoop.add(() => {
    if (sceen === SCEEN_LOADING) {
        setupCanvas();
        draw[sceen]();
        drawCanvas();
    }
});