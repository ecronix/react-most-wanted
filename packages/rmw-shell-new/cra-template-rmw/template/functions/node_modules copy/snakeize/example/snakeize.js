var snakeize = require('../');
var obj = {
    feeFieFoe: 'fum',
    beepBoop: [
        { 'abc_xyz': 'mno' },
        { 'fooBar': 'baz' }
    ]
};
var res = snakeize(obj);
console.log(JSON.stringify(res, null, 2));
