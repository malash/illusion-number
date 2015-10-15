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
                tilePositionsMap['out'][x][y] = [];
                if (getBitmap(from, x, y)) {
                    for (yComparison = 0; yComparison < 3; yComparison++) {
                        if (!getBitmap(to, x, yComparison - 1) && getBitmap(to, x, yComparison)) {
                            tilePositionsMap['out'][x][y].push(yComparison + 1);
                        }
                    }
                }

                tilePositionsMap['in'][x][y] = [];
                if (getBitmap(to, x, y)) {
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
         *  Play illusion animation on element provided
         * @method play
         * @for IllusionNumber
         * @param {element} ele - the DOM element to bind
         * @param {object} options - play options
         * @param {number | char} options.from - animation will transform from bitmap of options.from
         * @param {number | char} options.to - animation will transform to bitmap of options.to
         * @param {number | string} [options.size = 250px] - the canvas size (14px, 3em, 2rem, etc.)
         * @param {number} [options.animationDuration = 1] - the animation duration (sec, could be float), default to 1
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
            var eleTiles = document.createElement('div');
            eleTiles.classList.add('illusion-number-tiles');
            if (options.reverse) {
                eleTiles.classList.add('illusion-number-tiles-reverse');
            }
            for (var indexSurface in ['in', 'out']) {
                var surface = ['in', 'out'][indexSurface];
                for (var x = 0; x < 5; x++) {
                    for (var y = 0; y < 3; y++) {
                        var tilePositions = tilePositionsMap[surface][x][y];
                        for (var indexTilePosition in tilePositions) {
                            var tilePosition = tilePositions[indexTilePosition];
                            var eleTile = document.createElement('div');
                            eleTile.classList.add('illusion-number-tile-x-' + x);
                            eleTile.classList.add('illusion-number-tile-y-' + y);
                            eleTile.classList.add('illusion-number-animation-' + surface + '-' + tilePosition);
                            if (options.animationDuration && !isNaN(parseFloat(options.animationDuration))) {
                                eleTile.style.animationDuration = parseFloat(options.animationDuration) + 's';
                            }
                            eleTiles.appendChild(eleTile);
                        }
                    }
                }
            }
            eleRoot.appendChild(eleTiles);
            ele.innerHTML = '';
            ele.appendChild(eleRoot);
        },
        /**
         * Set or override a custom bitmap
         * @method setBitmap
         * @for IllusionNumber
         * @param {char} char - character to set
         * @param {number[][]} bitmap - character bitmap, for example:
            [
                [1, 1, 1],
                [1, 0, 1],
                [1, 0, 1],
                [1, 0, 1],
                [1, 1, 1]
            ]
         */
        setBitmap: function(char, bitmap) {
            bitmaps[char] = bitmap;
        }
    };
}(document, window));