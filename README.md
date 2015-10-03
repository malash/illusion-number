# Illusion Number

![Illusion Number Gif](https://gist.githubusercontent.com/malash/9ff5b2897f05d0fae6dd/raw/1b069c33becefa4ca5c19efc955bbc1bc67f441a/illusion-number.gif)

## Overview

Implementing an illusion number transform as showing in GIF written in Javascript and CSS.
I find the GIF image from SNS website and don't know its source. Please leave me a issuse if you know it and I will be appreciate for you :)

## Demo

Timer: [https://rawgit.com/malash/illusion-number/master/example/index.html](https://rawgit.com/malash/illusion-number/master/example/index.html)

Datetime: [https://rawgit.com/malash/illusion-number/master/example/datetime.html](https://rawgit.com/malash/illusion-number/master/example/datetime.html)

You can find more demos in the `example` folder.

## Usage

Use `bower`  to install `illusion-number` to your project:

```bash
$ bower install illusion-number
```

Then include `.js` and `.css` files:

```html
<link rel="stylesheet" href="/beep/bower_components/illusion-number/dest/illusion-number.css">
<script src="/beep/bower_components/illusion-number/dest/illusion-number.js"></script>
```

Put an empty `div` emelent to your HTML file:

```html
<div id="test"></div>
```

Call global variable `IllusionNumber`'s method `play` with the element and options:

```javascript
IllusionNumber.play(document.getElementById('test'), {
  from: '0',
  to: '1'
});
```

## Documentation

### IllusionNumber.play(ele, options)

#### ele

Type: `element`

Required: `true`

The DOM element to bind

#### options.from

Type: `number` or `char`

Required: `true`

#### options.to

Type: `number` or `char`

Required: `true`

The animation transforms from `options.from` bitmap to `options.to` bitmap.

#### options.size

Type: `number` or `string`

Default: `250px`

The animation canvas size. Some valid value: `250`, `'14px'`, `'3em'`, `'2rem'`

#### options.animationDuration

Type: `number`

Default: `1`

The animation duration defaults to 1 second. The type of value could be `number` or `float`.

### IllusionNumber.play(char, bitmap)

Set or override a bitmap.

For example:

```javascript
IllusionNumber.setBitmap('A', [
  [0, 1, 0],
  [1, 0, 0],
  [1, 1, 1],
  [1, 0, 1],
  [1, 0, 1]
]);
IllusionNumber.play(document.getElementById('test'), {
  from: '9',
  to: 'A'
});

```

#### char

Type: `char`

Required: `true`

Character to set.

#### bitmap

Type: `number[][]`

Required: `true`

Character's bitmap. The tile displays for value `1` and hides for value `0` at the same position in 2-dimensional array.

## License

The MIT License (MIT)

Copyright (c) 2015 [Malash](https://malash.me/) <<i@malash.me>>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.