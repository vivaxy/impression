# impression

🚧🚧🚧 UNDERCONSTRUCTION 🚧🚧🚧

Element [impression](https://en.wikipedia.org/wiki/Impression_(online_media)), for ads or user behaviour statistics.

Written in es6 javascript, published as npm package as es5 as long as a browser standalone.

## Browser support

IE9+, chrome, safari, firefox, opera...

## Usage

```js
import Impression from 'impression';
let impression = new Impression();
let element = document.querySelector('#test');
impression.isViewable(element); // => true
impression.on('begin', '#test', (element, { type, direction }) => {
    console.log(`element begined by ${type} from ${direction}`, element);
});
impression.on('end', '#test', (element, { type, direction }) => {
    console.log(`element ended by ${type} from ${direction}`, element);
});
```

## API

### *constructor* `Impression` => `impression`

`let impression = new Impression(options)`

### `isViewable` => `impression`

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

### `attach` => `impression`

`impression.attach()`

### `detach` => `impression`

`impression.detach()`

## Options

### tolerance

### debounce

### container

## Events

### begin

### end

## Reference

- [onScreen](https://github.com/silvestreh/onScreen)
