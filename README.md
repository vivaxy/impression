# impression

Element [impression](https://en.wikipedia.org/wiki/Impression_(online_media)), for ads or user behaviour statistics.

Written in es6 javascript, published as npm package as es5 along with a browser standalone.

## Browser support

IE9+, chrome, safari, firefox, opera...

## Installation

### npm

`npm install impression.js`

### browser

Use [standalone](./bundle/index.js), wrapped in umd, bundled with webpack.

## Usage

```js
import Impression from 'impression';
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
impression.on('begin', '[data-impression-uniqueid="1"]', (element) => {
    // => which element begins to impression
});
```

### end

```js
impression.on('end', '[data-impression-uniqueid="1"]', (element) => {
    // => which element's impression ends
});
```

## Reference

- [onScreen](https://github.com/silvestreh/onScreen)
- [onScreen](https://vivaxyblog.github.io/2016/08/17/is-element-on-screen.html)
