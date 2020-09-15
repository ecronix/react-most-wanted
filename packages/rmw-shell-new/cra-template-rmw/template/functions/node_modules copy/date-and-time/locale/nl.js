/**
 * @preserve date-and-time.js locale configuration
 * @preserve Dutch (nl)
 * @preserve It is using moment.js locale configuration as a reference.
 */
(function (global) {
    'use strict';

    var exec = function (date) {
        date.locale('nl', {
            res: {
                MMMM: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
                MMM_withdots: ['jan.', 'feb.', 'mrt.', 'apr.', 'mei', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.'],
                MMM_withoutdots: ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
                dddd: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
                ddd: ['zo.', 'ma.', 'di.', 'wo.', 'do.', 'vr.', 'za.'],
                dd: ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za']
            },
            formatter: {
                MMM: function (d, formatString) {
                    return this.res['MMM_' + (/-MMM-/.test(formatString) ? 'withoutdots' : 'withdots')][d.getMonth()];
                }
            },
            parser: {
                MMM: function (str, formatString) {
                    var result = this.find(this.res['MMM_' + (/-MMM-/.test(formatString) ? 'withoutdots' : 'withdots')], str);
                    result.value++;
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
