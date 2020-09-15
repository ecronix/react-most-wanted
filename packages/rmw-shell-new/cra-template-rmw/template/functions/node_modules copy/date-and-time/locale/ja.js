/**
 * @preserve date-and-time.js locale configuration
 * @preserve Japanese (ja)
 * @preserve It is using moment.js locale configuration as a reference.
 */
(function (global) {
    'use strict';

    var exec = function (date) {
        date.locale('ja', {
            res: {
                MMMM: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                MMM: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                dddd: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
                ddd: ['日', '月', '火', '水', '木', '金', '土'],
                dd: ['日', '月', '火', '水', '木', '金', '土'],
                A: ['午前', '午後']
            },
            formatter: {
                hh: function (d) {
                    return ('0' + d.getHours() % 12).slice(-2);
                },
                h: function (d) {
                    return d.getHours() % 12;
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
