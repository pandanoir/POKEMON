draw[SCEEN_LOADING] = () => {
    buffer.add(new UText('loading...', new UPoint(canvasWidth / 2, canvasHeight / 2)).setAlign('center').setBaseline('middle').setFont(DEFAULT_FONT));
};