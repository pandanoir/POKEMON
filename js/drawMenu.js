import {UPoint, UGroup, URect, ULine, UText, cursor, lineHeight, buffer, menuList, canvasHeight, DEFAULT_FONT} from './definitions.js';

export default () => {
    const titleHeight = 16;
    const title = newUText('Menu', new UPoint(0, 0)).setFont('16px san-self');
    const board = new UGroup(
        new URect(new UPoint(0, 0), new UPoint(80, canvasHeight)).setFillColor('#000'),
        new ULine(new UPoint(76, 0), new UPoint(76,320)).setStrokeColor('#fff')
    );
    const cursorText = newUText('>', new UPoint(0, cursor.y * lineHeight + titleHeight));

    buffer.add(board);
    buffer.add(title);
    buffer.add(cursorText);
    for (let i = 0, _i = menuList.length; i < _i; i++) {
        buffer.add(newUText(menuList[i], new UPoint(lineHeight, i * lineHeight + titleHeight)));
    }
    function newUText(string, point) {
        return new UText(string, point).setFillColor('#fff').setBaseline('top').setFont(DEFAULT_FONT);
    };
};
