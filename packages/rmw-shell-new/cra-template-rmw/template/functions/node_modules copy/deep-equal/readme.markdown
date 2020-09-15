# deep-equal

Node's `assert.deepEqual() algorithm` as a standalone module.

This module is around [46 times faster](https://gist.github.com/substack/2790507#gistcomment-3099862) than wrapping `assert.deepEqual()` in a `try/catch`.

[![build status](https://secure.travis-ci.com/inspect-js/node-deep-equal.png)](https://travis-ci.org/inspect-js/node-deep-equal)

# example

``` js
var equal = require('deep-equal');
console.dir([
    equal(
        { a : [ 2, 3 ], b : [ 4 ] },
        { a : [ 2, 3 ], b : [ 4 ] }
    ),
    equal(
        { x : 5, y : [6] },
        { x : 5, y : 6 }
    )
]);
```

# methods

``` js
var deepEqual = require('deep-equal')
```

## deepEqual(a, b, opts)

Compare objects `a` and `b`, returning whether they are equal according to a
recursive equality algorithm.

If `opts.strict` is `true`, use strict equality (`===`) to compare leaf nodes.
The default is to use coercive equality (`==`) because that's how
`assert.deepEqual()` works by default.

# install

With [npm](https://npmjs.org) do:

```
npm install deep-equal
```

# test

With [npm](https://npmjs.org) do:

```
npm test
```
