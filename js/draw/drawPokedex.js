import {UPoint, UText, UGroup, URect, UImage, SCEEN, pokedex, lineHeight, canvasHeight, pokemonList, buffer, DEFAULT_FONT, zerofill} from '../definitions.js';

const out = {};
out[SCEEN.POKEDEX.DETAIL] = (id) => {
    const name = new UGroup(
        new URect(new UPoint(0, 0), new UPoint(150, 24)).setFillColor('#fff'),
        new URect(new UPoint(0, 0), new UPoint(150, 24)),
        newUText('No ' + zerofill(id + 1, 3) + ' ' +pokemonList[id].name, new UPoint(3, 2))
    );

    buffer.add(new UImage('./pokemon/' + pokemonList[id].src, new UPoint(0, 0)));
    buffer.add(name);

    function newUText(string, point) {
        return new UText(string, point).setFillColor('#555').setBaseline('top').setFont(DEFAULT_FONT);
    };
};
out[SCEEN.POKEDEX.INDEX] = () => {
    const cursorText = newUText('>', new UPoint(0, (pokedex.cursor.y - pokedex.pageYOffset) * lineHeight));

    buffer.add(cursorText);
    for (let i = 0, _i = pokemonList.length; i < _i; i++) {
        const Y = (i - pokedex.pageYOffset) * lineHeight;
        if (Y >= canvasHeight || -2 * lineHeight >= Y) continue;
        buffer.add(newUText('No ' + zerofill(i + 1, 3), new UPoint(lineHeight, Y)));
        buffer.add(newUText(pokemonList[i].name, new UPoint(lineHeight * 6, Y)));
    }
    function newUText(string, point) {
        return new UText(string, point).setFillColor('#555').setBaseline('top').setFont('13px san-self');
    };
};

export default out;