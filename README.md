# impression

![impression](./assets/images/impression.png)

[![Build Status][travis-image]][travis-url]
[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]
[![Codecov][codecov-image]][codecov-url]
[![Codacy Badge][codacy-image]][codacy-url]

Element [impression](https://en.wikipedia.org/wiki/Impression_(online_media)), for ads or user behaviour statistics.

Written in es6 javascript, published as npm package as es5 along with a browser standalone.

## Browser support

IE9+, chrome, safari, firefox, opera...

## Installation

### npm

`npm install impression.js`

### browser

`<script src="./bundle/index.js"></script>`

## Usage

```js
import Impression from 'impression.js';
let impression = new Impression();
let element = document.querySelector('#test');
impression.isViewable(element); // => true
impression.on('begin', '#test', (element) => {
    console.log(`element shown into view`, element);
});
impression.on('end', '#test', (element) => {
    console.log(`element shown out of view`, element);
});
```

## API

### *constructor* `Impression` => `impression`

`let impression = new Impression(options)`

### `isViewable` => `{Boolean}`

`impression.isViewable(element)`

Only accepts a single element.

### `on` => `impression`

`impression.on(event, selector, callback)`

`callback(element, { type, direction })`

### `off` => `impression`

`impression.off(event, selector, callback)`

`impression.off(event, selector)`

`impression.off(event)`

`impression.off()`

### `once` => `impression`

`impression.once(event, selector, callback)`

### `attach` => `impression`

`impression.attach()`

### `detach` => `impression`

`impression.detach()`

### `onObservers` => `impression`

`impression.onObservers(type, callback)`

### `onceObservers` => `impression`

`impression.onceObservers(type, callback)`

### `offObservers` => `impression`

`impression.offObservers(type, callback)`

`impression.offObservers(type)`

`impression.offObservers()`

## Options

### tolerance

The number of pixels an element is allowed to enter its container boundaries before calling its callback.

default `0`

### debounce

The number of milliseconds to wait before calling an element's callback after the changes.
 
default `100`

### container

The container of the elements you want to track.
 
default `window`

## Events

### begin

```js
impression.on('begin', '[data-impression-uniqueid="1"]', (element, { type }) => {
    // => which element begins to impression
    // => the cause of the change
});
```

### end

```js
impression.on('end', '[data-impression-uniqueid="1"]', (element, { type }) => {
    // => which element's impression ends
    // => the cause of the change
});
```

## Types

- mutation
- resize
- scroll
- unload

## Reference

- [onScreen](https://github.com/silvestreh/onScreen)
- [判断元素是否在屏幕中出现](https://vivaxyblog.github.io/2016/08/17/is-element-on-screen.html)
- [Code Coverage of Mocha Tests using Istanbul and Karma](https://ariya.io/2013/12/code-coverage-of-mocha-tests-using-istanbul-and-karma)
- [babel-plugin-istanbul](https://github.com/istanbuljs/babel-plugin-istanbul)
- [Chai Assertion Library BDD](http://chaijs.com/api/bdd/)

[travis-image]: https://img.shields.io/travis/vivaxy/impression.svg?style=flat-square
[travis-url]: https://travis-ci.org/vivaxy/impression
[npm-version-image]: http://img.shields.io/npm/v/impression.js.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/impression.js
[npm-downloads-image]: https://img.shields.io/npm/dt/impression.js.svg?style=flat-square
[license-image]: https://img.shields.io/npm/l/impression.js.svg?style=flat-square
[license-url]: LICENSE
[codecov-image]: https://img.shields.io/codecov/c/github/vivaxy/impression.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/vivaxy/impression
[codacy-image]: https://api.codacy.com/project/badge/Grade/d7b573db992a43acae3c7ef06c2cd312
[codacy-url]: https://www.codacy.com/app/vivaxy2012/impression?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=vivaxy/impression&amp;utm_campaign=Badge_Grade
