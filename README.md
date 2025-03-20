# mithril-emittable

Emit native DOM events from within your components

# Usage

Example: Emit natively bubling navigation events to be captured by a "router" etc:

You might implement a component like this:

```js
const m = require('mithril/hyperscript');
const emittable = require('../emittable');

const SomeAsyncActionButton = emittable(function({ attrs }, emit) {
  async onclick() {
    // Do some thing
    await someAsyncAction();
    // Emit that you want to navigate, let a parent component decide what to do about it.
    emit('navigate', { url: '/' });
  }

  return {
    view: ({ attrs: { account } }) => 
      m('button', { onclick }, 'Do something')
  }
});

module.exports = { SomeAsyncActionButton };

```

And then in your app mounting code you might do this:
```js
...
window.addEventListener('navigate', event => {
  window.history.pushState(null, null, event.detail.url);
  redraw();
});

```

You can also use this to easily implement explicit redrawing:

App mounting code:
```js
  target.addEventListener('redraw', redraw);
```

Some component:
```js
const m = require('mithril/hyperscript');
const emittable = require('../emittable');

const CounterButton = emittable(function({ attrs }, emit) {
  let count = 0;

  async onclick() {
    count++;
    emit('redraw');
  }

  return {
    view: ({ attrs: { account } }) => 
      m('button', { onclick }, count)
  }
});

module.exports = { CounterButton };
```