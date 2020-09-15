(function (global) {
    'use strict';

    var exec = function (date) {
        date.plugin('two-digit-year', {
            parser: {
                YY: function (str) {
                    var result = this.exec(/^\d\d/, str);
                    result.value += result.value < 70 ? 2000 : 1900;
                    return result;
                },
                Y: function (str) {
                    var result = this.exec(/^\d\d?/, str);
                    result.value += result.value < 70 ? 2000 : 1900;
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
