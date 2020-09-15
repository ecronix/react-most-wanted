/**
 * @preserve date-and-time.js locale configuration
 * @preserve Punjabi (pa-in)
 * @preserve It is using moment.js locale configuration as a reference.
 */
(function (global) {
    'use strict';

    var exec = function (date) {
        date.locale('pa-in', {
            res: {
                MMMM: ['ਜਨਵਰੀ', 'ਫ਼ਰਵਰੀ', 'ਮਾਰਚ', 'ਅਪ੍ਰੈਲ', 'ਮਈ', 'ਜੂਨ', 'ਜੁਲਾਈ', 'ਅਗਸਤ', 'ਸਤੰਬਰ', 'ਅਕਤੂਬਰ', 'ਨਵੰਬਰ', 'ਦਸੰਬਰ'],
                MMM: ['ਜਨਵਰੀ', 'ਫ਼ਰਵਰੀ', 'ਮਾਰਚ', 'ਅਪ੍ਰੈਲ', 'ਮਈ', 'ਜੂਨ', 'ਜੁਲਾਈ', 'ਅਗਸਤ', 'ਸਤੰਬਰ', 'ਅਕਤੂਬਰ', 'ਨਵੰਬਰ', 'ਦਸੰਬਰ'],
                dddd: ['ਐਤਵਾਰ', 'ਸੋਮਵਾਰ', 'ਮੰਗਲਵਾਰ', 'ਬੁਧਵਾਰ', 'ਵੀਰਵਾਰ', 'ਸ਼ੁੱਕਰਵਾਰ', 'ਸ਼ਨੀਚਰਵਾਰ'],
                ddd: ['ਐਤ', 'ਸੋਮ', 'ਮੰਗਲ', 'ਬੁਧ', 'ਵੀਰ', 'ਸ਼ੁਕਰ', 'ਸ਼ਨੀ'],
                dd: ['ਐਤ', 'ਸੋਮ', 'ਮੰਗਲ', 'ਬੁਧ', 'ਵੀਰ', 'ਸ਼ੁਕਰ', 'ਸ਼ਨੀ'],
                A: ['ਰਾਤ', 'ਸਵੇਰ', 'ਦੁਪਹਿਰ', 'ਸ਼ਾਮ']
            },
            formatter: {
                A: function (d) {
                    var h = d.getHours();
                    if (h < 4) {
                        return this.res.A[0];   // ਰਾਤ
                    } else if (h < 10) {
                        return this.res.A[1];   // ਸਵੇਰ
                    } else if (h < 17) {
                        return this.res.A[2];   // ਦੁਪਹਿਰ
                    } else if (h < 20) {
                        return this.res.A[3];   // ਸ਼ਾਮ
                    }
                    return this.res.A[0];       // ਰਾਤ
                },
                post: function (str) {
                    var num = ['੦', '੧', '੨', '੩', '੪', '੫', '੬', '੭', '੮', '੯'];
                    return str.replace(/\d/g, function (i) {
                        return num[i | 0];
                    });
                }
            },
            parser: {
                h12: function (h, a) {
                    if (a < 1) {
                        return h < 4 || h > 11 ? h : h + 12;    // ਰਾਤ
                    } else if (a < 2) {
                        return h;                               // ਸਵੇਰ
                    } else if (a < 3) {
                        return h >= 10 ? h : h + 12;            // ਦੁਪਹਿਰ
                    }
                    return h + 12;                              // ਸ਼ਾਮ
                },
                pre: function (str) {
                    var map = { '੦': 0, '੧': 1, '੨': 2, '੩': 3, '੪': 4, '੫': 5, '੬': 6, '੭': 7, '੮': 8, '੯': 9 };
                    return str.replace(/[੦੧੨੩੪੫੬੭੮੯]/g, function (i) {
                        return '' + map[i];
                    });
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
