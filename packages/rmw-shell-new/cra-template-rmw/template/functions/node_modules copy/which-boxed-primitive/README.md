# which-boxed-primitive <sup>[![Version Badge][2]][1]</sup>

[![Build Status][3]][4]
[![dependency status][5]][6]
[![dev dependency status][7]][8]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][11]][1]

Which kind of boxed JS primitive is this? This module works cross-realm/iframe, does not depend on `instanceof` or mutable properties, and works despite ES6 Symbol.toStringTag.

## Example

```js
var whichBoxedPrimitive = require('which-boxed-primitive');
var assert = require('assert');

// unboxed primitives return `null`
// boxed primitives return the builtin contructor name

assert.equal(whichBoxedPrimitive(undefined), null);
assert.equal(whichBoxedPrimitive(null), null);

assert.equal(whichBoxedPrimitive(false), null);
assert.equal(whichBoxedPrimitive(true), null);
assert.equal(whichBoxedPrimitive(new Boolean(false)), 'Boolean');
assert.equal(whichBoxedPrimitive(new Boolean(true)), 'Boolean');

assert.equal(whichBoxedPrimitive(42), null);
assert.equal(whichBoxedPrimitive(NaN), null);
assert.equal(whichBoxedPrimitive(Infinity), null);
assert.equal(whichBoxedPrimitive(new Number(42)), 'Number');
assert.equal(whichBoxedPrimitive(new Number(NaN)), 'Number');
assert.equal(whichBoxedPrimitive(new Number(Infinity)), 'Number');

assert.equal(whichBoxedPrimitive(''), null);
assert.equal(whichBoxedPrimitive('foo'), null);
assert.equal(whichBoxedPrimitive(new String('')), 'String');
assert.equal(whichBoxedPrimitive(new String('foo')), 'String');

assert.equal(whichBoxedPrimitive(Symbol()), null);
assert.equal(whichBoxedPrimitive(Object(Symbol()), 'Symbol');

assert.equal(whichBoxedPrimitive(42n), null);
assert.equal(whichBoxedPrimitive(Object(42n), 'BigInt');

// non-boxed-primitive objects return `undefined`
assert.equal(whichBoxedPrimitive([]), undefined);
assert.equal(whichBoxedPrimitive({}), undefined);
assert.equal(whichBoxedPrimitive(/a/g), undefined);
assert.equal(whichBoxedPrimitive(new RegExp('a', 'g')), undefined);
assert.equal(whichBoxedPrimitive(new Date()), undefined);
assert.equal(whichBoxedPrimitive(function () {}), undefined);
assert.equal(whichBoxedPrimitive(function* () {}), undefined);
assert.equal(whichBoxedPrimitive(x => x * x), undefined);
assert.equal(whichBoxedPrimitive([]), undefined);

```

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[1]: https://npmjs.org/package/which-boxed-primitive
[2]: http://versionbadg.es/ljharb/which-boxed-primitive.svg
[3]: https://travis-ci.org/ljharb/which-boxed-primitive.svg
[4]: https://travis-ci.org/ljharb/which-boxed-primitive
[5]: https://david-dm.org/ljharb/which-boxed-primitive.svg
[6]: https://david-dm.org/ljharb/which-boxed-primitive
[7]: https://david-dm.org/ljharb/which-boxed-primitive/dev-status.svg
[8]: https://david-dm.org/ljharb/which-boxed-primitive#info=devDependencies
[11]: https://nodei.co/npm/which-boxed-primitive.png?downloads=true&stars=true
[license-image]: http://img.shields.io/npm/l/which-boxed-primitive.svg
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/which-boxed-primitive.svg
[downloads-url]: http://npm-stat.com/charts.html?package=which-boxed-primitive
