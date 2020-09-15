/**
 * @preserve date-and-time.js locale configuration
 * @preserve Korean (ko)
 * @preserve It is using moment.js locale configuration as a reference.
 */
(function (global) {
    'use strict';

    var exec = function (date) {
        date.locale('ko', {
            res: {
                MMMM: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                MMM: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                dddd: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
                ddd: ['일', '월', '화', '수', '목', '금', '토'],
                dd: ['일', '월', '화', '수', '목', '금', '토'],
                A: ['오전', '오후']
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
