!(function(document, window) {

    var bitmaps = {
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
        if (bitmaps[number] === undefined) {
            return 0;
        }
        if (bitmaps[number][x] === undefined) {
            return 0;
        }
        if (bitmaps[number][x][y] === undefined) {
            return 0;
        }
        return bitmaps[number][x][y];
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

    function error(err) {
        if (console && console.error) {
            console.error(err);
        }
        return err;
    }

    window.IllusionNumber = {
        /**
         * 方法说明
         * @method play
         * @for IllusionNumber
         * @param {element} ele - the DOM element to bind
         * @param {object} options - play options
         * @param {number | char} options.from - animation will transform from bitmap of options.from
         * @param {number | char} options.to - animation will transform to bitmap of options.to
         * @param {number | string} [options.size = 250px] - the canvas size (14px, 3em, 2rem, etc.)
         */
        play: function(ele, options) {
            options = options || {};
            if (!ele) {
                return error(new Error('IllusionNumber.play: ' + ele + ' is not an invalid element'));
            }
            var from = options.from;
            if (typeof from === 'undefined' || typeof bitmaps[from] === 'undefined') {
                return error(new Error('IllusionNumber.play: ' + from + ' is not an invalid \'from\' char'));
            }
            var to = options.to;
            if (typeof to === 'undefined') {
                to = (parseInt(from) + 1) % 10;
            }
            if (typeof bitmaps[to] === 'undefined') {
                return error(new Error('IllusionNumber.play: ' + to + ' is not an invalid \'to\' char'));
            }
            var size = options.size || '250px';
            if (parseFloat(size) == size) {
                size = size + 'px';
            }
            var sizeResult;
            if (/^((\d+)(\.\d+)?)([^\d]+)$/.test(size)) {
                sizeResult = size.match(/^((\d+)(\.\d+)?)([^\d]+)$/);
                size = (parseFloat(sizeResult[1]) / 6) + sizeResult[4];
            }
            tilePositionsMap = getTilePositionsMap(from, to);
            var eleRoot = document.createElement('div');
            eleRoot.classList.add('illusion-number');
            eleRoot.style.fontSize = size;
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
                                eleTile.classList.add('hidden');
                            } else {
                                eleTile.classList.add('illusion-number-animation-' + surface + '-' + tilePosition);
                            }
                            eleSurface.appendChild(eleTile);
                        }
                    }
                }
                eleRoot.appendChild(eleSurface);
            }
            ele.innerHTML = '';
            ele.appendChild(eleRoot);
        },
        setBitmap: function(char, bitmap) {
            bitmaps[char] = bitmap;
        }
    };
}(document, window));