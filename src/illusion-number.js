!(function(document, window) {

    var bitmap = {
        '0': [
            [1, 1, 1],
            [1, 0, 1],
            [1, 0, 1],
            [1, 0, 1],
            [1, 1, 1]
        ],
        '1': [
            [1, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 1]
        ],
        '2': [
            [1, 1, 1],
            [0, 0, 1],
            [1, 1, 1],
            [1, 0, 0],
            [1, 1, 1]
        ],
        '3': [
            [1, 1, 1],
            [0, 0, 1],
            [0, 1, 1],
            [0, 0, 1],
            [1, 1, 1]
        ],
        '4': [
            [1, 0, 1],
            [1, 0, 1],
            [1, 1, 1],
            [0, 0, 1],
            [0, 0, 1]
        ],
        '5': [
            [1, 1, 1],
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 1],
            [1, 1, 1]
        ],
        '6': [
            [1, 1, 1],
            [1, 0, 0],
            [1, 1, 1],
            [1, 0, 1],
            [1, 1, 1]
        ],
        '7': [
            [1, 1, 1],
            [0, 0, 1],
            [0, 0, 1],
            [0, 0, 1],
            [0, 0, 1]
        ],
        '8': [
            [1, 1, 1],
            [1, 0, 1],
            [1, 1, 1],
            [1, 0, 1],
            [1, 1, 1]
        ],
        '9': [
            [1, 1, 1],
            [1, 0, 1],
            [1, 1, 1],
            [0, 0, 1],
            [1, 1, 1]
        ],
    };

    function getBitmap(number, x, y) {
        if (bitmap[number] === undefined) {
            return 0;
        }
        if (bitmap[number][x] === undefined) {
            return 0;
        }
        if (bitmap[number][x][y] === undefined) {
            return 0;
        }
        return bitmap[number][x][y];
    }

    function getTilePositionsMap(from ,to) {
        var tilePositionsMap = {
            'in': [],
            'out': []
        };
        var x, y, yComparison;
        for (x = 0; x < 5; x++) {
            tilePositionsMap['in'][x] = [];
            tilePositionsMap['out'][x] = [];
            for (y = 0; y < 3; y++) {
                if (!getBitmap(from, x, y)) {
                    tilePositionsMap['out'][x][y] = [0];
                } else {
                    tilePositionsMap['out'][x][y] = [];
                    for (yComparison = 0; yComparison < 3; yComparison++) {
                        if (!getBitmap(to, x, yComparison - 1) && getBitmap(to, x, yComparison)) {
                            tilePositionsMap['out'][x][y].push(yComparison + 1);
                        }
                    }
                }

                if (!getBitmap(to, x, y)) {
                    tilePositionsMap['in'][x][y] = [0];
                } else {
                    tilePositionsMap['in'][x][y] = [];
                    for (yComparison = 2; yComparison >=0; yComparison--) {
                        if (!getBitmap(from, x, yComparison + 1) && getBitmap(from, x, yComparison)) {
                            tilePositionsMap['in'][x][y].push(3 - yComparison);
                        }
                    }
                }
            }
        }
        return tilePositionsMap;
    }

    window.IllusionNumber = {
        play: function(ele, options) {
            options = options || {};
            if (!ele) {
                throw new Error('IllusionNumber.play: element must be set');
            }
            var from = parseInt(options.from);
            if (isNaN(from)) {
                throw new Error('IllusionNumber.play: options.from must be number');
            }
            var to;
            if (typeof options.to === 'undefined') {
                to = (from + 1) % 10;
            }
            if (isNaN(parseInt(to))) {
                throw new Error('IllusionNumber.play: options.from must be number');
            }
            tilePositionsMap = getTilePositionsMap(from, to);
            var eleRoot = document.createElement('div');
            eleRoot.classList.add('illusion-number');
            for (var indexSurface in ['in', 'out']) {
                var surface = ['in', 'out'][indexSurface];
                var eleSurface = document.createElement('div');
                eleSurface.classList.add('surface');
                for (var x = 0; x < 5; x++) {
                    for (var y = 0; y < 3; y++) {
                        var tilePositions = tilePositionsMap[surface][x][y];
                        tilePositions = tilePositions ? (Array.isArray(tilePositions) ? tilePositions : [tilePositions]) : [];
                        for (var indexTilePosition in tilePositions) {
                            var tilePosition = tilePositions[indexTilePosition];
                            var eleTile = document.createElement('div');
                            eleTile.classList.add('surface-' + surface + '-' + x + '-' + y);
                            eleTile.classList.add('tile-x-' + x);
                            eleTile.classList.add('tile-y-' + y);
                            if (tilePosition === 0) {
                                eleTile.style.visibility = 'hidden';
                            } else {
                                eleTile.style['animation-name'] = 'illusion-number-animation-' + surface + '-' + tilePosition;
                            }
                            eleSurface.appendChild(eleTile);
                        }
                    }
                }
                eleRoot.appendChild(eleSurface);
            }
            ele.innerHTML = '';
            ele.appendChild(eleRoot);
        }
    };
}(document, window));