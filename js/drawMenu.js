function drawMenu() {
    var titleHeight = 16;
    var title = newUText('Menu', new UPoint(0, 0)).setFont('16px san-self');
    var board = new UGroup(
        new URect(new UPoint(0, 0), new UPoint(80, canvasHeight)).setFillColor('#000'),
        new ULine(new UPoint(76, 0), new UPoint(76,320)).setStrokeColor('#fff')
    );
    var cursorText = newUText('>', new UPoint(0, cursor.y * lineHeight + titleHeight));

    buffer.add(board);
    buffer.add(title);
    buffer.add(cursorText);
    for (var i = 0, _i = menuList.length; i < _i; i++) {
        buffer.add(newUText(menuList[i], new UPoint(lineHeight, i * lineHeight + titleHeight)));
    }
    function newUText(string, point) {
        return new UText(string, point).setFillColor('#fff').setBaseline('top').setFont('13px san-self');
    };
};
