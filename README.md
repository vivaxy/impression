# impression

Element [impression](https://en.wikipedia.org/wiki/Impression_(online_media)), for ads or user behaviour statistics.

Written in es6 javascript, published as npm package as es5 as long as a browser standalone.

## Usage

```js
import Impression from 'impression';
let element = document.querySelector('#test');
let impression = new Impression(element);
Impression.isViewable(element); // => true
impression.on('enter', (element, direction) => {
    console.log(`element entered from ${direction}`, element);
});
impression.on('leave', (element, direction) => {
    console.log(`element leaved from ${direction}`, element);
});
```

## Reference

- [onScreen](https://github.com/silvestreh/onScreen)
