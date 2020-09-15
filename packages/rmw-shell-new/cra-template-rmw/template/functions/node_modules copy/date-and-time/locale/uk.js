/**
 * @preserve date-and-time.js locale configuration
 * @preserve Ukrainian (uk)
 * @preserve It is using moment.js locale configuration as a reference.
 */
(function (global) {
    'use strict';

    var exec = function (date) {
        date.locale('uk', {
            res: {
                MMMM: ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'],
                MMM: ['січ', 'лют', 'бер', 'квіт', 'трав', 'черв', 'лип', 'серп', 'вер', 'жовт', 'лист', 'груд'],
                dddd_nominative: ['неділя', 'понеділок', 'вівторок', 'середа', 'четвер', 'п’ятниця', 'субота'],
                dddd_accusative: ['неділю', 'понеділок', 'вівторок', 'середу', 'четвер', 'п’ятницю', 'суботу'],
                dddd_genitive: ['неділі', 'понеділка', 'вівторка', 'середи', 'четверга', 'п’ятниці', 'суботи'],
                ddd: ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
                dd: ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
                A: ['ночі', 'ранку', 'дня', 'вечора']
            },
            formatter: {
                A: function (d) {
                    var h = d.getHours();
                    if (h < 4) {
                        return this.res.A[0];   // ночі
                    } else if (h < 12) {
                        return this.res.A[1];   // ранку
                    } else if (h < 17) {
                        return this.res.A[2];   // дня
                    }
                    return this.res.A[3];       // вечора
                },
                dddd: function (d, formatString) {
                    var type = 'nominative';
                    if (/(\[[ВвУу]\]) ?dddd/.test(formatString)) {
                        type = 'accusative';
                    } else if (/\[?(?:минулої|наступної)? ?\] ?dddd/.test(formatString)) {
                        type = 'genitive';
                    }
                    return this.res['dddd_' + type][d.getDay()];
                }
            },
            parser: {
                h12: function (h, a) {
                    if (a < 2) {
                        return h;   // ночі, ранку
                    }
                    return h > 11 ? h : h + 12; // дня, вечора
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
