(function (global) {
    'use strict';

    var exec = function (date) {
        date.plugin('meridiem', {
            res: {
                A: ['AM', 'PM', 'A.M.', 'P.M.', 'am', 'pm', 'a.m.', 'p.m.']
            },
            formatter: {
                AA: function (d) {
                    // A.M. / P.M.
                    return this.res.A[d.getHours() > 11 | 0 + 2];
                },
                a: function (d) {
                    // am / pm
                    return this.res.A[d.getHours() > 11 | 0 + 4];
                },
                aa: function (d) {
                    // a.m. / p.m.
                    return this.res.A[d.getHours() > 11 | 0 + 6];
                }
            },
            parser: {
                A: function (str) {
                    var result = this.find(this.res.A, str);
                    result.value %= 2;
                    return result;
                }
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
