function drawMessage() {
    var boardHeight = 100;
    var messageBoard = new UGroup(
        new URect(new UPoint(0, canvasHeight - boardHeight), new UPoint(canvasWidth, canvasHeight)).setFillColor('#000'),
        new USegment(new UPoint(5, canvasHeight - boardHeight + 5), new UPoint(canvasWidth - 5, canvasHeight - boardHeight + 5)).setStrokeColor('#fff'),
        new USegment(new UPoint(5, canvasHeight - boardHeight + 5), new UPoint(5, canvasHeight - 5)).setStrokeColor('#fff'),
        new USegment(new UPoint(5, canvasHeight - 5), new UPoint(canvasWidth - 5, canvasHeight - 5)).setStrokeColor('#fff'),
        new USegment(new UPoint(canvasWidth - 5, canvasHeight - boardHeight + 5), new UPoint(canvasWidth - 5, canvasHeight - 5)).setStrokeColor('#fff')
    );
    var messageText = newUText(message.text, new UPoint(9, canvasHeight - boardHeight + 9));

    buffer.add(messageBoard);
    buffer.add(messageText);
    function newUText(string, point) {
        return new UText(string, point).setFillColor('#fff').setBaseline('top').setFont(DEFAULT_FONT);
    };
};
