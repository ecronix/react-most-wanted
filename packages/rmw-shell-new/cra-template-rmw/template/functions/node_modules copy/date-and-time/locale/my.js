/**
 * @preserve date-and-time.js locale configuration
 * @preserve Burmese (my)
 * @preserve It is using moment.js locale configuration as a reference.
 */
(function (global) {
    'use strict';

    var exec = function (date) {
        date.locale('my', {
            res: {
                MMMM: ['ဇန်နဝါရီ', 'ဖေဖော်ဝါရီ', 'မတ်', 'ဧပြီ', 'မေ', 'ဇွန်', 'ဇူလိုင်', 'သြဂုတ်', 'စက်တင်ဘာ', 'အောက်တိုဘာ', 'နိုဝင်ဘာ', 'ဒီဇင်ဘာ'],
                MMM: ['ဇန်', 'ဖေ', 'မတ်', 'ပြီ', 'မေ', 'ဇွန်', 'လိုင်', 'သြ', 'စက်', 'အောက်', 'နို', 'ဒီ'],
                dddd: ['တနင်္ဂနွေ', 'တနင်္လာ', 'အင်္ဂါ', 'ဗုဒ္ဓဟူး', 'ကြာသပတေး', 'သောကြာ', 'စနေ'],
                ddd: ['နွေ', 'လာ', 'ဂါ', 'ဟူး', 'ကြာ', 'သော', 'နေ'],
                dd: ['နွေ', 'လာ', 'ဂါ', 'ဟူး', 'ကြာ', 'သော', 'နေ']
            },
            formatter: {
                post: function (str) {
                    var num = ['၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉'];
                    return str.replace(/\d/g, function (i) {
                        return num[i | 0];
                    });
                }
            },
            parser: {
                pre: function (str) {
                    var map = { '၀': 0, '၁': 1, '၂': 2, '၃': 3, '၄': 4, '၅': 5, '၆': 6, '၇': 7, '၈': 8, '၉': 9 };
                    return str.replace(/[၀၁၂၃၄၅၆၇၈၉]/g, function (i) {
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
