function drawBattle() {
    const boardHeight = 70;
    const board = new UGroup(
        new URect(new UPoint(0, canvasHeight - boardHeight), new UPoint(canvasWidth, canvasHeight)).setFillColor('#000')
    );
    const messageText = newUText(battle.enemy.name + ' が あらわれた！', new UPoint(9, canvasHeight - boardHeight + 9));
    const commands = new UGroup(
            new URect(new UPoint(200 - 9, canvasHeight - boardHeight + 9), new UPoint(canvasWidth - 9, canvasHeight - 9)).setStrokeColor('#fff'),
            newUText('たたかう', new UPoint(200, canvasHeight - boardHeight + 9 + 5)),
            newUText('どうぐ', new UPoint(260, canvasHeight - boardHeight + 9 + 5)),
            newUText('ポケモン', new UPoint(200, canvasHeight - 9 - 5)).setBaseline('bottom'),
            newUText('にげる', new UPoint(260, canvasHeight - 9 - 5)).setBaseline('bottom')
        );

    const enemyImage = new UImage('./pokemon/' + battle.enemy.src, new UPoint(0, 0));

    function newUText(string, point) {
        return new UText(string, point).setFillColor('#fff').setBaseline('top').setFont(DEFAULT_FONT);
    };
    buffer.add(enemyImage);
    buffer.add(board);
    buffer.add(messageText);
    buffer.add(commands);
};