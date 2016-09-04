import {UPoint, UText, UGroup, URect, pokemonList, buffer, DEFAULT_FONT} from './definitions.js';

export default (id) => {
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