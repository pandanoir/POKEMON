{
    const pokedex = {
        cursor: {
            y: 0
        },
        pageYOffset: 0 // pageYOffset is not pixel. this contains the number of line.
    };
    const movesCursor = 0;
    const windowLoad = new Promise(function(resolve, reject) {
        window.addEventListener('load', function() {
            resolve();
        });
    });
    Promise.all([preloadPokemonImage, windowLoad]).then(function() {
        setupCanvas();
        drawLoading();
        drawCanvas();
        const pokemonImage = pokemonList.map(function(_) {return './pokemon/' + _.src;});
        Canvas.preload.apply(Canvas, pokemonImage).then(function() {
            mainLoop.add(function() {
                if (sceen === 'POKEDEX_INDEX') {
                    setupCanvas();
                    drawPokedexIndex();
                    drawCanvas();
                    if ((pressedKey.up === 1 || pressedKey.up > 20)
                        && movesCursor === 0 && pokedex.cursor.y - 1 >= 0) {
                        pokedex.cursor.y--;
                        if (pokedex.cursor.y - pokedex.pageYOffset <= 5 && pokedex.pageYOffset - 1 >= 0) {
                            pokedex.pageYOffset--;
                        }
                        movesCursor = 1;
                    }
                    if ((pressedKey.down === 1 || pressedKey.down > 20)
                        && movesCursor === 0) {
                        pokedex.cursor.y++;
                        if (pokedex.cursor.y - pokedex.pageYOffset >= 25 && (pokemonList.length - (pokedex.pageYOffset)) * lineHeight >= canvasHeight) {
                            pokedex.pageYOffset++;
                        }
                        movesCursor = 1;
                    }
                    if (pressedKey.space === 1) {
                        pokedex.detailID = pokedex.cursor.y;
                        changeSceen('POKEDEX_DETAIL');
                    }
                    if (pressedKey.B === 1) {
                        changeSceen('MENU');
                    }
                    if (movesCursor !== 0) {
                        movesCursor++;
                    }
                    if (movesCursor === 11) {
                        movesCursor = 0;
                    }
                } else if (sceen === 'POKEDEX_DETAIL') {
                    setupCanvas();
                    drawPokedexDetail(pokedex.detailID);
                    drawCanvas();
                    if (pressedKey.space === 1 || pressedKey.B === 1) {
                        changeSceen('POKEDEX_INDEX');
                    }
                }
            });
        });
    }).catch(function(e) {
        console.log(e);
    });
}