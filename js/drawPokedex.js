var pokemonList;
var preloadPokemonImage = new Promise(function(resolve, reject) {
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200 || this.responseURL.slice(0, 8) === 'file:///') {
                if (this.response) {
                    pokemonList = this.response;
                    resolve();
                }
            } else {
                reject();
            }
        }
    };
    xmlHttpRequest.open('GET', './js/pokemon.json', true);
    xmlHttpRequest.responseType = 'json';
    xmlHttpRequest.send(null);
}).catch(function(e) {
    console.log(e);
});



function drawPokedexIndex() {
    var cursorText = newUText('>', new UPoint(0, (pokedex.cursor.y - pokedex.pageYOffset) * lineHeight));

    buffer.add(cursorText);
    for (var i = 0, _i = pokemonList.length; i < _i; i++) {
        buffer.add(newUText('No ' + zerofill(i + 1, 3), new UPoint(lineHeight, (i - pokedex.pageYOffset) * lineHeight)));
        buffer.add(newUText(pokemonList[i].name, new UPoint(lineHeight * 6, (i - pokedex.pageYOffset) * lineHeight)));
    }
    function newUText(string, point) {
        return new UText(string, point).setFillColor('#555').setBaseline('top').setFont('13px san-self');
    };
};
function drawPokedexDetail(id) {
    var name = new UGroup(
        new URect(new UPoint(0, 0), new UPoint(150, 24)).setFillColor('#fff'),
        new URect(new UPoint(0, 0), new UPoint(150, 24)),
        newUText('No ' + zerofill(id + 1, 3) + ' ' +pokemonList[id].name, new UPoint(3, 2))
    );

    buffer.add(new UImage('./pokemon/' + pokemonList[id].src, new UPoint(0, 0)));
    buffer.add(name);

    function newUText(string, point) {
        return new UText(string, point).setFillColor('#555').setBaseline('top').setFont('13px san-self');
    };
};
