(function (global) {
    'use strict';

    var exec = function (date) {
        date.plugin('day-of-week', {
            parser: {
                dddd: function (str) { return this.find(this.res.dddd, str); },
                ddd: function (str) { return this.find(this.res.ddd, str); },
                dd: function (str) { return this.find(this.res.dd, str); }
            }
        });
    };

    if (typeof module === 'object' && typeof module.exports === 'object') {
        (module.paths || []).push('./');
        exec(require('date-and-time'));
    } else if (typeof define === 'function' && define.amd) {
        define(['date-and-time'], exec);
    } else {
        exec(global.date);
    }

}(this));
