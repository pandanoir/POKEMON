import {UPoint, UText, pokedex, pokemonList, lineHeight, canvasHeight, buffer, zerofill} from './definitions.js';

export default () => {
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