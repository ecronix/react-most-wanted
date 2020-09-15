var test = require('tape');
var snakeize = require('../');

var obj = {
    feeFieFoe: 'fum',
    beepBoop: [
        { 'abcXyz': 'mno' },
        { 'FooBar': 'baz' },
        { 'CheeseID': 'wensleydale' }
    ]
};

test('snakeize a nested object', function (t) {
    t.plan(1);
    var res = snakeize(obj);
    t.deepEqual(res, {
        "fee_fie_foe": "fum",
        "beep_boop": [
            { "abc_xyz": "mno" },
            { "foo_bar": "baz" },
            { "cheese_id": "wensleydale" }
        ]
    });
});

test('date object is not modified', function (t) {
    t.plan(1);
    var d = new Date();
    t.equal(snakeize(d), d);
});

test('regex object is not modified', function (t) {
    t.plan(1);
    var r = /1234/;
    t.equal(snakeize(r), r);
});
