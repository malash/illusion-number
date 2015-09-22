!(function(document, window) {

    var svg = '<!-- inline src/illusion-number.svg -->';
    var svgDiv = document.createElement('div');
    svgDiv.classList.add('illusion-number-svg');
    svgDiv.innerHTML = svg;
    document.body.appendChild(svgDiv);

    window.IllusionNumber = {
        play: function(ele, number) {     
            ele.innerHTML = '<div class="illusion-number illusion-number-' + number + '"><div class="surfaces"><div class="surface-a-1"></div><div class="surface-a-2"></div><div class="surface-a-3"></div><div class="surface-b-1"></div><div class="surface-b-2"></div><div class="surface-b-3"></div></div></div>';
        }
    };
}(document, window));