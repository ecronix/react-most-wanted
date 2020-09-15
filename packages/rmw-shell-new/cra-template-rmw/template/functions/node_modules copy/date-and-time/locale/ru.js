/**
 * @preserve date-and-time.js locale configuration
 * @preserve Russian (ru)
 * @preserve It is using moment.js locale configuration as a reference.
 */
(function (global) {
    'use strict';

    var exec = function (date) {
        date.locale('ru', {
            res: {
                MMMM: ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
                MMM: ['янв', 'фев', 'мар', 'апр', 'мая', 'июня', 'июля', 'авг', 'сен', 'окт', 'ноя', 'дек'],
                dddd: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
                ddd: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                dd: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                A: ['ночи', 'утра', 'дня', 'вечера']
            },
            formatter: {
                A: function (d) {
                    var h = d.getHours();
                    if (h < 4) {
                        return this.res.A[0];   // ночи
                    } else if (h < 12) {
                        return this.res.A[1];   // утра
                    } else if (h < 17) {
                        return this.res.A[2];   // дня
                    }
                    return this.res.A[3];       // вечера
                }
            },
            parser: {
                h12: function (h, a) {
                    if (a < 2) {
                        return h;   // ночи, утра
                    }
                    return h > 11 ? h : h + 12; // дня, вечера
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
