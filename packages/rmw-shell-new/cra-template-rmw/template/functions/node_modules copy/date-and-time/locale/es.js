/**
 * @preserve date-and-time.js locale configuration
 * @preserve Spanish (es)
 * @preserve It is using moment.js locale configuration as a reference.
 */
(function (global) {
    'use strict';

    var exec = function (date) {
        date.locale('es', {
            res: {
                MMMM: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
                MMM: ['ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.'],
                dddd: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
                ddd: ['dom.', 'lun.', 'mar.', 'mié.', 'jue.', 'vie.', 'sáb.'],
                dd: ['do', 'lu', 'ma', 'mi', 'ju', 'vi', 'sá'],
                A: ['de la mañana', 'de la tarde', 'de la noche']
            },
            formatter: {
                A: function (d) {
                    var h = d.getHours();
                    if (h < 12) {
                        return this.res.A[0];   // de la mañana
                    } else if (h < 19) {
                        return this.res.A[1];   // de la tarde
                    }
                    return this.res.A[2];       // de la noche
                }
            },
            parser: {
                h12: function (h, a) {
                    if (a < 1) {
                        return h;   // de la mañana
                    }
                    return h > 11 ? h : h + 12; // de la tarde, de la noche
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
