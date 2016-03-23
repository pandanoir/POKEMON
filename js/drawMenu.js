var cursor = {
    y: 0
};
function drawMenu() {
    var titleHeight = 16;
    var title = newUText('Menu', new UPoint(0, 0)).setFont('16px san-self');
    var board = new UGroup(
        new URect(new UPoint(0, 0), new UPoint(50, canvasHeight)).setFillColor('#000'),
        new ULine(new UPoint(47, 0), new UPoint(47,320)).setStrokeColor('#fff')
    );
    var cursorText = newUText('>', new UPoint(0, cursor.y * lineHeight + titleHeight));

    var menuLists = ['status', 'setting', 'save'];
    buffer.add(board);
    buffer.add(title);
    buffer.add(cursorText);
    for (var i = 0, _i = menuLists.length; i < _i; i++) {
        buffer.add(newUText(menuLists[i], new UPoint(lineHeight, i * lineHeight + titleHeight)));
    }
    function newUText(string, point) {
        return new UText(string, point).setFillColor('#fff').setBaseline('top').setFont('13px san-self');
    };
};
